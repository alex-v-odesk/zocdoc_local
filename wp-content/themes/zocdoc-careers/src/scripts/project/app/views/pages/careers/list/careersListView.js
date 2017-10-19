var BaseView = require('app/abstract/pageView');
var ListHeaderView = require('./parts/listHeaderView');
var StickyCanvasView = require('app/components/canvas/careers/list/stickyCanvasView');
var CV = require('app/config/currentValues');
var Tools = require('app/tools/tools');

var CareersListView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.$listHeaderViewEl = null;
  this.listHeaderBlock = null;
  this.listHeaderHeight = null;
  this.listHeaderView = null;

  this.$stickyHeaderEl = null;
  this.$stickyHeaderCanvasEl = null;
  this.stickyCanvasView = null;
  this.stickyHeaderheight = 0;
  this.aTitles = null;

  this.$departmentContainerEl = null;
  this.departmentContainerBlock = null;
  this.departmentContainerHeight = null;

  this.$sideNavEl = null;
  this.sideNavHeight = null;

  this.$footerEl = null;
  this.footerBlock = null;
  this.footerHeight = null;

  this.aMenuItems = null;
  this.currentIndexMenu = 0;

  this.$dropdownEl = null;
  this.dropDownHeight = 0;

  this.aTeamEls = null;
  this.aTeamHeader = null;
  this.aColors = null;
  this.headerIsVisible = true;

  // Height of the sticky page header
  this.triggerTopOffset = CV.breakpoint === 'default' ? 50 : 30;

  this.lastTeamElementHeight = 0;

  this.events = {
    'click .department-list li': 'onClickMenu',
    'click .dropdown-btn': 'expandDropdown',
    'mouseenter .row.middle': 'onMouseEnterLink',
    'mouseleave .row.middle': 'onMouseLeaveLink'
  };

  BaseView.call(this, options, datas);

}

_.extend(CareersListView, BaseView);
_.extend(CareersListView.prototype, BaseView.prototype);

CareersListView.prototype.initDOM = function () {

  this.$bgHeader = $('.page-header .bg');
  this.$header = $('.page-header');
  this.$footerEl = $('#page-footer');

  this.$listHeaderViewEl = this.$el.find('.list-header');
  this.$stickyHeaderEl = this.$el.find('.sticky-header');
  this.$stickyHeaderCanvasEl = this.$el.find('#sticky-canvas');
  this.aTitles = this.$stickyHeaderEl.find('h2');

  this.$departmentContainerEl = this.$el.find('.department-list-container');

  this.aTeamEls = this.$el.find('.team');

  this.aTeamHeader = this.$el.find('.team-header');

  this.$sideNavEl = this.$el.find('.deparment-side-nav');
  this.aMenuItems = this.$sideNavEl.find('.department-list li button');

  this.$dropdownEl = this.$el.find('.filter-wrapper');

  CV.mainView.setNormalScrollBehavior();

  BaseView.prototype.initDOM.call(this);
}

CareersListView.prototype.onDOMInit = function () {

  this.listHeaderView = new ListHeaderView({el: this.$listHeaderViewEl, mainView: this}, null);
  this.listHeaderView.init();

  var blobColor = $(this.aTeamEls[0]).data('color');

  this.stickyCanvasView = new StickyCanvasView({el: this.$stickyHeaderCanvasEl[0], blobColor: blobColor}, null);
  this.stickyCanvasView.init();

  this.calculateTriggers();
  this.setCurrent();

  BaseView.prototype.onDOMInit.call(this);



}

CareersListView.prototype.calculateElHeights = function () {

  this.stickyHeaderheight = $(this.$stickyHeaderEl).height();
  this.listHeaderHeight = $(this.$listHeaderViewEl).height();
  this.departmentContainerHeight = $(this.$departmentContainerEl).height();
  this.sideNavHeight = $(this.$sideNavEl).height();
  this.footerHeight = $(this.$footerEl).height();
  this.menuTop = (CV.viewport.height / 2) - (this.sideNavHeight / 2);
  this.dropDownHeight = $('.filter-wrapper ul').height();

  this.aTeamEls.each((function (i) {
    var $currentTeamEl = $(this.aTeamEls[i]);
    $currentTeamEl.data('originalPosition', $currentTeamEl.offset().top);
    $currentTeamEl.data('originalHeight', $currentTeamEl.height())

  }).bind(this));

  this.lastTeamElementHeight = $(this.aTeamEls[this.aTeamEls.length - 1]).height();

}

CareersListView.prototype.calculateTriggers = function () {

  if (!this.$listHeaderViewEl[0]) return;

  this.listHeaderBlock = Tools.triggerEl(this.$listHeaderViewEl[0], CV.breakpoint === 'sml' ? this.listHeaderHeight - this.triggerTopOffset + this.sideNavHeight : this.listHeaderHeight - this.triggerTopOffset);
  // console.log('this.listHeaderBlock', this.listHeaderBlock);
  this.departmentContainerBlock = Tools.triggerEl(this.$departmentContainerEl[0], this.departmentContainerHeight);
  this.footerBlock = Tools.triggerEl(this.$footerEl[0], this.footerHeight);

  this.setStickyElements();

}

