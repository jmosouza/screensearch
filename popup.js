// Shortcut to the console.log function.
var log = chrome.extension.getBackgroundPage().console.log

// Need to wait for window to load before adding events to elements.
window.onload = () => {
  var screenshotImage = document.querySelector('#screenshot-image')
  var takeScreenshotButton = document.querySelector('#take-screenshot')

  var searchTermLabel = document.querySelector("#search-term")
  var searchItunesButton = document.querySelector('#search-itunes')

  // Take screenshot and show on extension's window.
  takeScreenshotButton.onclick = () => {
    chrome.tabs.captureVisibleTab(null, {}, (imageURL) => {
      clearSearch()
      screenshotImage.src = imageURL
    })
  }

  // Take title and show on extension's window.
  searchItunesButton.onclick = () => {
    var options = { active: true, currentWindow: true }
    chrome.tabs.query(options, (tabs) => {
      clearScreenshot()
      var tab = tabs[0]
      searchTermLabel.textContent = `Searching "${tab.title}"...`
      fetchItunesResults(tab.title)
    })
  }

  var fetchItunesResults = (term) => {
    var itunesSearchURL = encodeURI(`https://itunes.apple.com/search?limit=25&term=${term}`)
    fetch(itunesSearchURL)
      .then(data => data.json())
      .then(json => {
        log(json)
        json.results.forEach(result => {
          log(result.artistName)
        })
      })
  }

  const clearScreenshot = () => {
    screenshotImage.src = null
  }

  const clearSearch = () => {
    searchTermLabel.textContent = null
  }
}
