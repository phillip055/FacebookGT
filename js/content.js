function FindByAttribute(node, elementTag, attribute)    {
  var All = node.getElementsByTagName(elementTag);
  for (var i = 0; i < All.length; i++) {
    if (All[i].hasAttribute(attribute)) { return All[i]; }
  }
}

const watchedComments = []

function createFacebookTextSpanNode(key, text) {
    var x = document.createElement('span')
    x.setAttribute('data-offset-key', key)
    var y = document.createElement('span')
    y.setAttribute('data-text', true)
    y.textContent = text
    x.appendChild(y)
    return x
}

observeDOM(document, () => {
	$('.UFIAddCommentInput').each(function(i, obj) {
		const commentEditorBox = FindByAttribute(obj, "div", "data-offset-key")
		if (commentEditorBox) {
			const key = $(commentEditorBox).attr('data-offset-key')
			if (key) {
				console.log(key)
				if (watchedComments.includes(key)) {
					console.log("Key already exists")
					console.log(watchedComments)
				}
				else {
					const commentDivWithKey = FindByAttribute(commentEditorBox, "div", "data-offset-key")
					if (commentDivWithKey) {
						console.log(commentDivWithKey)
						const commentSpanWrapper = $(commentDivWithKey).find('span')[0]
						if (commentSpanWrapper) {
							watchedComments.push(key)
							console.log("New comment box found")
							observeDOM(commentSpanWrapper, () => {
								const spanText = $(commentSpanWrapper).find('span')[0]
								if (spanText) {
									getGroupTagList((groups) => {
										console.log(spanText)
										if ($(spanText).text() == "workbros") {
											console.log("FOUND")
											$(spanText).text("workbros #1") 
										}
									})
								}
							})
						}	
					}
				}
			}
		}
	});
})
