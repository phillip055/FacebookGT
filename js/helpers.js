const observeDOM = (
	() => {
		const obsConfig = {
			childList: true,
			subtree: true,
			attributes: true,
			characterData: true
		}
		const MutationObserver = window.MutationObserver || window.WebKitMutatationObserver
		return (obj, callback) => {
			const obs = new MutationObserver((mutations, observer) => {
                    callback();
            })
            obs.observe(obj, obsConfig)
		}
	}
)()