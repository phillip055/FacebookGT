function updateGroupListUI(items) {
	console.log("UI received: ")
	console.log(items)
	$('.list-group').html("")
	for (key in items) {
		console.log(items[key])
		$('<button/>')
			.attr({
				'id': key,
				'href': '#collapse' + key
			})
			.addClass('list-group-item')
			.addClass('list-group-item-action')
			.html(items[key].name)
			.appendTo($('.list-group'))

		$('<div/>')
			.attr({
				'id': 'collapse' + key
			})
			.addClass('collapse')
			.appendTo($('#' + key))

		for (memberKey in items[key].members) {
			console.log(memberKey)
			$('<div/>')
				.html(items[key].members[memberKey]['name'])
				.appendTo($('#collapse'+key))
		}
	}
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if (key == GROUPLIST) {
			var newValue = changes[key].newValue
			updateGroupListUI(newValue)
		}
	}
});

function validateNotEmpty(event) {
	var node = $(event.target)
	if (node.val() == "") {
		$('#add-member-btn').hide()
		node.addClass('is-invalid')
	} else {
		node.removeClass('is-invalid')
		const numberOfErrors = $('.is-invalid').length
		if (numberOfErrors == 0) {
			$('#add-member-btn').show()
		}
		
		
	}
}

document.addEventListener('DOMContentLoaded', () => {
	getGroupTagList((items) => updateGroupListUI(items))

	$("#create-group-btn").on('click', () => {
		const name = $("#group-name").val()
		const memberNames = $('.member-name').map(function() { return $(this).val() }).get();
		const memberIds = $('.member-id').map(function() { return $(this).val() }).get();
		const members = {}
		for (var i = memberIds.length - 1; i >= 0; i--) {
			members[i] = {}
			members[i]['id'] = memberIds[i]
			members[i]['name'] = memberNames[i]
		}
		createGroupTag(name, members)
	})

	$("#add-member-btn").on('click', () => {
		const formRows = $('.form-row')
		const numberOfMembers = formRows.length
		const newMemberId = numberOfMembers + 1
		// validate(formRows)
		$('<div/>')
			.attr({
				'id': 'member' + (newMemberId)
			})
			.addClass('form-row')
			.addClass('extra-member')
			.appendTo('#members')
		
		$('<div/>')
			.addClass('col')
			.html('<input type="text" class="form-control member-name" placeholder="Name">')
			.bind("propertychange change click keyup input paste", validateNotEmpty)
			.appendTo('#member' + newMemberId)

		$('<div/>')
			.addClass('col')
			.html('<input type="text" class="form-control member-id" placeholder="ID">')
			.bind("propertychange change click keyup input paste", validateNotEmpty)
			.appendTo('#member' + newMemberId)

		$("#add-member-btn").hide()

	})

	$('#newGroupModal').on('hidden.bs.modal', function () {
		$("#group-name").val('')
		$(".member-id").val('')
		$('.member-name').val('')
		$('.extra-member').remove()
	})

	$(".member-id").bind("propertychange change click keyup input paste", validateNotEmpty)

	$(".member-name").bind("propertychange change click keyup input paste", validateNotEmpty)

})