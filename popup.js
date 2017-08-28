// Shortcut to the console.log function.
const log = chrome.extension.getBackgroundPage().console.log

// Need to wait for window to load before adding events to elements.
window.onload = () => {
  const screenshotImage = document.querySelector('#screenshot-image')
  const takeScreenshotButton = document.querySelector('#take-screenshot')

  const searchMessage = document.querySelector('#search-message')
  const searchItunesButton = document.querySelector('#search-itunes')
  const searchResultsList = document.querySelector('#search-results')

  // Take screenshot and show on extension's window.
  takeScreenshotButton.onclick = () => {
    chrome.tabs.captureVisibleTab(null, {}, (imageURL) => {
      clearSearch()
      screenshotImage.src = imageURL
    })
  }

  // Take title and show on extension's window.
  searchItunesButton.onclick = () => {
    const tabQueryOptions = { active: true, currentWindow: true }
    chrome.tabs.query(tabQueryOptions, (tabs) => {
      clearScreenshot()
      const tab = tabs[0]
      updateSearchMessage(`Searching "${tab.title}"...`)
      fetchItunesResults(tab.title)
    })
  }

  // Take search term, fetch iTunes API and show results on extension's window.
  const fetchItunesResults = (term) => {
    const itunesSearchURL = encodeURI(`https://itunes.apple.com/search?entity=song&limit=20&term=${term}`)
    fetch(itunesSearchURL)
      .then(data => data.json())
      .then(json => {
        updateSearchMessage(`${json.resultCount} results for "${term}"`)
        searchResultsList.innerHTML = json.results
          .map(result => resultHTML(result))
          .join()
      })
      .catch(error => {
        log(error)
        updateSearchMessage(`Error whilte searching "${term}"`)
      })
  }

  const resultHTML = (itunesRow) => (
    `<li>
      <div>
        <img src="${itunesRow.artworkUrl30}" width="30" height="30"/>
      </div>
      <div>
        <h4>${itunesRow.artistName}</h4>
        <a href="${itunesRow.trackViewUrl}">${itunesRow.trackName}</a>
      </div>
    </li>`
  )

  const updateSearchMessage = (message) => {
    searchMessage.textContent = message
  }

  const clearScreenshot = () => {
    screenshotImage.src = null
  }

  const clearSearch = () => {
    updateSearchMessage(null)
  }
}
