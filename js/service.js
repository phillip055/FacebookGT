const GROUPLIST = "GroupList"

function ObjectLength(obj) {
	return Object.keys(obj).length
}

function createGroupTag(name, members) {
	console.log("New Group Tag")
	getGroupTagList((items) => {
		const groupLen = ObjectLength(items)
		const newItem = { name: name, members: members }
		items[groupLen + 1] = newItem
		chrome.storage.sync.set({ [GROUPLIST]: items }, () => {
			$('#newGroupModal').modal('toggle');
		});
	})
}


function getGroupTagList(callback) {
	chrome.storage.sync.get([GROUPLIST], (items) => {
		console.log("Retrieved items: ")
		console.log(items)
		callback(items[GROUPLIST] ? items[GROUPLIST] : {} );
	});
}