CareersListView.prototype.hideMenu = function () {

  this.headerIsVisible = false;
  TweenMax.to(this.$bgHeader, .2, {y: -75, ease: Expo.easeOut});
  TweenMax.set(this.$header, {background: "none", borderBottom: 'none'});

}

CareersListView.prototype.onShown = function () {

  CV.mainView.calculateScrollY();
  this.calculateElHeights();
  this.calculateTriggers();
  this.setCurrent();

  this.canUpdate = true;

  var deptScroll = $('.' + localStorage.getItem('dept'))[0];

  // console.log('window.location.href.indexOf(loc_id) > -1 || deptScroll', window.location.href.indexOf('loc_id'), deptScroll);

  if (window.location.href.indexOf('loc_id') > -1 || deptScroll) {

    this.isScrolling = true;

    setTimeout((function () {

      TweenMax.to(window, 0.7, {
        scrollTo: window.location.href.indexOf('loc_id') > -1 ? CV.viewport.height + 80 : parseInt($('.' + localStorage.getItem('dept')).attr('data-original-position')) + 80,
        onUpdate: (function () {

          // CV.scrollY = window.location.href.indexOf('loc_id') > -1 ? CV.viewport.height + 80 : parseInt($('.' + localStorage.getItem('dept')).attr('data-original-position')) + 80;
          CV.mainView.calculateScrollY();
          // this.calculateElHeights();
          this.calculateTriggers();
          this.setCurrent();

          this.onUpdate();


        }).bind(this),
        onComplete: (function () {

          // console.log('onComplete');

          this.isScrolling = false;
          localStorage.setItem('dept', null);
          this.headerIsVisible = false;

          if (!CV.isMobile) {
            TweenMax.set(this.$bgHeader, {y: -75});
            TweenMax.set(this.$header, {background: "none", borderBottom: 'none'});
          }

          BaseView.prototype.onShown.call(this);

        }).bind(this)
      });
    }).bind(this), 0);

  }
  else BaseView.prototype.onShown.call(this);
}

CareersListView.prototype.onUpdate = function () {

  if (!this.$bgHeader || !this.$header) return;

  // console.log('CareersListView.prototype.onUpdate', CV.scrollY);

  if (!CV.isMobile || CV.breakpoint != 'sml') {

    var y = CV.scrollY - CV.viewport.height + 50;

    if (CV.scrollY > CV.viewport.height - 50 && y < 75 && !this.headerIsAnimate) {

      //console.log('Animate header');
      TweenMax.set(this.$bgHeader, {y: -y});
      //TweenMax.set(this.$header, {background: "none", borderBottom: 'none'});

    }
    else if (CV.scrollY < CV.viewport.height && !this.headerIsVisible && !this.headerIsAnimate) {

      //console.log("Show header");

      this.headerIsAnimate = true;

      TweenMax.to(this.$bgHeader, .2, {
        y: 0,
        ease: Expo.easeOut,
        onComplete: (function () {

          this.headerIsAnimate = false;
          this.headerIsVisible = true;
          $(this.$header).removeAttr('style');

        }).bind(this)
      });

    }
    else if (CV.scrollY > CV.viewport.height + 75 && this.headerIsVisible && !this.headerIsAnimate) {

      //console.log("Hide header");

      this.headerIsAnimate = true;

      TweenMax.to(this.$bgHeader, .2, {
        y: -75,
        ease: Expo.easeOut,
        onComplete: (function () {

          this.headerIsAnimate = false;
          this.headerIsVisible = false;

        }).bind(this)
      });
      TweenMax.set(this.$header, {background: "none", borderBottom: 'none'});

    }
  }

  if ((!CV.isTouching && !CV.isScrolling && !this.listHeaderBlock || !this.footerBlock) && !this.isScrollTo) return;
  this.calculateTriggers();
  this.setCurrent();

  BaseView.prototype.onUpdate.call(this);

}

CareersListView.prototype.setCurrent = function () {

  if (!CV.isTouching && !CV.isScrolling && !this.isScrolling)return;

  this.aTeamEls.each((function (i) {

    var $currentTeamEl = $(this.aTeamEls[i]);
    var stickyPosition = $currentTeamEl.data('originalPosition');
    var stickyHeight = $currentTeamEl.data('originalHeight');

    if (stickyPosition <= CV.scrollY && _isVisible.call(this, stickyPosition, stickyHeight)) {

      if (this.currentIndexMenu === i) return

      $(this.aTitles[this.currentIndexMenu]).removeClass('current');
      $(this.aMenuItems[this.currentIndexMenu]).removeClass('current');
      $(this.aTeamHeader[this.currentIndexMenu]).removeClass('current');
      this.currentIndexMenu = i;
      var blobColor = $(this.aTeamEls[i]).data('color');
      this.stickyCanvasView.triggerBlob(blobColor);
      $(this.aTitles[this.currentIndexMenu]).addClass('current');
      $(this.aMenuItems[this.currentIndexMenu]).addClass('current');
      $(this.aTeamHeader[this.currentIndexMenu]).addClass('current');

    }

  }).bind(this));

}

