var MAIN_KEY = "MAIN_KEY"
var TARGET_HOST = "https://www.facebook.com"

function getHost(url) {
    var a =  document.createElement('a');
    a.href = url;
    return a.hostname
}

function getFacebookTabs(callback) {
  var queryInfo = {
    url: TARGET_HOST + "/*"
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    callback(tabs);
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url == "https://www.facebook.com/") {
    console.log(tab)
  }
})

function addFTG(name) {
  var items = {}
  getFTGList((item) => {
    // console.log(MAIN_KEY + ":" + item ? item : [] )
    item[MAIN_KEY].push(name)
    chrome.storage.sync.set(item);
  })
}

function getFTGList(callback) {
  chrome.storage.sync.get(MAIN_KEY, (items) => {
    callback(items == {} ? items : []);
  });
}

function updateViewFTGList() {
  getFTGList((list) => {
    var parentNode = document.getElementById("ftg-group-list")
    parentNode.innerHtml = ""
    // console.log(list)
    list.push({ name: "Work Bros", people: ["@[100006534421511:Sam Oberoi]", "@[627600306:Sohum Sachdev]"] })
    for (var i = list.length - 1; i >= 0; i--) {
      var tagGroup = list[i]
      var node = document.createElement("a");
      node.className = "dropdown-item"
      node.href = "#collapse" + i
      node.setAttribute("data-toggle", "collapse")
      node.setAttribute("aria-expanded", "false")
      node.setAttribute("data-toggle", "collapse")
      var textnode = document.createTextNode(tagGroup.name);
      node.appendChild(textnode);
      parentNode.appendChild(node);
      var collapseDiv = document.createElement("div")
      collapseDiv.id = "collapse" + i
      collapseDiv.className = "collapse"
      var peopleNode = document.createElement("ul")
      peopleNode.className = "list-group"
      for (var i = tagGroup.people.length - 1; i >= 0; i--) {
        var person = tagGroup.people[i]
        var personNode = document.createElement("li")
        var textnode = document.createTextNode(person);
        personNode.className = "list-group-item"
        personNode.appendChild(textnode);
        peopleNode.appendChild(personNode)
      }
      collapseDiv.append(peopleNode)
      parentNode.append(collapseDiv)  
    }
  })
}

chrome.windows.onCreated.addListener(() => {
  updateViewFTGList()
})

// chrome.webRequest.onBeforeRequest.addListener(
//   function (request) {
//     if (request.requestBody && request.requestBody.raw) {
//       request.requestBody.raw = request.requestBody.raw.map((part) => {
//         if (part.bytes) {
//           part.bytes = [].slice.call(new Uint8Array(part.bytes.slice(0,500e3)))
//         }
//         return part
//       })
//     }
//     console.log(request)
//   },
//   { urls: ["https://www.facebook.com/ufi/add/comment/?dpr=2"]},
//   ['requestBody', 'blocking']
// )

document.addEventListener('DOMContentLoaded', () => {
  console.log("Extension Alive")
  updateViewFTGList()
})

