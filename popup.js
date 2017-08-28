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
        updateSearchResultsList(json.results
          .map(result => resultHTML(result))
          .join('')
        )
      })
      .catch(error => {
        log(error)
        updateSearchMessage(`Error whilte searching "${term}"`)
      })
  }

  const resultHTML = (itunesRow) => (
    `<li class="media-item">
      <div class="media-thumbnail">
        <img src="${itunesRow.artworkUrl30}" width="30" height="30"/>
      </div>
      <div class="media-info">
        <h3><a href="${itunesRow.trackViewUrl}" target="_blank">${itunesRow.trackName}</a></h3>
        <p>${itunesRow.artistName}</p>
      </div>
    </li>`
  )

  const updateSearchMessage = (message) => {
    searchMessage.textContent = message
  }

  const updateSearchResultsList = (listHTML) => {
    searchResultsList.innerHTML = listHTML
  }

  const clearScreenshot = () => {
    screenshotImage.src = null
  }

  const clearSearch = () => {
    updateSearchMessage(null)
    updateSearchResultsList(null)
  }
}