var _isVisible = function (top, height) {
  return (top <= CV.viewport.height + CV.scrollY && top + height >= CV.scrollY);
};

CareersListView.prototype.setStickyElements = function (isResize) {

  if (!CV.isTouching && !CV.isScrolling && !this.isScrolling && !this.menuTop && !isResize) return;

  if (((!CV.isMobile || CV.breakpoint != 'sml') && CV.scrollY >= CV.viewport.height) && CV.viewport.width > 920 || (CV.scrollY >= this.sideNavHeight + CV.viewport.height && (CV.isMobile || CV.breakpoint === 'sml'))) {

    if ((!CV.isMobile || CV.breakpoint != 'sml') && CV.viewport.width > 920) {
      TweenMax.set(this.$sideNavEl, {
        position: 'fixed',
        top: this.menuTop,
        bottom: "auto"
      });
    }
    else {
      $(this.$sideNavEl).removeAttr('style');
    }

    $('.page-header').addClass('active');

    var topSHeader = CV.isMobile ? 38 : 0;

    TweenMax.set(this.$stickyHeaderEl, {
      position: 'fixed',
      top: topSHeader,
      bottom: "auto",
      left: 0,
      right: 0
    });

    if (this.footerBlock.visible) {

      if (CV.breakpoint === 'sml') return;

      TweenMax.set(this.$stickyHeaderEl, {
        position: 'absolute',
        top: "auto",
        bottom: this.lastTeamElementHeight - this.stickyHeaderheight
      });

      TweenMax.set(this.$sideNavEl, {
        position: 'absolute',
        top: "auto",
        bottom: this.menuTop
      });

    } else {

      TweenMax.set(this.$stickyHeaderEl, {
        position: 'fixed',
        top: topSHeader,
        bottom: "auto",
        left: 0,
        right: 0
      });

      if (CV.breakpoint === 'default' && CV.viewport.width > 920) {
        TweenMax.set(this.$sideNavEl, {
          position: 'fixed',
          top: this.menuTop,
          bottom: "auto"
        });
      }
      else {
        $(this.$sideNavEl).removeAttr('style');
      }
    }

  } else {

    TweenMax.set(this.$stickyHeaderEl, {
      position: 'absolute',
      top: 0,
      bottom: "auto"
    });

    if (CV.breakpoint === 'default' && CV.viewport.width > 920) {
      TweenMax.set(this.$sideNavEl, {
        position: 'absolute',
        top: this.menuTop,
        bottom: "auto"
      });
    }
    else {
      $(this.$sideNavEl).removeAttr('style');
    }
  }

}

CareersListView.prototype.onClickMenu = function (e) {

  e.preventDefault();

  var id = $(e.currentTarget).data('id');
  this.isScrolling = true;

  if (CV.breakpoint === 'default') {
    var scrollTarget = $('[data-anchor="' + id + '"]')[0].offsetTop + this.listHeaderHeight + 100;
  } else {
    var scrollTarget = $('[data-anchor="' + id + '"]')[0].offsetTop + this.listHeaderHeight + 100 + this.sideNavHeight;
  }

  TweenMax.to(window, .8, {
    scrollTo: scrollTarget,
    ease: Expo.easeInOut,
    onUpdate: (function () {

      CV.scrollY = window.scrollY || window.pageYOffset;
      this.calculateTriggers();
      this.setCurrent();

    }).bind(this),
    onComplete: (function () {

      this.isScrolling = false;

    }).bind(this)
  });

}

CareersListView.prototype.onMouseEnterLink = function (e) {
  var $a = $($(e.currentTarget).find('a'));

  TweenMax.set(
      $a,
      {
        color: $a.attr('data-color')
      }
  );

}

CareersListView.prototype.onMouseLeaveLink = function (e) {
  var $a = $($(e.currentTarget).find('a'));

  $a.removeAttr('style');

}

CareersListView.prototype.expandDropdown = function (e) {

  e.preventDefault();

  if (!$(this.$sideNavEl).hasClass('active')) {

    $(this.$sideNavEl).addClass('active');

    TweenMax.to(this.$dropdownEl, .8, {
      height: this.dropDownHeight,
      ease: Expo.easeInOut
    });

  } else {

    $(this.$sideNavEl).removeClass('active');

    TweenMax.to(this.$dropdownEl, .8, {
      height: 0,
      ease: Expo.easeInOut
    });

  }

}

CareersListView.prototype.onResize = function () {

  this.listHeaderView.onResize();

  this.calculateElHeights();
  this.calculateTriggers();
  this.setStickyElements(true);

  if (this.stickyCanvasView) this.stickyCanvasView.onResize();

  BaseView.prototype.onResize.call(this);

}

CareersListView.prototype.dispose = function () {

  BaseView.prototype.dispose.call(this);

}

module.exports = CareersListView;
