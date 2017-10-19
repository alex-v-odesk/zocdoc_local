(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00234B").s().p("AnzH0IAAvnIPnAAIAAPng");
	this.shape.setTransform(50,50);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.box, new cjs.Rectangle(0,0,100,100), null);


(lib.blobyellow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBF456").s().p("EgFwA5FQyWhJreh+QteiToKkDQo3kZkAnEQkLnYAsrDQAjo3D9oBQDdnAGhnMQE/lfIsnjQB+huFsk1QE8kOC+inQG0mBIckGQIDj5I+h6QIuh2I4ANQIyAMIJCLQIPCNGzECQHCELE5FyQFJGFCdHdQCmH6gkJEQhBQhmPM9QmDMjqkIdQqaIUuGDyQrFC9suAAQjfAAjpgOg");
	this.shape.setTransform(273.9,213.1,0.581,0.581);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.blobyellow, new cjs.Rectangle(0,0,547.9,426.3), null);


(lib.word11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// word
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAHARIgCgKIgBgLIAAgMIAMAAIAAAMIgBALIgDAKgAgLARIgDgKIgCgLIAAgMIAOAAIAAAMIgCALIgDAKg");
	this.shape.setTransform(56.9,-62);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgOAkQgHgDgGgFQgFgFgDgIQgDgHAAgHQAAgIADgHQADgHAGgFQAFgGAHgDQAHgDAHAAQAJAAAHADQAHACAFAGQAFAFADAHQADAHAAAIIAAAFIg9AAIADAIIAFAHIAHADIAIACIAHgBIAGgDQAGgEADgGIANAIQgCAEgEAEQgDAEgFACIgJAFQgGABgGAAQgKgBgFgCgAAXgHIgDgIIgFgFIgHgDIgIgBQgDAAgDABQgEACgDACIgFAFIgDAHIAsAAIAAAAg");
	this.shape_1.setTransform(50.1,-56.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AATAmIAAgpIgBgJIgEgGQgCgDgEgBQgDgBgEAAQgEAAgDABIgGAEIgEAHQgCAEAAAFIAAAoIgQAAIAAhKIAQAAIAAAKQAEgFAGgDQAGgDAGAAQAHAAAGACQAGACAEAEQAEAFACAGQACAGAAAHIAAArg");
	this.shape_2.setTransform(41.4,-56.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgPAlQgGgDgGgFQgFgGgDgHIgCgHIgBgJQAAgFADgKQADgHAFgFQAFgGAHgCQAHgDAHAAQAHAAAGADQAHADAEAFIAAgJIAQAAIAABKIgQAAIAAgLQgEAGgHADQgGADgHAAQgHAAgHgCgAgIgWQgEADgDADQgEADgBAFQgCAEAAAEQAAAFACAFQABAEAEADQADADAEACQAFACADAAQAFAAAFgCQAEgCADgDQAEgDABgEQACgFAAgFQAAgEgCgEQgBgFgEgDQgDgDgEgDQgFgCgFAAQgDAAgFACg");
	this.shape_3.setTransform(32.5,-56.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAmIAAhKIAQAAIAAAMQADgHAFgCQAGgDAHAAIAIAAIAAAPIgKAAIgJABQgEABgBADQgCADgBAEIgBAKIAAAlg");
	this.shape_4.setTransform(25.2,-56.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgLA0QgIgDgDgFIAAAKIgQAAIAAhtIAQAAIAAAtQAEgGAHgDQAGgCAGAAQAIgBAHADQAHADAEAFQAGAFADAGQADALAAAFIgBAJIgCAHQgDAHgGAGQgEAFgHADQgHADgHAAQgHgBgGgDgAgJgFQgEACgEADIgEAHQgCAFAAAEQAAAFACAFQACAEACADQAEAEAEACQAFACAEAAQAFAAADgCQAFgCADgEQAEgDABgEQACgFAAgFQAAgEgCgFQgBgFgEgCQgDgDgFgCQgDgCgFAAQgEAAgFACg");
	this.shape_5.setTransform(17.8,-58.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AArAmIAAgrIgBgHIgDgGQgDgDgDgBQgDgBgEAAQgEAAgDABQgEABgCADQgCACgCAEQgBAEAAAFIAAApIgPAAIAAgrIgBgIIgEgFQgCgDgDgBIgHgBQgEAAgEABQgDABgCADIgEAGQgCAFAAAFIAAAoIgQAAIAAhKIAQAAIAAAJQAEgFAFgDQAGgCAHAAIAJABIAHACIAFAFIADAFIAFgFIAGgFIAGgCIAIgBQAIAAAGACQAGACAEAEQAEAEABAGQADAGAAAHIAAAsg");
	this.shape_6.setTransform(6.4,-56.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgOAkQgHgDgGgFQgFgFgDgIQgDgHAAgHQAAgIADgHQADgHAGgFQAFgGAHgDQAHgDAHAAQAJAAAHADQAHACAFAGQAFAFADAHQADAHAAAIIAAAFIg9AAIADAIIAFAHIAHADIAIACIAHgBIAGgDQAGgEADgGIANAIQgCAEgEAEQgDAEgFACIgJAFQgGABgGAAQgKgBgFgCgAAXgHIgDgIIgFgFIgHgDIgIgBQgDAAgDABQgEACgDACIgFAFIgDAHIAsAAIAAAAg");
	this.shape_7.setTransform(-4.8,-56.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AArAmIAAgrIgBgHIgDgGQgDgDgDgBQgDgBgEAAQgEAAgDABQgEABgCADQgCACgCAEQgBAEAAAFIAAApIgPAAIAAgrIgBgIIgEgFQgCgDgDgBIgHgBQgEAAgEABQgDABgCADIgEAGQgCAFAAAFIAAAoIgQAAIAAhKIAQAAIAAAJQAEgFAFgDQAGgCAHAAIAJABIAHACIAFAFIADAFIAFgFIAGgFIAGgCIAIgBQAIAAAGACQAGACAEAEQAEAEABAGQADAGAAAHIAAAsg");
	this.shape_8.setTransform(-15.9,-56.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAkQgHgDgGgFQgFgFgDgIQgDgHAAgHQAAgIADgHQADgHAGgFQAFgGAHgDQAHgDAHAAQAJAAAHADQAHACAFAGQAFAFADAHQADAHAAAIIAAAFIg9AAIADAIIAFAHIAHADIAIACIAHgBIAGgDQAGgEADgGIANAIQgCAEgEAEQgDAEgFACIgJAFQgGABgGAAQgKgBgFgCgAAXgHIgDgIIgFgFIgHgDIgIgBQgDAAgDABQgEACgDACIgFAFIgDAHIAsAAIAAAAg");
	this.shape_9.setTransform(-30,-56.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AASA3IAAgrIgBgIIgDgFQgDgDgDgBQgEgCgEAAQgDAAgDACIgGAEQgDACgBAEQgCAEAAAFIAAApIgQAAIAAhtIAQAAIAAAsQAEgFAGgDQAGgDAGAAQAHAAAGACQAFADAEAEQAEAEACAGQADAFAAAIIAAAsg");
	this.shape_10.setTransform(-38.6,-58.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAUAzQgJAAgFgCQgGgBgCgEQgEgDgCgGIgBgPIAAgdIgMAAIAAgOIAMAAIAAgSIAQgJIAAAbIAQAAIAAAOIgQAAIAAAdIAAAIQAAADACACIAFACIAJABIAAAPg");
	this.shape_11.setTransform(-45.7,-57.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AATAmIAAgpIgBgJIgEgGQgCgDgEgBQgDgBgEAAQgEAAgDABIgGAEIgEAHQgCAEAAAFIAAAoIgQAAIAAhKIAQAAIAAAKQAEgFAGgDQAGgDAGAAQAHAAAGACQAGACAEAEQAEAFACAGQACAGAAAHIAAArg");
	this.shape_12.setTransform(-55.7,-56.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHA2IAAhKIAPAAIAABKgAgHgjQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_13.setTransform(-61.5,-58.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgOAkQgHgDgGgFQgFgFgDgIQgDgHAAgHQAAgIADgHQADgHAGgFQAFgGAHgDQAHgDAHAAQAJAAAHADQAHACAFAGQAFAFADAHQADAHAAAIIAAAFIg9AAIADAIIAFAHIAHADIAIACIAHgBIAGgDQAGgEADgGIANAIQgCAEgEAEQgDAEgFACIgJAFQgGABgGAAQgKgBgFgCgAAXgHIgDgIIgFgFIgHgDIgIgBQgDAAgDABQgEACgDACIgFAFIgDAHIAsAAIAAAAg");
	this.shape_14.setTransform(-70.5,-56.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AATAmIAAgpIgBgJIgEgGQgCgDgEgBQgDgBgEAAQgEAAgDABIgGAEIgEAHQgCAEAAAFIAAAoIgQAAIAAhKIAQAAIAAAKQAEgFAGgDQAGgDAGAAQAHAAAGACQAGACAEAEQAEAFACAGQACAGAAAHIAAArg");
	this.shape_15.setTransform(-79.2,-56.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPAlQgGgDgGgFQgFgGgDgHIgCgHIgBgJQAAgFADgKQADgHAFgFQAFgGAHgCQAHgDAHAAQAHAAAGADQAHADAEAFIAAgJIAQAAIAABKIgQAAIAAgLQgEAGgHADQgGADgHAAQgHAAgHgCgAgIgWQgEADgDADQgEADgBAFQgCAEAAAEQAAAFACAFQABAEAEADQADADAEACQAFACADAAQAFAAAFgCQAEgCADgDQAEgDABgEQACgFAAgFQAAgEgCgEQgBgFgEgDQgDgDgEgDQgFgCgFAAQgDAAgFACg");
	this.shape_16.setTransform(-88.1,-56.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgJAmQgFgBgEgCIgIgGIgFgHIAOgIQADAGAFACQAFADAGAAQAHAAADgDQAEgDAAgEQAAgEgGgCIgMgEQgNgDgEgCQgFgCgCgEQgCgEAAgFQAAgFACgEQACgEAEgEIAJgEQAGgCAFAAIAKABIAJADIAHAEIAFAGIgNAIQgDgFgEgCQgFgCgGAAQgFAAgDADQgEADAAADQAAAEAFACIAMAEIAKACQAFACADACQAEACADADQACAEAAAGQAAAEgCAEQgCAFgEADQgEAEgFACQgGACgIAAIgKgBg");
	this.shape_17.setTransform(-96.2,-56.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AATAmIAAgpIgBgJIgEgGQgCgDgEgBQgDgBgEAAQgEAAgDABIgGAEIgEAHQgCAEAAAFIAAAoIgQAAIAAhKIAQAAIAAAKQAEgFAGgDQAGgDAGAAQAHAAAGACQAGACAEAEQAEAFACAGQACAGAAAHIAAArg");
	this.shape_18.setTransform(-103.9,-56.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgHA2IAAhKIAPAAIAABKgAgHgjQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_19.setTransform(-109.7,-58.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAIARIgDgKIgCgLIAAgMIAOAAIAAAMIgCALIgDAKgAgLARIgDgKIgBgLIAAgMIAMAAIAAAMIgBALIgCAKg");
	this.shape_20.setTransform(-113.6,-62);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// box
	this.instance = new lib.box();
	this.instance.parent = this;
	this.instance.setTransform(-120,-70.2,1.83,0.26,0,0,0,0,-0.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// line
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#00234B").p("Ah8jqID5HV");
	this.shape_21.setTransform(-12.5,-23.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(1));

}).prototype = getMCSymbolPrototype(lib.word11, new cjs.Rectangle(-120,-70,188,71), null);


(lib.blob = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(108));

	// FlashAICB
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBF456").s().p("EgDWAhLQqqgqmrhJQn1hWkviWQlKikiUkGQickTAamaQAUlKCTkqQCBkEDykMQC5jMFEkZQBJg/DTi0QC4idBuhhQD+jgE6iYQEriRFNhHQFFhEFKAHQFHAHEuBRQEzBSD9CWQEFCbC2DXQC/DiBcEWQBgEmgVFRQgmJmjoHhQjgHTmKE7QmDE1oMCMQmcBvnaAAQiBAAiHgJg");
	this.shape.setTransform(274,225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FAF458").s().p("EgBUAhQIiBgGQh3gHhwgIQi4gNikgPQktgcjlgmQhKgMhFgOQlthIj4hwIgxgYQlKiiiUkHIgFgIQiXkRAamUQAUlKCTkqQA3hvBMhxQBliXCLiZQC5jNFCkZIBahOIDDimQC3idBvhhQD+jgE5iZQBZgrBdglQDZhWDpgzQFEhFFKAGIA+ACQEmAMESBIQCiArCTA+QCDA3B4BHQDAByCVCTIAFAEQAzAzAvA2QC/DiBcEWQBhEmgUFQIAAAHQghIji9G6QgWAzgYAxQjUG4lqEwIgtAlQmEE1oNCLQiYApihAaQkZAskyAAQg7AAg9gBg");
	this.shape_1.setTransform(273.9,224.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F9F459").s().p("EgBUAhOIiBgFIjmgOQi3gMilgOQkugajkglQhKgMhFgOQlthGj4hvIgxgYQlLiiiVkHIgFgIQiWkQAamVQAUlKCTkrQA3huBMhxQBliYCKiZQC5jOFCkZIBahOIDCimQC3icBvhiQD+jhE5iYQBagsBcglQDZhXDpgzQFEhGFKAFIA9ACQEnALESBIQCiAqCTA9QCEA3B3BHQDAByCVCTIAFAFQA0AzAuA2QC/DiBdEUQBiEmgTFRIAAAHQgfIii9G7QgWAzgYAxQjUG3lsEwQgWATgXASQmEE0oNCLQiZApihAZQkfAuk7AAIhpgBg");
	this.shape_2.setTransform(273.8,224.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F8F45B").s().p("EgBUAhMIiBgEIjmgNQi2gLilgNQkugYjkglQhKgLhFgNQlthEj5hwIgxgXQlLiiiVkGIgFgIQiXkRAamVQAVlJCTksQA3huBLhyQBmiXCJiaQC6jOFBkZIBahOIDCinQC3icBvhiQD+jhE4iZQBagsBcglQDZhYDpgzQFEhIFJAFQAfAAAfACQEmAKESBHQCjAqCTA9QCEA3B3BGQDBByCVCTIAEAFQA0AzAuA2QDADiBdEUQBjEmgSFQIAAAHQgdIji+G6QgWAzgYAyQjTG3ltEvIguAlQmEEzoOCLQiZApihAZQkpAvlFAAIhVgBg");
	this.shape_3.setTransform(273.7,224.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F8F45C").s().p("EgBUAhKIiBgDIjmgLQi1gLimgMQkugXjjgjQhLgLhFgMQlthDj5hvIgxgXQlLiiiWkGIgFgIQiXkRAamVQAVlJCTksQA3hvBMhxQBliYCJiaQC6jPFAkZIBahOQBLhCB3hlQC2icBwhiQD+jhE4iaQBZgsBdglQDZhYDog1QFEhIFJAEQAfAAAfACQEnAIESBHQCiAqCUA8QCDA3B4BGQDBByCUCTIAFAFQA0AzAuA2QDADiBdEUQBkEmgQFQIAAAHQgcIji9G6QgWAzgZAyQjTG2lvEwIgtAkQmEEzoPCKQiZApihAZQkvAwlOAAIhGgBg");
	this.shape_4.setTransform(273.7,224.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F7F45E").s().p("EgBUAhJQg/gBhBgCIjmgKIlbgVQkugVjkgiQhKgKhFgNQlshBj6hvIgygXQlLigiWkHIgFgIQiXkRAamVQAVlJCTksQA3hvBLhxQBliYCKiaQC5jQFAkZIBZhPIDCinQC2icBwhjQD/jhE3iaQBagsBcgmQDZhYDog1QFEhJFJADIA9ABQEnAIESBGQCjApCUA9QCDA2B4BHQDBBxCVCUIAEAEQA0AzAuA2QDADiBeEUQBlEmgPFPIAAAHQgaIji+G7QgWAzgYAyQjUG2lvEvQgWATgXARQmGEyoPCKQiYAoiiAZQk6AylbAAIguAAg");
	this.shape_5.setTransform(273.6,224.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F6F35F").s().p("EgBUAhHIiAgCIjmgJIlbgTQktgTjkghQhKgKhFgMQlshAj7huIgxgXQlMigiWkHIgFgIQiYkQAbmWQAUlICUktQA3hvBLhyQBliYCJiaQC5jQFAkaIBZhOIDCinQC1idBwhjQD/jhE4ibQBZgsBcgmQDZhZDog1QFEhKFJACIA9ABQEnAHESBGQCjAoCTA9QCFA2B3BGQDBBxCVCUIAFAEQAzAzAuA2QDBDjBfETQBlEmgOFPIAAAHQgYIji+G7QgWAzgYAyQjUG2lxEuIgtAlQmGEwoPCKQiZAoiiAZQlFAzlpAAIgVAAg");
	this.shape_6.setTransform(273.5,224.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F5F361").s().p("EgBUAhFQg/AAhBgCIjmgHIlagRQkugRjjggQhKgKhGgMQlsg9j7huIgxgXQlMigiXkGIgFgIQiYkRAbmVQAVlJCTktQA3hwBLhxQBliYCJibQC5jRE/kZIBZhPIDCinQC1icBwhkQD/jhE3icQBZgsBcgmQDahZDng2QFEhLFJABIA9ABQEnAGESBFQCjAoCUA8QCEA2B4BGQDBBxCVCUIAEAEQA0AzAuA2QDBDiBfEUQBnEmgOFOIAAAHQgWIji+G8QgWAzgYAyQjUG1lyEuIgtAlQmGEwoQCJQiZAoiiAZQlLA0lxAAIgHAAg");
	this.shape_7.setTransform(273.4,223.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F4F362").s().p("EgDUAhCIjlgHIlbgOQktgQjjgfQhKgJhGgMQlsg8j7htIgygXQlMifiXkHIgFgIQiZkQAbmWQAVlICUkuQA3hvBLhyQBliYCJibQC5jSE+kaIBZhOIDBioQC1icBxhkQD/jhE3icQBZgtBcgmQDZhaDng2QFEhMFIABIA+AAQEnAGESBEQCjAnCUA8QCEA2B4BGQDCBwCUCVIAFAEQAzAzAuA2QDBDjBgESQBoEmgNFOIAAAHQgUIji+G8QgWAzgYAyQjVG1lyEuIguAkQmGEwoRCIQiZAoiiAZQlOA1l1ABIiAgBg");
	this.shape_8.setTransform(273.3,223.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F3F364").s().p("EgDUAhBIjlgGQiygHiogFQktgOjjgeQhLgJhFgLQlsg6j8huIgxgWQlNifiXkGIgFgIQiZkRAbmWQAVlICUkuQA3hvBLhyQBkiZCJibQC5jSE9kaIBahPIDAioQC1ibBxhlQD/jiE3icQBZgtBcgmQDZhaDmg3QFEhNFJAAQAfgBAeABQEoAFESBDQCjAnCUA8QCFA1B3BGQDCBwCUCVIAFAEQAzAzAvA2QDBDjBgESQBpEmgMFOIAAAGQgSIki+G8QgWAzgZAyQjUG1l0EtIguAlQmGEuoRCIQiaAoihAZQlPA0l0ADIgrAAIhWAAg");
	this.shape_9.setTransform(273.2,223.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F365").s().p("EgDUAg/IjlgEQixgGipgFQktgMjjgcQhKgJhFgKQlsg6j9hsIgxgXQlOieiXkHIgFgIQiZkQAbmWQAVlICUkuQA3hwBLhxQBliaCIibQC5jTE9kaIBZhOQBMhEB0hlQC1ibBxhlQD/jjE3icQBYgtBcgmQDZhbDng3QFEhOFIgBIA9AAQEoADESBDQCjAnCUA7QCFA1B4BGQDCBwCUCVIAEAEQA0AzAuA2QDCDjBhESQBpElgKFOIAAAGQgQIki/G9QgWAzgZAyQjUG0l1EtQgWATgYASQmHEtoSCIQiZAoiiAZQlOA0l0AEIhAABIhBgBg");
	this.shape_10.setTransform(273.2,223.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F2F367").s().p("EgDTAg+IjlgDQixgGipgDQktgKjjgcQhKgIhFgKQlsg3j9htIgygWQlOieiXkGIgFgIQiakRAcmWQAVlHCUkwQA3hwBLhxQBkiZCIibQC6jVE7kaIBZhOQBNhEB0hlQC0icByhlQD/jiE2idQBZgtBbgnQDZhbDng4QFDhOFIgDIA+AAQEnADETBCQCjAmCUA7QCFA1B4BGQDCBwCUCVIAFAEQAzAzAvA2QDBDjBiERQBqEmgJFNIAAAHQgPIki+G8QgXA0gYAxQjUG0l3EtQgWATgXARQmIEtoSCIQiZAniiAZQlOA0l1AGIhVABIgrAAg");
	this.shape_11.setTransform(273.1,223.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F1F369").s().p("EgG4Ag7QiwgGipgBQktgJjjgaQhKgIhFgKQlsg2j+hsIgxgWQlPidiXkHIgFgIQiakRAbmVQAWlICUkvQA2hxBLhxQBliZCIicQC5jVE7kaIBZhPQBMhEB0hkQC0icByhlQEAjjE1idQBZguBbgmQDZhcDmg5QFEhPFIgDIA9AAQEoABESBBQCkAnCUA6QCFA1B5BFQDCBwCUCWIAEADQA0A0AuA2QDCDjBiEQQBrEngIFMIAAAHQgNIki/G9QgWAzgYAyQjVGzl3EtIguAkQmIEsoTCHQiZAoiiAYQlOA0l1AIIiAABIjlgBg");
	this.shape_12.setTransform(273,223.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F0F36A").s().p("EgG4Ag7QivgGiqABQktgIjjgZQhKgHhFgKQlsg0j+hrIgxgXQlPiciYkGIgFgIQiakRAcmXQAVlHCUkwQA3hwBLhyQBkiZCIibQC5jWE6kaIBZhPQBNhFBzhkQCzicBzhlQEAjkE1idQBYguBcgnQDZhcDmg5QFDhQFIgFIA9AAQEoABESBBQCkAlCVA6QCFA1B4BGQDCBvCUCWIAFADQAzA0AvA1QDCDkBiEQQBsEmgHFMIAAAHQgKIki/G9QgXA0gYAyQjVGyl4EtIguAkQmIEroUCHQiZAoiiAYQlOAzl1AKIiAACIjlAAg");
	this.shape_13.setTransform(272.9,223.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EFF36C").s().p("EgMRAg3QksgGjjgXQhKgHhFgKQlsgyj+hrIgygXQlPiciYkGIgFgIQibkRAcmWQAWlHCUkxQA3hwBKhyQBliZCHicQC5jXE6kaIBZhPQBMhFB0hkQCzicByhmQEAjjE1ieQBZgtBbgoQDZhdDlg5QFEhRFIgFQAegBAfAAQEoAAESBAQCkAlCVA6QCFA1B4BFQDDBvCUCWIAEAEQA0AzAuA2QDCDjBjEQQBtEmgGFMIAAAHQgIIkjAG+QgWAzgYAyQjVGyl6EsIguAkQmJEroTCGQiaAniiAZQlOAzl1AMIiAACQh0AAhwABQivgEirABg");
	this.shape_14.setTransform(272.8,223.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EEF36D").s().p("EgMQAg4QktgEjigXQhLgGhFgJQlrgxj/hrIgygWQlPibiZkHIgFgIQibkRAcmWQAWlHCUkxQA3hwBLhyQBkiaCHicQC5jXE5kaIBZhPQBNhGBzhkQCyibBzhnQEAjjE1ifQBYgtBcgoQDYhdDmg6QFDhSFIgGQAegBAfAAQEogBESA/QCkAlCVA6QCGA0B4BFQDDBvCTCXIAFADQAzAzAvA2QDCDjBkEQQBuEmgGFLIABAHQgHIkjAG+QgWA0gYAxQjVGzl7EsIguAjQmJEqoUCGQiaAniiAYQlOAzl1AOQg/AChBABIjkACQiugEirADg");
	this.shape_15.setTransform(272.8,223.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EDF36F").s().p("EgUeAghQhLgGhFgJQlrgvkAhqIgygWQlPibiZkGIgFgIQibkSAcmWQAWlGCUkyQA3hxBKhxQBkiaCHicQC6jZE4kaIBZhPQBMhGBzhkIEmkCQEAjjE0ifQBZguBbgoQDYheDmg6QFDhTFHgHIA9gBQEpgCESA+QCkAlCVA5QCGA0B4BFQDDBvCUCXIAEADQAzAzAvA2QDCDkBlEPQBvEmgFFLIABAHQgFIkjAG+QgWA0gZAxQjUGyl8EsQgXASgXARQmKEqoVCFQiaAniiAYQlNAzl2APQg/ADhAABIjlADQitgDisAEQksgCjigWg");
	this.shape_16.setTransform(272.7,223);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#ECF370").s().p("EgUeAgkQhKgGhFgIQlrgtkBhrIgygWQlQiaiZkGIgFgIQickRAdmXQAWlGCUkyQA3hxBKhyQBkiaCHicQC6jZE3kaIBZhQQBNhFByhkQCyicB0hnQEAjkE0ifQBYguBbgoQDZhfDlg7QFDhTFHgIIA9gBQEpgDESA+QCkAkCWA5QCGAzB4BFQDDBvCTCXIAFADQAzA0AvA1QDCDkBmEPQBvEmgDFKIAAAHQgDIljAG+QgWA0gYAxQjVGyl9ErIgvAkQmKEooVCFQiaAniiAYQlNAyl2ASIiAAEIjkAEQisgCisAFQktAAjigVg");
	this.shape_17.setTransform(272.6,223.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#ECF272").s().p("EgUdAgnQhKgFhFgJQlrgrkBhqIgygWQlRiZiZkHIgFgIQickRAdmXQAWlGCUkyQA3hxBKhyQBkiaCHidQC5jZE3kbIBYhPQBNhGBzhkIElkDQEAjkE0igQBYguBcgoQDYhfDlg8QFDhVFHgIIA9gCQEpgDESA9QCkAjCVA6QCHAzB4BFQDDBvCUCWIAEADQAzA0AvA2QDDDjBmEOQBwEngCFKIAAAHQgBIkjAG/QgWAzgZAyQjVGyl+EqIguAkQmLEnoWCFQiZAnijAYQlNAyl2ATIh/AFQh0AChwADQisgBitAGIgrAAQkSAAjRgSg");
	this.shape_18.setTransform(272.5,223.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EBF273").s().p("EgUcAgqQhLgFhFgIQlrgqkBhpIgygWQlRiZiakHIgFgIQickRAdmWQAWlGCVkzQA2hxBKhyQBkibCGicQC6jbE2kaIBZhQQBNhGByhkIElkDQEAjlE0igQBYguBbgoQDYhgDlg8QFDhWFHgJIA9gCQEpgEESA8QClAjCVA5QCGAzB5BFQDDBvCTCXIAFACQAzA0AvA2QDDDjBmEOQByEngCFJIABAHQABIljBG/QgWAzgZAyQjUGxmAEqQgXATgXARQmLEnoXCEQiaAmiiAYQlNAyl2AVIh/AGQh0AChwAEQirgBiuAIIhgAAQjxAAi8gPg");
	this.shape_19.setTransform(272.5,223.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EAF275").s().p("EgUcAgsQhKgEhFgIQlrgokChpQgagLgYgLQlSiYiakHIgFgIQickRAdmXQAXlFCUk0QA2hxBLhyQBjibCGidQC6jbE2kaIBYhQQBNhHByhkQCwibB1hoQEBjkEyihQBZgvBbgoQDYhgDkg9QFDhWFHgLIA9gBQEpgGESA8QClAjCVA4QCHAzB5BEQDDBvCTCXIAEADQA0A0AuA1QDEDkBnEOQByEmAAFJIAAAHQADIljAG/QgXA0gYAxQjVGxmBEqIgvAkQmLEloXCEQiaAnijAYQlMAxl2AXIiAAGQhzADhwAFQirAAitAIIiFACQjaAAivgOg");
	this.shape_20.setTransform(272.4,223.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E9F276").s().p("EgUbAgvQhLgEhEgHQlrgnkChpIgzgVQlSiYiakHIgFgIQidkRAemXQAWlFCVk0QA2hxBKhyQBkibCGidQC6jcE0kbIBYhQQBOhHBxhjIElkEQEBjlEzihQBYgvBbgoQDYhhDkg9QFDhXFGgMIA9gCQEqgGESA7QClAiCVA5QCHAyB5BFQDDBuCTCYIAEACQA0A0AvA2QDDDjBoENQBzEnABFJIAAAHQAFIkjBHAQgWA0gZAxQjVGxmCEpIguAkQmMEloXCDQiaAnijAXQlNAyl2AYIh/AHQhzADhxAGQiqAAiuAKQhbAChVAAQjBAAicgLg");
	this.shape_21.setTransform(272.3,223.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E8F278").s().p("EgUbAgyQhKgEhFgHQlrglkChoIgzgWQlSiXibkHIgFgIQidkRAemXQAXlFCUk1QA3hxBKhyQBjibCGieQC6jcE0kbIBYhQQBNhHBxhkIElkEQEBjlEyihQBZgvBagpQDZhhDjg+QFDhYFGgMIA9gCQEqgHESA6QClAiCWA4QCHAyB4BEQDEBvCTCXIAEADQA0AzAvA2QDDDkBoENQB0EmACFJIABAHQAHIkjCHBQgWAzgZAyQjVGwmDEpIguAjQmMEloYCDQibAmijAYQlMAxl2AaIh/AHQhzAEhxAGQipACiuALQhvADhlAAQisAAiOgJg");
	this.shape_22.setTransform(272.3,223.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E7F279").s().p("EgUaAg0QhLgEhEgGQlrgjkDhoIgzgWQlSiXickGIgFgIQidkRAemXQAXlFCUk1QA3hyBKhyQBjibCGieQC5jdE0kbIBYhQQBNhIBxhjIElkFQEBjlEyiiQBYgvBbgpQDYhhDkg+QFDhaFGgNIA9gCQEpgIESA6QClAhCWA4QCHAyB5BEQDEBuCTCYIAEACQA0A0AuA2QDEDkBpEMQB1EnADFIIAAAGQAJIljBHBQgXAzgYAyQjWGwmEEpIguAjQmNEkoZCCQiaAmijAYQlMAxl2AcIh/AIQhzAEhxAHQioACivAMQiDAFh1AAQiWAAh/gIg");
	this.shape_23.setTransform(272.2,223.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E6F27B").s().p("EgUaAg2QhKgDhFgGQlrgikDhnIgzgWQlTiWibkGIgFgIQiekSAemXQAXlECVk2QA2hxBKhzQBjibCGieQC5jeEzkbIBYhQQBOhIBwhjIElkFQEBjlEyijQBYgvBbgpQDYhiDjg/QFDhaFGgOIA9gDQEqgJESA5QClAhCWA4QCHAyB5BEQDEBuCTCYIAEACQAzA0AvA2QDEDkBpELQB2EnAEFIIABAGQAKImjBHAQgWA0gZAyQjWGvmFEpIgvAjQmNEioZCDQiaAmijAXQlMAxl3AeIh/AIQhyAFhxAHQinADiwAOQiTAGiBAAQiGAAhzgHg");
	this.shape_24.setTransform(272.2,223.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E6F27D").s().p("EgUZAg5QhKgDhFgGQlqggkFhnIgzgVQlTiWibkHIgFgIQiekRAemXQAXlFCVk2QA2hxBKhzQBjibCFieQC6jfEykbIBXhQQBOhJBwhjIEmkFQEBjlExijQBYgwBbgpQDYhiDjhAQFDhbFFgPQAfgCAeAAQEqgKESA4QCmAhCWA3QCHAxB5BEQDEBuCTCZIAEACQA0AzAuA2QDFDkBpEMQB3EmAFFIIABAGQAMImjBHBQgXAzgZAyQjVGvmHEoQgWASgYARQmOEioZCCQiaAmikAXQlMAxl2AgIh/AIQhyAGhxAIQinADiwAPQilAIiOAAQh0AAhmgFg");
	this.shape_25.setTransform(272.1,223.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E5F27E").s().p("EgUYAg7QhLgDhFgGQlqgekFhmIgzgWQlTiVickGIgFgIQiekSAemXQAXlECVk3QA2hxBKhzQBjicCFieQC6jgExkbIBYhQQBOhJBvhjIEmkFQEBjmExijQBYgwBagpQDYhjDjhAQFDhcFFgQQAfgCAeAAQEqgLETA3QClAhCWA2QCIAyB5BDQDEBuCTCZIAEACQAzA0AvA1QDFDlBqELQB4EmAGFHIAAAHQAPIljCHCQgXAzgYAyQjWGumIEoIguAjQmOEioaCBQibAmijAXQlMAxl3AhIh+AJQhyAGhxAJQinAEiwAQQi2AKibAAQhjAAhYgEg");
	this.shape_26.setTransform(272,223.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#E4F280").s().p("EgUYAg9QhLgChEgFQlqgdkGhmIgzgWQlUiUickHIgFgIQifkRAfmXQAXlECVk3QA3hyBJhzQBjicCFieQC6jhEwkbIBYhQQBOhJBvhjIEmkGQEBjmEwikQBYgvBbgqQDYhjDihBQFDhcFFgSIA9gCQErgMESA3QClAgCXA2QCIAyB4BDQDFBuCTCZIADACQA0AzAvA2QDFDkBrELQB4EnAHFGIABAHQAQIljCHCQgWA0gZAxQjWGumJEoIgvAjQmOEgoaCCQibAlijAXQlMAxl3AjIh/AKQhxAGhxAKQimAEixASQjEALijAAQhXAAhOgDg");
	this.shape_27.setTransform(272,224);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#E3F281").s().p("EgUXAg/QhLgChFgFQlqgbkGhmIgzgVQlUiUidkGIgFgIQifkSAfmXQAYlECVk4QA2hxBJhzQBjidCFieQC6jhEwkbIBXhRQBOhJBvhjIEmkGQEBjmEwikQBYgwBagqQDYhkDjhBQFChdFFgTIA9gCQErgNESA2QCmAgCWA2QCIAxB5BDQDFBuCSCZIAEACQA0AzAvA2QDFDlBrEKQB5EmAJFHIAAAGQATImjDHCQgWA0gZAxQjWGumKEnIgvAjQmOEgobCBQibAlikAXQlLAwl3AlIh/AKQhxAIhxAKQilAFiyATQjRANisAAQhLAAhDgCg");
	this.shape_28.setTransform(271.9,224.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#E2F283").s().p("EgUXAhBQhLgBhEgFQlqgZkHhmIgzgVQlViTickHIgFgIQigkRAfmYQAYlDCVk4QA2hyBKhzQBjidCEieQC6jiEvkbIBXhRQBOhJBvhjIElkHQECjmEwilQBYgwBagpQDYhlDihCQFDheFEgTIA9gDQErgNESA1QCmAfCXA2QCIAxB5BDQDFBtCSCaIAEABQA0A0AuA2QDGDkBsEKQB6EnAJFGIABAGQAUImjDHCQgWA0gZAyQjWGtmLEnIgvAjQmPEfocCAQiaAlikAXQlLAwl3AnIh/ALQhxAIhxAKQikAGizAVQjfAPi1AAQg+AAg5gCg");
	this.shape_29.setTransform(271.9,224.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#E1F184").s().p("EgUXAhDQhKgBhFgEQlqgYkHhlIgzgVQlViTidkGIgFgIQigkSAfmYQAYlDCVk4QA3hyBJh0QBjicCDifQC7jiEukcIBXhRQBPhJBuhjIElkHQECjmEwimQBXgwBbgqQDXhlDihCQFDhfFEgUIA9gDQErgOESA0QCmAfCXA2QCIAwB5BDQDGBtCSCaIADABQA0A0AvA2QDGDlBsEJQB7EnALFFIAAAHQAXIljDHDQgXA0gZAyQjVGtmNEmQgXASgYARQmPEeodCAQiaAlikAXQlLAwl3AoIh/AMQhxAIhxALQikAHiyAWQjvARjAAAIhdgBg");
	this.shape_30.setTransform(271.8,224.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E0F186").s().p("EgUWAhFQhLAAhEgFQlqgVkIhlIgzgVQlWiSidkHIgFgIQigkSAgmXQAYlECVk4QA2hyBJh1QBjicCDieQC7jkEtkbIBXhRQBPhKBuhjIElkHQECjnEvilQBYgxBagqQDYhlDihDQFChgFEgVIA9gDQErgQETA0QCmAfCWA1QCJAwB5BDQDGBtCSCaIADACQA0AzAvA2QDGDlBtEJQB8EnALFFIABAGQAYImjDHDQgXA0gZAxQjVGtmOEnIgvAiQmQEdodCAQiaAlikAXQlLAvl4AqIh+ANQhxAIhxAMQijAIizAXQj8AUjHAAIhIgBg");
	this.shape_31.setTransform(271.8,224.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#DFF187").s().p("EgUWAhHQhKAAhFgEQlqgUkIhlIgzgVQlWiRiekHIgFgIQigkRAgmYQAYlDCVk6QA2hxBJh1QBjicCDifQC6jkEukcQAighA1gwQBOhKBuhjIElkHQECjnEvimQBYgxBagqQDXhmDihDQFChhFFgWIA8gEQEsgQESA0QCmAdCXA2QCJAwB5BDQDFBsCSCaIAEACQA0AzAvA2QDGDlBtEJQB9EmANFFIAAAHQAaImjDHDQgWA0gZAxQjWGtmPEmIgvAiQmREdodB/QibAlikAXQlKAvl4AsIh+ANQhxAJhxAMQiiAJi0AYQkLAXjQAAIgwgBg");
	this.shape_32.setTransform(271.7,224.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#DFF189").s().p("EgUVAhJQhLAAhEgDQlqgTkJhkIgzgVQlWiRiekGIgFgIQihkSAgmYQAYlDCVk6QA2hyBJh0QBjidCDifQC6jlEtkbIBXhSQBOhKBuhjIElkHQECjnEvinQBXgxBagqQDYhnDhhDQFChiFFgXIA8gEQEsgRESAzQCmAdCXA1QCJAwB6BDQDFBsCSCbIAEABQAzA0AvA1QDHDlBuEJQB+EmANFEIABAHQAcImjEHEQgWA0gZAxQjWGsmQEmQgXASgYAQQmREcoeB/QibAlikAWQlKAvl4AuIh+ANQhxAKhxAOQiiAIi0AaQkSAZjSAAIgmAAg");
	this.shape_33.setTransform(271.7,224.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#DEF18A").s().p("EgWkAhIQlqgRkJhjIgzgVQlXiRiekGIgFgIQihkSAgmYQAYlCCWk7QA2hyBJh1QBiicCDifQC6jmEskcIBXhRQBPhLBthjIElkHQECjoEvinQBXgxBagqQDYhnDghFQFDhjFEgXIA8gEQEsgSESAyQCnAdCXA1QCJAvB5BDQDGBsCSCbIADABQA0A0AvA2QDHDlBuEHQB/EnAPFEIAAAHQAeImjDHEQgXAzgZAyQjWGsmRElIgwAjQmREaoeB/QibAkikAXQlKAvl4AvIh/AOQhwALhxAOQihAJi1AbQkqAdjggBIgVAAQhAAAg6gDg");
	this.shape_34.setTransform(271.6,225);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#DDF18C").s().p("EgWkAhKQlpgPkKhjIgzgVQlXiQifkGIgFgIQihkSAgmYQAZlDCVk6QA2hzBJh0QBiidCDigQC6jmErkcIBXhRQBPhMBthiIElkIQEDjoEtinQBYgxBagrQDXhnDhhFQFChkFEgZIA8gEQEsgSESAxQCnAcCXA1QCKAvB5BDQDGBsCSCbIADABQA0AzAvA2QDHDlBvEIQB/EnAQFDIABAHQAgImjEHEQgXA0gZAyQjWGrmSElIgwAiQmREaofB+QibAlikAWQlLAvl4AxIh+APQhwAKhxAPQigAKi1AcQkrAfjfAAIglABQg3AAg0gDg");
	this.shape_35.setTransform(271.6,225.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#DCF18E").s().p("EgWjAhNQlpgOkLhjIgzgUQlYiQiekGIgFgIQiikSAgmYQAZlCCVk8QA2hyBJh1QBiidCDifQC6joErkbIBWhSQBPhMBthiIElkIQEDjoEtioQBXgxBagrQDYhoDghFQFChlFEgaIA8gEQEsgTETAwQCmAcCYA0QCJAvB6BDQDGBsCSCbIADABQA0A0AvA1QDHDlBvEIQCBEmARFDIAAAHQAiImjEHFQgXA0gZAyQjWGqmTElIgwAiQmSEaofB9QibAlikAWQlLAvl4AyIh+AQQhwALhxAPQigALi1AdQkrAhjfABIgxABQgxAAgtgCg");
	this.shape_36.setTransform(271.5,225.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#DBF18F").s().p("EgWjAhPQlpgMkLhiIgzgUQlYiPifkHIgFgIQiikSAgmYQAZlCCWk8QA2hzBIh0QBjidCCihQC6joEqkbQAigiA0gwQBPhMBthiIElkIQEDjoEtipQBXgxBagsQDXhoDhhGQFBhlFEgbIA8gEQEtgVESAwQCnAcCXA0QCKAvB5BCQDHBsCRCbIAEABQAzA0AvA2QDIDkBwEHQCBEnASFDIABAHQAjImjEHEQgWA0gaAyQjWGrmUEkIgwAiQmSEZogB9QibAkilAXIrCBjIh+APQhwAMhxAQQifAMi2AeQkqAijfACIhCABIhOgBg");
	this.shape_37.setTransform(271.5,225.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#DAF191").s().p("EgWiAhRQlpgKkMhiIgzgUQlZiPifkGIgFgIQiikSAhmZQAYlBCWk8QA2hzBJh1QBiidCCigQC6jpEpkcQAjgiAzgwQBQhMBshiIElkJQEDjoEsipQBYgyBZgrQDYhpDhhGQFBhnFDgbIA8gFQEtgVESAvQCnAbCYA0QCKAuB5BDQDHBrCRCcIADABQA0AzAvA2QDIDlBxEHQCCEnATFCIAAAHQAmImjFHFQgWA0gZAyQjXGqmVEkIgwAiQmTEYogB9QibAkilAWIrCBkIh+ARQhwAMhxARQieAMi3AgQkqAkjfADIhJACIhGgCg");
	this.shape_38.setTransform(271.4,225.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#D9F192").s().p("EgWiAhUQlpgJkMhiIg0gUQlZiOifkGIgFgIQijkSAhmZQAZlBCWk9QA2hyBIh2QBiidCCigQC7jqEokcIBWhSQBPhMBshiIElkKQEDjoEtiqQBXgxBagsQDXhpDghHQFBhoFDgcIA9gEQEtgXESAvQCnAbCYAzQCKAuB5BCQDHBsCRCcIADAAQA0A0AvA2QDIDlByEGQCDEnAUFCIAAAGQAoInjFHGQgWAzgaAyQjWGqmXEkIgwAiQmTEXohB8QibAkilAWQlJAul5A4Ih+ARQhvANhyARQidANi3AhQkqAmjfAFQgvABgsAAIg0AAg");
	this.shape_39.setTransform(271.4,225.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#D9F194").s().p("EgWiAhWQlpgHkMhhIg0gUQlZiOigkGIgFgIQijkSAhmZQAZlBCWk9QA2hzBJh1QBhieCCigQC7jrEnkcQAjgiAzgwQBQhMBrhiIElkKQEDjpEsipQBYgyBZgsQDXhqDhhHQFBhpFCgdIA9gFQEtgXESAuQCnAaCYAzQCKAvB6BCQDHBrCRCcIADAAQA0A0AvA2QDIDlByEGQCEEnAVFBIABAHQApInjFHGQgWAzgaAyQjWGpmYEkIgwAiQmTEWoiB8QibAkilAWQlJAul5A6Ih+ARQhvAOhyASQicANi4AiQkqAojfAGQgyACgvAAIgugBg");
	this.shape_40.setTransform(271.4,226);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#D8F195").s().p("EgWhAhYQlpgFkNhhIg0gUQlZiNihkGIgFgIQijkSAhmZQAalBCVk+QA2hyBJh2QBiieCBigQC6jsEnkcIBWhSQBQhNBrhiIElkKQEDjoEsirQBXgxBagsQDXhrDghIQFBhpFDgeIA8gFQEtgYESAtQCnAaCZAyQCKAuB6BCQDHBrCRCdIADAAQA0A0AvA2QDIDlBzEFQCFEnAVFBIABAHQAsInjFHGQgXA0gZAyQjXGomZEkQgYARgYAQQmUEWoiB8QibAjilAWQlKAul4A7Ih+ASQhvAOhyATQicAOi4AkQkqApjeAHQg6ADg3AAIgegBg");
	this.shape_41.setTransform(271.3,226.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D7F097").s().p("EgWhAhaQlpgDkNhhIg0gUQlaiMigkHIgFgIQikkSAimZQAZlACWk+QA2hzBIh2QBiieCBigQC6jsEnkdIBWhSQBPhNBrhiQCpiaB8hwQEDjpEsirQBXgyBZgsQDXhrDghJQFBhqFDgfIA8gFQEtgZESAsQCoAaCYAzQCLAtB5BCQDIBrCRCdIADAAQA0A0AvA1QDIDmBzEFQCGEnAXFAIABAHQAtInjFHGQgXA0gZAyQjXGpmaEiIgwAiQmVEVoiB7QicAjikAXQlKAtl5A9Ih9ATQhvAOhyAUQibAOi5AlQkpArjfAIQg8AEg3AAIgcgBg");
	this.shape_42.setTransform(271.3,226.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#D6F098").s().p("EgWgAhdQlqgCkNhgIg0gUQlaiMihkGIgGgIQijkSAimaQAZlACWk/QA2hyBIh2QBiieCBihQC6jtEmkcIBWhTQBPhNBrhiQCoiaB9hwQEEjqErirQBXgyBYgsQDYhsDghJQFAhrFDggIA8gFQEtgaESAsQCoAZCYAyQCLAuB6BBQDHBrCRCdIADAAQA0A0AwA2QDHDlB1EEQCGEnAYFBIABAGQAvInjFHHQgXA0gZAyQjXGombEjIgxAhQmVEUoiB7QicAjilAWQlJAtl5A/Ih9AUQhvAPhyAUQiaAPi5AmQkqAtjeAJQhDAEg9AAIgPAAg");
	this.shape_43.setTransform(271.2,226.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#D5F09A").s().p("EgWhAhfQloAAkPhgIg0gUQlaiLihkHIgFgIQikkSAhmZQAalACWk/QA2hzBIh2QBiieCAihQC7juElkcIBVhTQBQhOBrhhQCniaB+hxQEDjqErirQBXgyBZgtQDXhsDfhKQFBhsFCggIA9gGQEtgbESArQCoAZCYAyQCLAtB6BCQDIBqCRCeIADgBQA0A0AvA2QDIDmB1EEQCHEnAZFAIABAGQAxIojFHHQgXAzgZAyQjXGomdEiQgXASgZAQQmVETokB6QibAkilAWQlJAsl6BBIh9AUQhuAQhyAUQiaAQi6AoQkpAujeALQhEAEg+AAIgOAAg");
	this.shape_44.setTransform(271.2,226.8);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#D4F09B").s().p("EggYAgDIg0gUQlbiKihkHIgFgIQikkSAimZQAZlACWlAQA2hzBIh2QBiieCAiiQC7juEkkcQAjgjAygwQBRhOBqhiQCniZB+hyQEDjpErisQBXgzBZgtQDWhsDghKQFAhtFCgiIA9gFQEtgcETAqQCnAZCZAxQCLAtB6BBQDIBrCQCdIADAAQA0A0AwA2QDIDmB1EDQCJEnAaFAIABAGQAzIojGHHQgXA0gZAyQjXGnmeEiIgwAiQmWESokB6QibAjimAWQlIAsl6BDIh9AUQhuARhyAVQiZARi6AoQkqAxjeALQhLAFhEAAIgLAAQlhAAkMheg");
	this.shape_45.setTransform(271.2,227);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#D3F09D").s().p("EggYAgIIg0gUQlbiKiikHIgFgIQikkSAimZQAalACWlAQA1hzBIh2QBiifCAihQC7jvEjkdIBWhTQBQhOBqhiQCniZB9hyQEEjqEqisQBXgzBZgtQDXhtDfhKQFAhuFCgjIA9gGQEtgcETApQCoAYCYAyQCMAsB6BCQDIBqCQCeIADgBQA0A0AvA2QDJDmB2EDQCJEnAbE/IABAHQA1InjGHIQgXA0gZAyQjXGnmfEhIgwAiQmWERolB6QicAjilAWQlJAsl5BEIh9AVQhuARhyAWQiZARi6AqQkqAyjeANQhLAFhEABIgWAAQlaAAkIhcg");
	this.shape_46.setTransform(271.1,227.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#D3F09E").s().p("EggYAgMIg0gUQlciJiikHIgFgIQilkSAimaQAak/CWlBQA2hzBIh2QBhifCAihQC7jwEjkdIBVhTQBRhPBphhQCniaB+hyQEEjqEqitQBWgyBZgtQDXhuDfhLQFAhvFCgjIA8gGQEugeESApQCoAYCZAxQCMAsB6BBQDIBqCQCeIADAAQA0A0AwA2QDJDmB2ECQCKEnAcE/IABAHQA3InjGHIQgXA0gZAyQjXGnmhEhIgwAhQmWERolB5QicAjimAWQlIAsl6BGIh9AWQhuARhyAXQiXASi8ArQkpA0jeANQhLAGhEABIgjAAQlSAAkDhag");
	this.shape_47.setTransform(271.1,227.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#D2F0A0").s().p("EggYAgQIg0gUQldiIiikHIgFgIQilkSAimaQAbk/CWlBQA2hzBHh3QBiifB/iiQC7jwEikdQAjgjAygwQBRhPBphhQCmiaB/hyQEEjrEpitQBXgzBZgtQDXhuDehMQFAhvFCglIA8gGQEugeETAoQCoAXCZAxQCLAsB6BBQDJBqCQCeIADgBQA0A1AvA1QDKDmB2EDQCMEnAdE+IABAHQA5InjHHJQgXA0gZAxQjXGnmiEhIgwAhQmXEQomB5QibAiimAWQlIAsl6BIIh9AWQhuAShyAXQiXATi7AsQkqA2jdAPQhLAGhEABIguAAQlMAAj/hYg");
	this.shape_48.setTransform(271.1,227.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#D1F0A2").s().p("EggYAgUIg0gTQldiJiikGIgFgIQimkTAjmZQAak/CWlCQA2hzBIh2QBhigB/iiQC7jxEhkdIBWhTQBQhPBphiQCmiZB/hzQEEjrEpitQBXgzBZguQDWhuDehNQFBhwFBglIA8gHQEvgfESAnQCoAXCZAxQCMAsB6BBQDJBpCQCfIADgBQA0A0AvA2QDKDmB3ECQCMEnAeE+IABAHQA7InjHHJQgWA0gaAyQjXGmmjEhIgwAhQmXEPonB4QicAjilAVQlIAsl6BKIh9AXQhuAShyAYQiWATi8AuQkpA3jeAQQhLAHhEABIg7AAQlEAAj6hWg");
	this.shape_49.setTransform(271,227.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#D0F0A3").s().p("EggZAgYIg0gTQldiIijkGIgFgIQimkTAjmaQAbk+CWlDQA2hzBHh2QBhigCAiiQC6jyEhkdQAjgkAygvQBRhQBphhQCliZB/h0QEFjqEoivQBXgzBZgtQDWhvDehNQFAhyFCgmIA8gGQEuggETAmQCoAXCZAwQCMAsB6BAQDJBqCQCfIADgBQA0A0AvA2QDKDmB4EBQCNEnAfE+IABAHQA9InjHHJQgXA0gZAyQjYGmmjEgIgxAhQmYEPomB4QicAiimAWQlIArl6BLIh9AYQhtAThyAYQiWAUi8AvQkqA5jdARQhLAHhEACIhEABQk+AAj4hVg");
	this.shape_50.setTransform(271,227.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#CFF0A5").s().p("EggZAgcIg0gTQldiHijkHIgFgIQinkSAjmaQAbk/CWlCQA2hzBHh3QBhigB/iiQC7jzEgkdQAkgkAxgvQBRhQBphhQCliaB/hzQEFjrEoivQBXgzBYguQDXhwDehNQFAhyFBgnIA8gHQEughETAmQCoAWCaAwQCMArB6BBQDJBpCQCfIADgBQA0A1AvA1QDKDnB5EBQCNEnAhE9IABAHQA+IojHHJQgXA0gZAyQjXGlmlEgIgxAhQmYEOonB3QicAiimAWQlIArl6BNIh9AYQhtAThyAaQiVAVi9AwQkpA7jdASQhMAHhDACIhOACQk4AAj1hUg");
	this.shape_51.setTransform(271,228.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#CEF0A6").s().p("EggZAggIg0gTQleiGikkHIgFgIQimkSAjmaQAbk/CWlDQA2hzBHh3QBhigB/iiQC7j0EfkdIBVhUQBRhQBohhQCliZCAh0QEEjrEoivQBXg0BYguQDXhwDdhOQFAhzFBgoIA8gHQEvgiESAmQCpAVCaAwQCMArB6BBQDJBpCQCfIADgBQA0A0AvA2QDLDmB5EBQCOEnAiE9IABAHQBAIojHHJQgXA0gaAyQjXGlmmEgIgxAhQmYEMooB4QicAiimAVQlIArl6BPQg8ALhBAOQhsAThzAaQiUAWi+AxQkoA9jdATQhMAIhDACQgsACgrAAQkzAAjxhSg");
	this.shape_52.setTransform(271,228.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#CDF0A8").s().p("EggZAgkIg0gTQlfiGijkGIgFgIQinkTAjmaQAbk+CWlDQA2h0BHh3QBhigB/ijQC7j0EekdQAkgkAxgwQBRhQBohhQCkiZCBh1QEEjrEoiwQBWgzBZguQDWhxDehOQFAh0FAgpIA8gHQEvgjETAkQCoAWCaAvQCNArB6BAQDJBpCQCgIADgBQA0A0AvA2QDLDmB5EAQCQEoAiE8IABAHQBDIojIHKQgXA0gZAyQjYGkmnEfIgxAhQmZEMooB3QicAiimAVQlIArl6BRQg8ALhBAOQhsAUhzAbQiTAWi+AzQkpA+jdAVQhLAIhEACQgyACgwAAQksAAjthQg");
	this.shape_53.setTransform(270.9,228.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#CDEFA9").s().p("EggZAgpIg1gTQleiGikkGIgFgIQinkTAjmaQAbk+CXlEQA1h0BIh2QBgihB/ijQC7j1EekdIBUhUQBRhRBohgQCkiaCAh0QEFjsEoiwQBWg0BZguQDWhxDdhPQFAh1FAgqIA9gHQEvgkESAkQCpAVCZAvQCNArB7BAQDJBpCQCgIACgCQA0A1AwA1QDLDnB6EAQCQEnAkE8IABAGQBEIpjIHKQgWA0gaAyQjYGkmoEfIgxAhQmZELopB2QicAiimAWQlIAql6BTIh9AZQhsAVhyAcQiTAWi/A0QkpBAjdAWQhLAIhEADQg2ADg1AAQkmAAjqhOg");
	this.shape_54.setTransform(270.9,228.7);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#CCEFAB").s().p("EggZAgtIg1gTQlfiFikkHIgFgIQiokSAkmbQAbk9CWlFQA2hzBHh3QBhihB+ijQC7j2EdkdQAkglAxgvQBRhRBnhhQCkiZCBh1QEFjsEniwQBWg0BZgvQDWhxDdhQQFAh2FAgqIA8gIQEvgkETAjQCoAUCaAvQCNArB7BAQDJBpCQCfIADgBQA0A0AvA2QDLDnB7D/QCREnAlE8IABAGQBGIpjIHKQgXA0gZAyQjYGkmqEfQgYARgYAPQmaELoqB2QicAiimAVQlHAql7BUIh8AbQhtAVhyAcQiSAYi/A1QkpBCjdAWQhLAJhEADQg8ADg5AAQkgAAjmhMg");
	this.shape_55.setTransform(270.9,228.9);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#CBEFAC").s().p("EggZAgxIg1gTQlgiEikkHIgFgIQiokSAkmbQAbk9CXlFQA2h0BHh3QBgihB+ijQC7j3EdkdQAjglAxgvQBRhSBnhgQCjiZCCh2QEFjsEnixQBWg0BYguQDWhyDdhRQFAh2FAgsIA8gHQEwgmESAjQCpAUCaAuQCNArB6A/QDKBpCQCgIACgBQA0A0AwA2QDLDmB7D/QCTEoAlE7IABAGQBJIpjJHLQgWA0gaAyQjYGjmrEfIgxAgQmaEKoqB1QicAiimAVQlHAql7BWIh9AbQhsAWhyAdQiRAYjAA2QkpBEjcAYQhLAJhEADQhBAEg+AAQkaAAjjhLg");
	this.shape_56.setTransform(270.8,229.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#CAEFAE").s().p("EggaAg1Ig1gTQlgiEikkGIgFgIQiokTAkmaQAbk+CXlFQA1h0BHh3QBhihB9ijQC8j4EbkdIBVhUQBRhSBnhhQCjiZCBh1QEFjtEnixQBWg0BYgvQDWhzDdhQQFAh4E/gsIA9gIQEvgnESAiQCqAUCaAuQCNAqB7BAQDKBpCPCgIADgCQA0A1AvA1QDMDnB7D/QCUEnAmE7IABAGQBKIpjIHLQgXA0gaAyQjXGjmsEeIgxAhQmbEJoqB1QidAhimAVQlHAql7BYIh8AcQhsAWhyAdQiRAZjBA4QkoBFjcAZQhMAKhDAEQhEAEhCAAQkWAAjhhKg");
	this.shape_57.setTransform(270.8,229.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#C9EFAF").s().p("EggaAg5Ig1gTQlgiDilkGIgFgIQiokTAkmbQAbk9CXlGQA2hzBGh4QBhihB9ikQC7j4EckdQAjglAxgvQBRhTBnhgQCiiZCCh2QEGjsEmiyQBWg1BYgvQDWhzDchRQFAh4FAguIA8gIQEvgnETAhQCpATCaAuQCOAqB6BAQDKBoCQChIACgCQA0A0AwA2QDMDnB8D+QCUEnAoE7IABAGQBMIpjJHLQgXA1gZAyQjYGimtEeQgYARgZAPQmcEJoqB0QidAiimAVQlHApl7BaIh8AcQhsAXhyAeQiRAZjAA5QkpBHjcAaQhLAKhEAFQhJAEhFAAQkRAAjehIg");
	this.shape_58.setTransform(270.8,229.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#C8EFB1").s().p("EggaAg9Ig1gSQlhiDilkHIgFgIQipkSAlmbQAbk9CXlGQA1h0BHh3QBgiiB+ikQC7j5EakdIBVhVQBRhSBmhgQCiiZCDh3QEFjsEmizQBWg0BYgvQDWh0DchSQFAh5E/guIA8gJQEwgoESAhQCqASCaAuQCOAqB7BAQDKBoCPCgIACgBQA1A0AvA2QDMDnB9D9QCVEoApE6IABAGQBOIpjJHMQgXA0gaAyQjYGimuEeIgxAgQmcEHorB1QidAhimAVQlHApl7BcIh8AcQhrAYhzAeQiPAbjCA6QkoBJjcAbQhLAKhEAFQhNAFhKAAQkMAAjahHg");
	this.shape_59.setTransform(270.8,229.7);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#C7EFB3").s().p("EggaAhBIg1gSQlhiCimkHIgFgIQipkTAlmaQAbk9CXlHQA2h0BGh3QBhiiB9ikQC7j6EakdQAkgmAwgvQBRhSBmhhQCiiYCDh3QEFjtElizQBXg1BYgvQDVh0DchSQFAh7E/gvIA8gIQEwgpETAfQCpATCbAtQCOAqB6A/QDLBoCPChIACgCQA0A1AwA1QDMDnB+D+QCVEnAqE6IABAGQBQIpjJHMQgXA0gaAyQjYGimvEdIgxAhQmcEGosB0QidAhimAVQlHApl7BdIh8AeQhrAYhzAfQiPAbjBA7QkpBLjbAcQhMALhDAFQhSAGhOAAQkHAAjXhGg");
	this.shape_60.setTransform(270.7,229.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#C7EFB4").s().p("EggbAhFIg1gSQlhiCimkGIgFgIQiqkTAlmbQAck9CXlHQA2h0BGh4QBgihB9ilQC7j6EZkeQAkglAwgvQBShTBmhgQChiZCDh4QEGjtElizQBWg1BYgvQDWh1DbhTQFAh7E/gwIA8gIQEwgqESAfQCqASCbAtQCOApB6A/QDLBoCPChIACgCQA1A1AvA1QDNDoB+D9QCWEnArE5IABAHQBSIpjJHMQgXA0gaAyQjYGimxEdIgxAgQmcEGotBzQicAhinAVQlGApl8BfQg7ANhBARQhrAYhyAgQiOAcjDA8QkoBNjbAdQhMALhDAFQhWAHhSAAQkCAAjVhEg");
	this.shape_61.setTransform(270.7,230.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#C6EFB6").s().p("EggbAhJIg1gSQliiBimkHIgFgIQiqkTAlmbQAck8CXlIQA2h0BGh3QBgiiB9ilQC7j7EZkeQAkglAwgwQBRhTBmhgQChiZCDh3QEGjuEkizQBWg1BYgwQDWh1DbhTQFAh8E/gxIA8gJQEwgrESAeQCqASCbAtQCOApB7A/QDLBoCPChIACgCQA0A0AwA2QDNDnB+D9QCYEnAsE5IABAHQBUIpjKHNQgXA0gaAyQjYGhmyEcIgxAgQmdEGotBzQidAhimAUQlHApl7BhQg8ANhAARQhrAZhyAhQiOAcjDA+QknBOjcAfQhLALhEAFQhaAIhWAAQj9AAjShDg");
	this.shape_62.setTransform(270.7,230.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#C5EFB7").s().p("EggbAhNIg1gSQljiAimkHIgFgIQiqkTAlmbQAck8CXlIQA2h0BGh4QBgiiB8ilQC8j8EXkeQAkgmAwgvQBShTBlhgQChiZCDh4QEGjtEli0QBWg2BXgwQDWh1DbhUQE/h9E/gyIA8gJQExgrESAdQCqARCbAtQCPApB6A/QDLBnCPCiIACgCQA0A0AwA2QDNDnB/D8QCZEoAtE4IABAHQBWIpjKHNQgXA0gaAyQjYGhmzEcIgyAgQmdEEotBzQidAhinAUQlGApl8BiQg7AOhBARQhqAahzAhQiNAdjDA/QkoBQjbAgQhMAMhDAGQheAIhYAAQj6AAjPhCg");
	this.shape_63.setTransform(270.7,230.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#C4EFB9").s().p("EggbAhRIg2gSQliiAinkGIgFgIQiqkTAlmbQAck8CXlJQA2h0BGh4QBgiiB8ilQC8j9EXkeQAkgmAvgvQBShUBlhgQCgiYCEh5QEGjtEki1QBWg1BYgwQDWh2DahVQFAh+E+gyIA8gJQExgtESAdQCqARCcAsQCOAoB7A/QDLBoCPCiIACgDQA0A1AwA1QDNDoCAD8QCZEnAuE4IABAHQBYIpjKHNQgXA0gaAzQjYGgm0EcIgyAgQmdEDouBzQidAginAVQlGAol8BkIh8AgQhqAahzAiQiMAdjEBBQknBRjcAhQhLANhEAGQhhAJhcAAQj1AAjNhBg");
	this.shape_64.setTransform(270.6,230.8);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#C3EFBA").s().p("EggcAhVIg1gSQljh/inkGIgFgIQirkTAmmcQAck7CXlKQA2h0BGh4QBgiiB8imQC7j9EWkeQAlgmAvgvQBShUBlhgQCfiYCFh5QEGjuEki1QBVg2BYgwQDWh2DahVQE/h/E/g0IA8gJQExguESAdQCqAQCcAsQCOAoB7A/QDLBnCPCiIACgCQA0A0AwA2QDODoCAD7QCaEnAvE4IABAHQBaIqjKHNQgXA0gaAyQjZGgm1EcIgxAfQmeEDovByQidAhinAUQlGAol8BmIh7AgQhrAbhyAiQiMAfjEBBQkoBUjbAiQhLAMhEAHQhlAJhfAAQjyAAjKg/g");
	this.shape_65.setTransform(270.6,231);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#C2EEBC").s().p("EggcAhZIg2gSQljh/inkGIgFgIQirkTAmmcQAck7CXlKQA2h0BGh4QBfijB8ilQC8j+EVkeQAkgnAwgvQBShUBkhgQCfiYCFh5QEHjvEji1QBWg2BXgwQDWh3DahWQE/h/E+g1IA8gJQEygvESAcQCqAQCbAsQCQAoB6A+QDMBnCPCjIACgDQA0A1AwA1QDNDoCBD7QCbEnAwE4IABAGQBcIrjLHNQgWA0gbAyQjYGgm2EbIgyAgQmeEBovByQieAginAVQlFAol9BnIh7AhQhqAbhzAjQiKAfjFBDQkoBVjbAkQhLANhEAGQhpALhjAAQjtAAjHg+g");
	this.shape_66.setTransform(270.6,231.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#C1EEBD").s().p("EggcAhdIg2gSQljh+iokGIgFgIQirkTAmmcQAck7CXlKQA2h1BGh4QBgijB7ilQC7j/EVkeQAlgnAvgvQBShVBkhfQCfiZCFh5QEHjuEji2QBVg2BYgxQDVh3DahWQE/iBE/g1IA7gKQEygvESAbQCqAPCcAsQCPAnB7A/QDMBnCOCiIACgCQA0A0AwA2QDODoCBD6QCcEoAxE3IACAGQBdIrjKHNQgXA0gaAyQjZGgm3EaIgyAgQmfEBowBxQidAhinAUQlGAol8BpIh7AhQhqAchzAkQiKAgjFBEQkoBXjaAkQhMANhDAHQhuAMhmAAQjpAAjEg9g");
	this.shape_67.setTransform(270.6,231.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#C1EEBF").s().p("EggdAhhIg1gRQlkh+iokHIgFgIQiskTAmmbQAdk7CXlLQA2h1BGh4QBfijB7imQC8j/EUkeQAlgnAugvQBThVBkhgQCeiYCGh6QEGjuEji2QBWg2BXgxQDVh4DahXQE/iBE+g3IA8gKQExgwETAaQCqAPCcAsQCPAnB7A/QDMBmCPCjIACgDQA0A1AwA2QDNDnCCD6QCdEoAyE3IACAGQBfIrjLHNQgXA1gaAyQjYGfm5EaIgyAgQmfEAowBxQidAgioAUQlFAol9BrIh7AiQhpAchzAlQiKAgjFBFQkoBZjaAlQhMAOhDAHQhxANhpAAQjlAAjDg8g");
	this.shape_68.setTransform(270.6,231.6);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#C0EEC0").s().p("EggdAhlIg1gSQllh9iokGIgFgIQiskTAmmcQAdk7CYlLQA1h1BGh4QBfikB7ilQC8kBETkeQAlgnAvgvQBShVBjhfQCfiZCGh6QEGjvEji2QBVg2BYgyQDVh4DZhXQE/iDE+g3IA8gKQEygxESAaQCrAOCbArQCQAoB7A+QDMBmCOCjIACgDQA0A1AwA2QDODoCDD5QCeEoAzE2IABAGQBiIrjLHOQgXA0gbAzQjYGem6EaIgyAgQmgEAowBwQieAginAUQlFAnl9BtQg7AQhAATQhpAchzAmQiJAhjGBGQknBbjbAmQhMAOhDAIQhzAOhsAAQjjAAjAg7g");
	this.shape_69.setTransform(270.5,231.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#BFEEC2").s().p("EggdAhpIg2gSQllh8iokHIgFgIQitkTAnmcQAdk6CXlMQA2h0BGh5QBfikB7ilQC7kCETkeIBThWQBThVBjhgQCeiYCGh7QEHjvEii3QBVg2BYgxQDVh5DZhYQE/iDE+g4IA8gLQExgxETAYQCqAOCcArQCQAnB7A/QDMBmCPCjIABgDQA1A1AwA1QDODoCDD6QCfEnA0E2IABAGQBkIrjMHPQgXA0gaAyQjZGem7EaIgyAgQmgD+oxBwQidAgioAUQlFAnl8BvQg7AQhBATQhpAdhzAmQiIAijHBIQknBcjaAoQhMAOhDAIQh3APhvAAQjfAAi9g6g");
	this.shape_70.setTransform(270.5,232.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#BEEEC3").s().p("EggdAhtIg2gRQllh8ipkHIgFgIQitkTAnmcQAdk6CYlMQA1h1BGh5QBfikB7imQC7kCESkeQAlgnAugvQBThWBjhfQCdiYCHh7QEHjvEii4QBVg2BXgyQDVh5DZhZQE/iEE+g5IA8gKQEygzESAYQCrAOCcAqQCQAnB7A+QDMBmCOCkIACgDQA0A0AwA2QDPDoCED5QCfEoA1E1IACAGQBlIsjLHOQgXA0gbAyQjZGem8EaIgyAfQmgD+oyBwQidAfioAUQlFAnl9BxQg6AQhBATQhpAehzAnQiHAijHBJQknBejbApQhLAPhDAIQh7AQhzAAQjaAAi7g5g");
	this.shape_71.setTransform(270.5,232.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#BDEEC5").s().p("EggeAhxIg1gRQlmh8ipkGIgFgIQitkTAnmdQAdk5CYlNQA1h1BGh5QBfikB6imQC8kDERkeQAlgnAugvQBThWBihfQCdiZCHh7QEHjvEii4QBVg3BXgyQDVh6DZhYQE/iFE9g6IA8gLQEyg0ETAYQCrANCcAqQCQAnB7A+QDMBmCPCkIABgEQA1A1AwA2QDODoCFD4QCgEoA2E1IACAGQBnIsjMHOQgXA1gaAyQjZGdm9EaIgyAfQmhD9oyBvQieAgioAUQlEAml9ByQg7ARhAAUQhpAehzAnQiHAjjIBLQknBfjaAqQhLAQhDAIQh+ARh1AAQjYAAi5g4g");
	this.shape_72.setTransform(270.5,232.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#BCEEC7").s().p("EggeAh1Ig2gRQlmh7ipkGIgFgIQiukUAnmcQAek6CXlNQA2h1BFh4QBfilB6imQC8kEERkeQAlgoAuguQBThXBihfQCdiYCHh8QEHjvEhi5QBVg2BXgyQDVh7DZhZQE/iGE9g7IA8gLQEyg0ESAWQCrANCdAqQCQAnB7A+QDNBlCOClIACgEQA0A1AwA1QDPDoCFD5QChEnA3E1IACAGQBpIsjMHPQgXA0gaAyQjZGdm/EZIgyAfQmhD9ozBvQieAfinAUQlFAml9B0Ih7AlQhpAfhzAoQiGAjjIBMQknBijaArQhLAQhEAIQiBASh4AAQjTAAi3g3g");
	this.shape_73.setTransform(270.5,232.7);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#BBEEC8").s().p("EggeAh5Ig2gRQlnh7ipkGIgFgIQiukTAomdQAdk5CYlOQA1h1BGh5QBeilB6imQC8kEEQkfQAlgnAugvQBThXBihfQCciYCIh8QEHjwEhi4QBVg3BXgyQDVh7DYhaQE/iHE9g8IA8gLQEyg1ESAWQCsAMCcAqQCRAmB7A+QDNBlCOClIABgEQA1A1AwA2QDPDoCFD3QCiEoA5E1IABAGQBrIrjMHQQgXA0gaAyQjZGdnAEZIgyAfQmiD7ozBvQieAfioAUQlEAml9B2Qg7ARhAAUQhpAfhzApQiFAkjJBNQkmBjjaAtQhMAQhDAJQiFASh7AAQjQABi0g2g");
	this.shape_74.setTransform(270.4,232.9);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#BBEECA").s().p("EggfAh9Ig2gRQlnh6ipkGIgFgIQiukUAnmcQAek5CYlOQA1h2BFh5QBfilB6imQC8kFEPkfIBShWQBUhXBhhfQCciYCIh8QEIjwEgi6QBVg3BXgyQDVh8DYhaQE/iIE8g8IA8gLQEzg3ESAVQCsANCcApQCRAmB7A9QDNBmCOClIACgEQA0A1AwA1QDPDoCGD4QCjEoA6EzIABAHQBtIrjMHQQgXA0gbAzQjZGcnBEYIgyAfQmiD7o0BuQidAfioAUQlFAml9B3Ih7AmQhoAghzAqQiFAkjJBPQknBljZAtQhMARhDAJQiHAUh+AAQjNAAizg1g");
	this.shape_75.setTransform(270.4,233.1);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#BAEECB").s().p("EggfAiBIg2gRQlnh5irkHIgFgIQiukTAomdQAdk4CYlPQA2h1BFh5QBfimB5imQC8kGEPkfQAlgoAtguQBUhYBhheQCbiYCJh9QEHjwEgi6QBVg3BXgzQDVh8DYhbQE/iIE8g+IA8gLQEzg3ESAUQCrAMCdApQCRAmB7A9QDNBlCOClIACgEQA0A1AwA2QDQDoCGD3QCkEoA7EzIABAHQBvIrjMHQQgXA1gbAyQjZGcnCEYIgyAfQmjD6o0BuQieAfioATQlEAml+B5Qg6AShAAVQhoAgh0AqQiDAmjKBPQknBnjZAuQhMARhDAKQiKAViAAAQjLAAiwg0g");
	this.shape_76.setTransform(270.4,233.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#B9EECD").s().p("EggfAiFIg2gRQloh5iqkGIgFgIQivkUAomcQAek5CYlPQA1h1BFh6QBfilB5inQC8kHEOkeQAlgoAtgvQBUhYBhheQCbiYCJh9QEHjxEgi6QBVg3BXgzQDVh8DXhcQE/iJE8g/IA8gLQEzg5ESAUQCsAMCdAoQCRAmB7A9QDNBlCOCmIACgEQA0A0AwA2QDQDoCHD3QClEoA7EzIACAGQBwIsjMHQQgXA1gbAyQjZGbnDEYIgzAfQmjD5o0BuQieAeioAUQlEAml+B6Ih7AoQhnAhh0AqQiDAmjKBRQknBpjZAvQhMAShDAKQiNAWiDAAQjHAAiugzg");
	this.shape_77.setTransform(270.4,233.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#B8EDCE").s().p("EgggAiJIg2gRQloh4irkGIgFgIQiukUAomdQAek4CYlQQA1h1BFh6QBeilB5inQC8kHEOkfQAlgpAtguQBUhYBghfQCbiXCJh+QEIjxEfi6QBVg4BXgzQDVh9DXhbQE+iLE9g/IA7gMQEzg5ETATQCsALCcApQCSAlB7A9QDOBlCNClIACgEQA0A1AwA2QDQDoCID2QCmEoA8EzIACAGQByIsjMHRQgYA0gaAyQjZGcnFEXIgyAfQmkD4o1BtQieAfioATQlEAml+B8Qg6AShAAWQhoAhhzAsQiDAnjKBSQknBqjZAxQhMARhDALQiQAXiGAAQjEAAisgyg");
	this.shape_78.setTransform(270.4,233.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#B7EDD0").s().p("EgggAiNIg2gRQlph3irkHIgFgIQivkTAomdQAek4CYlQQA2h2BFh5QBeimB5inQC8kIEMkfQAlgpAuguQBThZBhheQCaiYCJh+QEIjxEfi7QBVg3BXgzQDVh+DXhcQE+iME8hAIA8gMQEzg6ESATQCsAKCdApQCSAlB7A9QDOBkCOCmIABgEQA0A1AwA1QDRDpCID2QCnEoA9EyIACAGQB0IsjNHRQgXA0gaAzQjaGbnFEXIgzAeQmkD4o2BsQieAfioATQlEAml9B+Qg7AShAAXQhnAhh0AsQiBAojMBTQkmBsjZAyQhMAShDALQiTAYiIAAQjBAAiqgxg");
	this.shape_79.setTransform(270.4,234);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#B6EDD1").s().p("EgggAiRIg2gRQlph3iskGIgFgIQivkUAomdQAfk4CYlRQA1h1BFh6QBeimB5inQC8kJEMkfQAlgoAtgvQBUhZBgheQCaiYCJh+QEIjxEfi7QBVg4BXgzQDUh+DXhdQE+iNE8hBIA8gMQEzg7ETASQCsAKCdAoQCRAlB8A9QDOBkCNCmIACgEQA0A1AwA1QDRDpCID2QCoEnA/EyIABAHQB3IsjOHRQgXA0gaAzQjaGanGEXIgzAeQmkD4o3BrQieAfioATQlEAll+CAQg6AThAAWQhnAjh0AsQiBApjMBUQkmBujZAzQhLAShDALQiXAaiKAAQi/AAingwg");
	this.shape_80.setTransform(270.3,234.2);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#B5EDD3").s().p("EgghAiVIg2gRQlph2iskHIgFgIQiwkTApmdQAek4CZlRQA1h2BFh5QBeinB4inQC8kKELkfQAmgpAsguQBUhZBgheQCaiYCKh+QEIjyEei8QBVg4BXgzQDUh+DXheQE+iNE8hDIA7gMQE0g7ESARQCtAJCdAoQCSAlB7A9QDOBkCOCmIABgEQA0A0AwA2QDRDpCKD1QCoEoBAExIABAHQB5IsjOHRQgXA1gbAyQjZGanIEXIgzAeQmkD2o3BsQieAeipATQlDAll+CCQg6AThBAXQhnAjhzAtQiAApjNBWQkmBvjZA0QhMAThCAMQiZAaiMAAQi8AAingvg");
	this.shape_81.setTransform(270.3,234.4);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#B4EDD4").s().p("EgghAiZIg2gRQlqh1iskHIgFgIQiwkTApmeQAek3CYlSQA2h1BEh6QBeinB5inQC8kLEKkfQAlgpAtguQBUhZBghfQCZiXCKh/QEJjyEei8QBUg4BXg0QDUh/DXheQE+iOE7hDIA8gMQE0g9ESARQCsAJCeAnQCSAlB7A8QDPBkCNCnIABgFQA0A1AxA2QDRDpCKD0QCpEoBBExIABAHQB7IsjOHSQgXA0gbAyQjaGanIEWIgzAfQmlD1o4BrQieAfipATQlDAkl+CEQg6AThAAXQhnAkh0AtQh/AqjNBYQkmBwjZA2QhMAThCAMQicAbiPAAQi5AAikgug");
	this.shape_82.setTransform(270.3,234.6);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#B4EDD6").s().p("EggiAidIg2gRQlqh1iskHIgFgIQixkTApmeQAfk3CYlSQA1h2BFh6QBeinB4inQC8kLEKkfQAlgqAtguQBUhZBfhfQCZiXCLh/QEIjyEei9QBVg4BWg0QDUh/DXhfQE+iPE7hEIA7gMQE0g+ETAQQCsAJCeAnQCSAkB8A8QDOBkCNCnIABgFQA1A1AwA2QDRDpCLD0QCqEoBCExIABAGQB9IsjOHTQgYA0gaAyQjaGanKEVIgzAfQmlD1o4BqQifAeioATQlEAll+CFQg6AUhAAXQhnAkhzAvQh/AqjNBZQkmByjZA3QhMAThDAMQieAdiRAAQi2AAijgtg");
	this.shape_83.setTransform(270.3,234.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#B3EDD8").s().p("EggiAihIg2gRQlrh0iskHIgFgIQixkUAqmdQAek3CZlTQA1h1BEh6QBeioB4inQC8kMEJkfQAmgqAsguQBUhaBfheQCZiXCLiAQEIjyEdi9QBVg5BWgzQDViADWhgQE+iPE7hGIA7gMQE1g/ESAPQCtAJCdAnQCTAkB7A8QDPBkCNCnIABgFQA0A1AxA2QDRDpCLDzQCrEoBDExIACAGQB+ItjOHSQgXA1gbAyQjaGZnLEVIgzAfQmmDzo4BrQifAeipATQlDAkl+CHIh6ArQhnAlhzAvQh+ArjOBaQkmB0jYA4QhMAUhDAMQihAeiUAAQizAAihgsg");
	this.shape_84.setTransform(270.3,235.1);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#B2EDD9").s().p("EggiAilIg3gQQlqh1itkGIgFgIQixkUApmdQAfk3CYlTQA1h2BFh6QBeioB3inQC8kNEJkgIBRhXQBVhaBeheQCZiYCLiAQEJjyEdi+QBUg4BXg0QDUiBDWhfQE+iRE7hGIA7gNQE0g/ETAOQCsAICeAnQCTAjB8A9QDOBjCNCoIABgFQA1A1AwA1QDSDpCLD0QCsEoBEEwIACAGQCAItjOHSQgYA1gaAyQjaGZnNEVIgzAeQmmDzo5BqQieAeipATQlDAkl/CJIh6AsQhmAlh0AwQh9ArjPBcQklB2jYA4QhMAVhDAMQijAgiWAAQiyAAiegsg");
	this.shape_85.setTransform(270.3,235.3);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#B1EDDB").s().p("EggjAipIg2gQQlrh0itkGIgFgIQiykUAqmeQAfk3CYlTQA1h2BFh6QBeioB3ioQC8kNEIkgQAlgpAsguQBVhbBeheQCYiXCMiAQEIjzEdi+QBVg5BWg0QDUiBDVhgQE+iSE7hHIA8gMQE0hBESAOQCtAICeAmQCTAjB8A8QDPBkCNCnIABgFQA0A1AwA2QDSDpCMDzQCtEoBFEwIACAGQCCItjPHTQgXA0gbAzQjaGYnNEVIgzAeQmnDyo6BqQieAdipATQlDAkl/CLQg5AUhAAYQhmAmh0AwQh9AtjPBcQklB4jYA6QhMAVhDAMQimAhiZAAQiuAAidgrg");
	this.shape_86.setTransform(270.3,235.5);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#B0EDDC").s().p("EggjAitIg3gQQlrh0iukGIgFgIQixkUApmeQAfk2CZlUQA1h2BEh6QBeioB3ioQC8kPEHkfQAmgqAsguQBVhbBdhdQCYiYCMiAQEJjzEci/QBVg5BWg0QDUiBDVhhQE+iTE7hIIA7gNQE1hBESANQCtAHCeAmQCTAkB8A8QDPBjCNCoIABgGQA0A1AxA2QDSDpCMDzQCuEoBGEvIACAGQCEItjPHUQgXA0gbAzQjaGXnPEVIgzAeQmnDyo6BpQifAdipATQlCAkl/CMQg6AUhAAZQhmAmh0AxQh8AtjPBeQkmB6jYA7QhMAVhCANQioAiiaAAQitAAibgqg");
	this.shape_87.setTransform(270.3,235.7);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#AFEDDE").s().p("EggkAixIg2gQQlshziukGIgFgIQiykUAqmeQAfk2CZlVQA1h2BEh6QBeioB3ipQC8kPEGkfQAmgqArguQBVhbBeheQCXiXCMiBQEKjzEbi/QBVg5BWg1QDUiCDVhhQE+iTE6hJIA8gNQE0hCETAMQCtAHCeAlQCTAjB8A8QDPBjCNCoIABgFQA0A1AxA2QDSDpCNDyQCvEoBHEvIACAGQCGItjPHUQgYA1gaAyQjbGXnPEVIg0AeQmnDwo7BpQieAeiqASQlCAkl/COQg5AUhBAZQhlAnh0AyQh8AujPBfQkmB7jYA8QhMAWhCANQiqAjidAAQiqAAiagpg");
	this.shape_88.setTransform(270.3,235.9);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#AEEDDF").s().p("EggkAi0Ig2gQQlthyiukGIgFgIQiykUAqmeQAfk2CZlVQA1h2BEh7QBeioB2ioQC9kQEFkgIBShYQBVhbBdheQCXiXCMiBQEKjzEbjAQBVg5BVg1QDViCDUhiQE+iUE6hKIA8gNQE1hDESALQCtAHCfAlQCTAjB8A7QDPBjCNCpIABgGQA0A1AxA2QDSDpCODyQCvEoBJEvIABAGQCIItjPHUQgXA1gbAyQjaGXnREUIg0AeQmoDwo7BoQifAdipATQlCAjl/CQQg6AVhAAZQhlAnh0AzQh7AujQBhQkmB9jXA9QhMAWhDAOQitAkieAAQioAAiYgpg");
	this.shape_89.setTransform(270.2,236.2);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#AEECE1").s().p("EggkAi5Ig3gQQlthyiukGIgFgIQiykUAqmeQAfk2CZlVQA1h3BEh6QBeipB2ioQC8kREFkgQAmgqArguQBVhcBdhdQCXiXCNiCQEJjzEbjAQBVg6BWg0QDUiDDUhjQE+iVE6hLIA7gNQE1hEETALQCtAGCeAlQCUAjB8A7QDQBjCMCoIABgFQA0A1AxA2QDTDpCODxQCwEpBKEuIABAGQCKItjPHUQgYA1gbAyQjaGXnSEUIgzAdQmpDwo7BnQifAeiqASQlCAjl/CSQg5AVhAAaQhmAnh0A0Qh6AvjRBhQklB/jXA+QhMAXhDAOQiwAmigAAQilAAiWgog");
	this.shape_90.setTransform(270.2,236.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#ADECE2").s().p("EggkAi9Ig3gQQluhxiukHIgFgIQizkTArmfQAfk1CZlWQA1h2BEh7QBdipB2ipQC9kREEkgQAmgqArguQBVhcBdhdQCWiXCNiDQEKjzEbjBQBUg5BWg1QDUiEDUhjQE+iWE5hLIA8gOQE1hFESALQCuAFCeAlQCUAiB8A8QDQBjCMCoIABgFQA1A1AwA1QDTDqCPDxQCxEoBLEuIABAGQCMItjQHVQgXA0gbAzQjaGWnUETIgzAeQmpDuo8BoQifAdipASQlCAjmACUQg5AVhAAaQhlAoh0A0Qh5AwjSBjQklCAjXBAQhMAWhDAPQiyAnijAAQiiAAiUgng");
	this.shape_91.setTransform(270.2,236.6);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#ACECE4").s().p("EgglAjBIg3gQQluhwiukHIgFgIQi0kUArmeQAgk1CZlXQA1h2BDh7QBeipB2ipQC8kSEEkgIBRhYQBVhcBcheQCWiXCOiCQEJj0EbjBQBUg6BWg1QDUiEDUhjQE9iXE6hNIA7gOQE2hFESAJQCuAFCeAlQCUAiB8A8QDQBiCNCpIAAgGQA1A1AwA2QDUDqCPDwQCyEoBMEuIABAGQCOItjQHVQgXA1gbAyQjbGWnUETIg0AeQmpDto9BnQifAdipATQlCAil/CVQg6AWhAAbQhlAoh0A1Qh4AwjSBkQklCCjXBBQhMAXhDAPQi0AoilAAQigAAiTgmg");
	this.shape_92.setTransform(270.2,236.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#ABECE5").s().p("EgglAjEIg3gPQluhwivkGIgFgIQi0kUArmfQAgk1CZlXQA1h2BEh7QBdipB2iqQC8kSEDkgQAmgrArguQBVhcBcheQCViWCPiDQEJj0EbjCQBUg6BVg1QDUiEDUhkQE9iYE6hOIA7gOQE2hGESAJQCuAECfAlQCUAhB8A8QDQBiCMCpIABgGQA0A1AxA2QDUDqCQDwQCzEoBMEtIACAGQCPIujQHVQgXA1gbAyQjbGWnVESIg0AeQmpDto+BmQifAdipASQlCAjmACXQg5AWhAAaQhlAqh0A1Qh4AxjSBlQklCEjXBCQhMAXhDAQQi1ApinAAQifAAiRgmg");
	this.shape_93.setTransform(270.2,237);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#AAECE7").s().p("EgglAjJIg4gQQluhvivkHIgFgIQi0kUArmeQAgk1CZlXQA1h3BDh7QBeipB1iqQC8kTEDkgQAmgrAqguQBWhdBchdQCViXCOiDQEKj0EajCQBUg6BVg2QDUiFDUhkQE9iZE6hOIA7gOQE2hIESAIQCuAFCfAkQCUAhB8A7QDRBjCMCpIAAgGQA1A1AwA2QDUDqCRDvQC0EpBNEsIACAGQCRIujQHVQgXA1gbAyQjbGWnXESIgzAdQmrDto9BmQifAciqATQlCAil/CYQg5AXhAAbQhlAph0A2Qh3AyjTBnQklCFjXBDQhMAYhDAQQi4AripAAQicAAiPglg");
	this.shape_94.setTransform(270.2,237.2);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#A9ECE8").s().p("EggmAjMIg3gPQlvhviwkGIgFgIQi0kUAsmfQAgk1CZlYQA1h2BDh7QBdiqB1ipQC9kVEBkgQAmgrArgtQBWheBbhdQCViXCOiDQEKj1EajCQBUg6BWg2QDTiFDUhlQE9iaE5hPIA7gPQE2hIETAIQCuADCfAkQCUAiB8A7QDRBiCMCpIABgGQA0A1AxA2QDTDqCSDvQC1EoBOEtIACAGQCTItjQHWQgYA1gbAyQjaGVnYESIg0AeQmrDro+BmQifAciqASQlBAimACbQg5AWhAAcQhkAqh1A2Qh2AzjUBoQkkCHjXBEQhMAYhDAQQi6AtirAAQiaAAiOglg");
	this.shape_95.setTransform(270.2,237.5);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#A8ECEA").s().p("EggmAjQIg4gPQlvhuiwkHIgFgIQi0kUArmfQAgk0CalYQA0h3BEh7QBdiqB1iqQC8kVEBkgQAmgrArguQBVhdBchdQCUiXCPiEQEKj1EZjCQBUg6BWg2QDTiGDThmQE+ibE5hQIA7gOQE2hJESAGQCvAECfAjQCUAhB9A7QDQBiCMCqIABgGQA0A1AxA2QDUDqCSDuQC1EpBQEsIACAGQCVItjRHXQgXA0gbAzQjbGUnZESIg0AdQmrDro+BlQigAdiqASQlBAhmACdQg5AWhAAcQhkArh0A3Qh2AzjUBpQkkCJjXBGQhMAYhDAQQi8AuitAAQiYAAiMgkg");
	this.shape_96.setTransform(270.2,237.7);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#A8ECEC").s().p("EggmAjUIg4gPQlvhtiwkHIgFgIQi1kUArmfQAhk0CYlZQA1h3BEh7QBciqB2iqQC8kWEAkgIBQhZQBXheBbhdQCTiWCPiFQELj0EZjDQBUg7BVg2QDTiHDUhmQE9ibE5hRIA7gPQE2hKETAGQCuADCfAjQCUAhB9A7QDRBiCMCqIABgHQA0A2AxA1QDUDqCSDvQC3EoBQErIACAHQCXIujQHWQgYA1gbAyQjbGUnbESIgzAdQmrDqo/BlQigAciqASQlBAhmACeQg5AXhAAcQhkAsh0A4Qh2AzjUBrQkkCLjXBGQhMAZhCAQQi/AwiuAAQiXAAiKgkg");
	this.shape_97.setTransform(270.1,237.9);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#A7ECED").s().p("EggnAjYIg3gPQlwhtixkHIgFgIQi1kUAsmfQAgk0CalZQA0h3BEh7QBdiqB0iqQC9kXD/kgQAmgsAqgtQBWhfBbhcQCTiXCQiFQELj1EYjDQBUg7BVg2QDUiHDThnQE9icE4hSIA7gPQE3hLESAFQCvADCfAjQCVAgB9A7QDQBiCMCqIABgHQA0A2AxA1QDUDrCTDuQC4EoBRErIACAGQCZIujRHXQgXA1gbAyQjbGUncERIgzAdQmsDppABlQifAcirASQlAAhmBCgQg4AXhAAcQhkAsh1A5Qh0A0jVBsQkkCMjXBIQhMAZhCARQjBAxixAAQiUAAiJgjg");
	this.shape_98.setTransform(270.1,238.1);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#A6ECEF").s().p("EggnAjcIg4gPQlwhsixkHIgFgIQi1kUAsmfQAgk0CalaQA0h3BDh7QBdiqB0irQC9kXD/kgQAmgsAqguQBWheBbhdQCTiWCQiFQEKj2EYjEQBUg6BVg3QDUiHDShoQE9idE5hTIA7gPQE3hMESAFQCvACCfAjQCVAgB9A7QDRBhCMCrIAAgHQA0A1AxA2QDVDqCTDuQC5EoBSErIACAGQCbIujRHXQgXA1gcAyQjaGUndEQIg0AeQmsDopBBkQifAciqASQlBAhmAChQg5AYhAAdQhkAsh0A5Qh0A1jVBtQklCPjWBIQhMAahCARQjDAyiyAAQiTAAiHgig");
	this.shape_99.setTransform(270.1,238.3);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#A5ECF0").s().p("EggoAjgIg3gPQlxhsixkGIgFgIQi2kUAsmgQAhkzCZlaQA1h3BDh8QBdiqB0irQC9kYD+khIBQhZQBWhfBahcQCTiXCQiFQELj2EYjEQBUg7BVg3QDTiIDShnQE9ifE4hTIA8gPQE2hNETAEQCuACCgAiQCVAgB9A6QDRBiCMCqIAAgGQA1A1AwA2QDVDqCUDtQC6EpBTEqIACAGQCdIujRHYQgYA0gbAzQjbGTneEQIg0AdQmsDopBBkQigAbiqASQlBAhmACjQg5AYhAAdQhjAth1A6QhzA2jWBuQkkCQjWBKQhMAahCARQjFA0i0AAQiRAAiGgig");
	this.shape_100.setTransform(270.1,238.5);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#A4ECF2").s().p("EggoAjkIg4gPQlxhrixkGIgFgIQi2kVAsmfQAhkzCZlbQA1h3BDh8QBciqB0irQC9kZD9khQAngsApgtQBXhfBZhdQCTiWCRiGQEKj1EYjFQBUg7BVg3QDTiJDShoQE9ifE4hVIA7gPQE3hOETADQCuACCgAiQCVAgB9A6QDSBhCLCrIAAgHQA1A2AxA1QDVDrCUDtQC7EoBUEqIACAGQCfIujSHYQgXA1gbAyQjbGTnfEQIg0AdQmtDnpCBjQifAcirARQlAAhmBClQg4AYhAAdQhkAuh0A6QhyA3jXBvQkkCSjWBLQhMAbhCARQjHA1i1AAQiPAAiFghg");
	this.shape_101.setTransform(270.1,238.7);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#A3EBF3").s().p("EggpAjoIg3gPQlyhriykGIgFgIQi2kUAtmgQAgkzCalbQA1h3BDh8QBcirB0irQC9kZD8khQAngsApgtQBWhgBahcQCSiXCRiGQELj2EXjFQBUg7BVg3QDTiJDShpQE9igE3hWIA8gPQE3hPESADQCvABCgAiQCWAfB8A6QDSBhCLCrIABgGQA0A1AxA1QDVDrCWDtQC7EoBVEpIACAGQChIvjSHYQgXA1gcAyQjbGTngEPIg0AdQmtDmpCBjQigAcirARQlAAhmBCmQg4AYhAAeQhjAuh1A7QhxA4jXBwQkkCUjWBMQhMAbhCASQjJA2i4AAQiNAAiDggg");
	this.shape_102.setTransform(270.1,239);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#A2EBF5").s().p("EggpAjsIg4gPQlyhqiykGIgFgIQi3kVAtmfQAhkzCalcQA1h3BCh8QBdirBzirQC9kaD8khIBQhaQBWhfBZhdQCSiWCRiHQELj2EXjFQBUg8BVg3QDTiKDShpQE8ihE4hWIA7gQQE3hPETABQCvABCgAiQCWAfB8A6QDSBhCMCrIAAgHQA0A2AxA1QDWDrCWDsQC8EoBWEpIACAGQCjIvjSHYQgYA1gbAzQjbGSnhEPIg1AdQmuDlpCBiQigAciqARQlAAhmBCoQg5AZhAAeQhiAuh1A8QhxA4jYByQkjCVjWBNQhMAchDASQjKA4i5AAQiLAAiCggg");
	this.shape_103.setTransform(270.1,239.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#A2EBF6").s().p("EggpAjwIg4gPQlyhqizkGIgFgIQi3kUAtmgQAhkzCalcQA1h3BDh8QBcirBzisQC9kbD7khQAngsApgtQBWhgBZhdQCRiWCSiHQEMj2EWjGQBUg8BUg3QDUiKDRhqQE9iiE3hXIA7gQQE4hRESACQCvAACgAhQCWAfB9A6QDSBhCLCrIABgHQA0A2AxA1QDWDrCWDsQC9EoBYEpIACAGQCkIvjSHYQgXA1gcAzQjbGRnjEPIg0AdQmuDkpDBiQigAcirARQk/AgmCCqQg4AZhAAfQhiAvh1A8QhwA5jYBzQkkCXjWBOQhMAchCATQjMA5i7AAQiKAAiAgfg");
	this.shape_104.setTransform(270.1,239.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#A1EBF8").s().p("EggqAj0Ig4gPQlyhpizkGIgFgIQi3kVAtmfQAhkzCalcQA1h4BCh8QBcirBzisQC9kcD7khIBPhZQBXhhBZhcQCRiWCSiHQELj3EWjHQBUg7BVg4QDTiKDRhrQE8ijE4hYIA7gQQE3hRETAAQCvAACgAhQCWAfB9A6QDTBgCLCsIAAgHQA0A1AxA2QDWDrCXDrQC+EpBZEoIACAGQCmIvjSHYQgYA1gbAzQjbGRnkEPIg0AcQmvDkpEBiQifAbirARQlAAgmBCsQg4AZhAAfQhjAvh1A+QhvA5jZB0QkjCZjWBPQhMAdhCATQjOA7i8AAQiIAAiAgfg");
	this.shape_105.setTransform(270.1,239.6);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#A0EBF9").s().p("EggqAj4Ig4gPQlzhpizkGIgFgIQi4kUAumgQAhkzCaldQA0h3BDh8QBcisBzisQC9kcD6khQAmgtApgtQBXhhBYhcQCRiWCSiIQEMj2EWjHQBTg8BVg4QDTiLDQhrQE9ikE3hZIA7gQQE4hSETAAQCvgBCgAhQCXAeB9A6QDSBgCLCsIAAgHQA1A2AwA1QDXDrCXDrQC/EoBaEoIACAGQCoIvjSHZQgYA1gbAzQjcGRnlEOIg0AdQmvDipEBiQigAbirARQlAAgmBCtQg4AahAAfQhiAwh1A+QhvA6jZB1QkkCbjVBQQhMAdhCATQjQA9i+AAQiHAAh9geg");
	this.shape_106.setTransform(270.1,239.9);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#9FEBFB").s().p("EggrAj8Qmkhki/khQi4kUAtmgQAtmbEGnpQEMnyHIn+QI1p3JmmWQIzl1IfiRQH/iIGbBTQGTBSDeETIAAgIQI+JNCzJKQCqIvjTHZQjRHWojEwQo1E5s/BTQk/AfmCCwQiOBBjBBnQhuA6jZB3QmNDVj6BKQjSA+jAAAQiEAAh9geg");
	this.shape_107.setTransform(270.1,240);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).wait(1));

	// FlashAICB
	this.instance = new lib.blobyellow();
	this.instance.parent = this;
	this.instance.setTransform(276.1,219,1,1,0,0,0,273.9,213.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(108));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,5.8,549.9,432.4);


(lib.word1words = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// word 1 - 1
	this.instance = new lib.word11();
	this.instance.parent = this;
	this.instance.setTransform(226,465.1,1,1,0,0,0,-26,-34.9);
	this.instance.alpha = 0;

	this.instance_1 = new lib.word11();
	this.instance_1.parent = this;
	this.instance_1.setTransform(320,395.1,1,1,0,0,0,-26,-34.9);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.word11();
	this.instance_2.parent = this;
	this.instance_2.setTransform(370,261.2,1,1,0,0,0,-26,-34.9);
	this.instance_2.alpha = 0;

	this.instance_3 = new lib.word11();
	this.instance_3.parent = this;
	this.instance_3.setTransform(205,150.2,1,1,0,0,0,-26,-34.9);
	this.instance_3.alpha = 0;

	this.instance_4 = new lib.word11();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-30,30.2,1,1,0,0,0,-26,-34.9);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.word1words, new cjs.Rectangle(-124,-4.9,588,505.5), null);


// stage content:
(lib.zd_patientpoweredsearch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		console.log("frame1");
		
		var inited = false;
		createjs.Ticker.addEventListener("tick", initPPS);
		
		function initPPS(event) {
				console.log("initPPS");
			if (!inited) {
				initCanvas();
				inited = true;
			}
		}
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// words
	this.word1_mc = new lib.word1words();
	this.word1_mc.parent = this;
	this.word1_mc.setTransform(512.5,89.6,1,1,0,0,0,106.5,39.6);

	this.timeline.addTween(cjs.Tween.get(this.word1_mc).wait(1));

	// blobs
	this.instance = new lib.blob();
	this.instance.parent = this;
	this.instance.setTransform(472.6,304.8,1,1,0,0,0,275.2,216.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#66FF00").ss(4,1,1).p("AhRA3ICjht");
	this.shape.setTransform(448.2,124.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(499,299,1002,602);
// library properties:
lib.properties = {
	width: 1000,
	height: 600,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;