var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // console.log("MUTATION OBSERVER STARTED")
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true, characterData: true, attributes: true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
            obj.addEventListener('DOMSubtreeModified', callback, false)
        }
    };
})();

function FindByAttribute(node, elementTag, attribute)    {
  var All = node.getElementsByTagName(elementTag);
  for (var i = 0; i < All.length; i++) {
    if (All[i].hasAttribute(attribute)) { return All[i]; }
  }
}

function inArray(myArray, myValue){
    var inArray = false;
    myArray.map(function(key){
        if (key === myValue){
            inArray=true;
        }
    });
    return inArray;
};

function createFacebookTextSpanNode(key, text) {
    var x = document.createElement('span')
    x.setAttribute('data-offset-key', key)
    var y = document.createElement('span')
    y.setAttribute('data-text', true)
    y.textContent = text
    x.appendChild(y)
    return x
}

existing = []
observeDOM(document, function() {
	var commentDivs = document.getElementsByClassName("UFIAddCommentInput")
    for (var i = commentDivs.length - 1; i >= 0; i--) {
        var commentDiv = commentDivs[i]
        var keyDiv = FindByAttribute(commentDiv, "div", "data-offset-key")
        var typing = false
        if (keyDiv) {
            var key = keyDiv.getAttribute("data-offset-key")
            if (inArray(existing, key)) {
                // console.log(existing)
            }
            else {
                // console.log(commentDiv)
                var divBox = FindByAttribute(keyDiv, "div", "data-offset-key")
                var spanBox = FindByAttribute(commentDiv, "span", "data-text")
                if (spanBox){
                    var workbros = ["Sam Oberoi", "Sohum Sachdev"]
                    // console.log(spanBox)
                    // existing.push(key)
                    // console.log(existing)
                    // spanBox.addEventListener('DOMSubtreeModified', function() {
                    //     if (spanBox.textContent.includes("workbros")) {
                    //         console.log(divBox)
                    //         while (divBox.firstChild) {
                    //             divBox.removeChild(divBox.firstChild);
                    //         }
                    //         
                    //         for (var i = workbros.length - 1; i >= 0; i--) {
                    //             var bro = workbros[i]
                    //             console.log("Creating tag for " + bro)
                    //             var contentSpan = document.createElement('span')
                    //             contentSpan.setAttribute('decoratedtext', bro)
                    //             contentSpan.setAttribute('offsetkey', key)
                    //             contentSpan.setAttribute('data-offset-key', key)
                    //             contentSpan.setAttribute('spellcheck', false)
                    //             var initialKey = key.split('-')[0]
                    //             contentSpan.setAttribute('contentstate', 'o { "entityMap": [object Object], "blockMap": OrderedMap { '+ initialKey + ': s { "key": '+ initialKey + ', "type": "unstyled", "text": "Sam Oberoi", "characterList": List [ p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" }, p { "style": OrderedSet {}, "entity": "4" } ], "depth": 0, "data": Map {} } }, "selectionBefore": m { "anchorKey": '+ initialKey + ', "anchorOffset": 4, "focusKey": '+ initialKey + ', "focusOffset": 4, "isBackward": false, "hasFocus": false }, "selectionAfter": m { "anchorKey": '+ initialKey + ', "anchorOffset": 10, "focusKey": '+ initialKey + ', "focusOffset": 10, "isBackward": false, "hasFocus": false } }')
                    //             contentSpan.className = "_247o"
                    //             var textNode = createFacebookTextSpanNode(key, bro)
                    //             console.log(contentSpan)
                    //             contentSpan.appendChild(textNode)
                    //             divBox.appendChild(contentSpan)
                    //             if (i != 0) {
                    //                 var spaceNode = createFacebookTextSpanNode(key, " ")
                    //                 divBox.appendChild(spaceNode)
                    //             }
                    //         }
                    //     }
                    //     console.log(key)
                        // spanBox.textContent = "@[100006534421511:Sam]"
                        // console.log(spanBox.textContent)
                    // if (spanBox.textContent.includes("workbros")) {
                    //     typing = true
                    //     for (var i = workbros.length - 1; i >= 0; i--) {
                    //         var workbro = workbros[i]
                    //         for (var j = 0; j <= workbro - 1; j++) {
                    //             console.log(workbro[j])
                    //             document.dispatchEvent(new KeyboardEvent('keypress',{'key':workbro[j]}));
                    //         }
                    //     }
                    //     typing = false
                    // }
                    
                    // });
                }
                

                // observeDOM(commentDiv, function() {
                //     var spanBox = commentDiv.getElementsByTagName('span')[1]
                //     console.log(spanBox)
                //     observeDOM(spanBox, function() {
                //         console.log(spanBox.innerHtml)
                //     })
                // })


            }
        }
    }
})