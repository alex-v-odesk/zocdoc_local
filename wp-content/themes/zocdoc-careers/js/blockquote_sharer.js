var blockquotes = document.getElementsByTagName('blockquote');

for( var i = 0; i < blockquotes.length; i++ ) {
    var blockquote = blockquotes[i];
    var text = encodeURI( blockquote.textContent || blockquote.innerText || "" );
    var link = encodeURI( window.location.href );
    var share_links = `<ul class="blockquote_share">
                            <li>Share: </li>
                            <li><a target="_blank" href="https://twitter.com/intent/tweet?original_referer=` + link + `&source=tweetbutton&text=` + link + `%20-%20` + text + `" target="_blank">
                                <span class="ss-icon" >Twitter </span>
                            </a></li>
                            <li><a target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=` + link + `&t=` + text + `&p=` + text + `">
                                <span class="ss-icon" >Facebook</span>
                            </a></li>
                        </ul>`;
    blockquote.innerHTML = blockquote.innerHTML + share_links;
}