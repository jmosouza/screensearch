/* global fetch */
import React from 'react'
import chrome from '../utils/chrome'
import SearchTab from './SearchTab'
import ScreenshotTab from './ScreenshotTab'
import './index.sass'

const TAB = {
  SEARCH: 'SEARCH',
  SCREENSHOT: 'SCREENSHOT'
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      currentTab: TAB.SCREENSHOT,
      screenshot: {
        imageURL: null
      },
      search: {
        term: null,
        results: [],
        message: null
      }
    }

    this.onClickTakeScreenshot = this.onClickTakeScreenshot.bind(this)
    this.displayScreenshot = this.displayScreenshot.bind(this)

    this.onClickSeachItunes = this.onClickSeachItunes.bind(this)
    this.displayItunesData = this.displayItunesData.bind(this)
    this.displayItunesError = this.displayItunesError.bind(this)
  }

  onClickTakeScreenshot () {
    this.setState({ currentTab: TAB.SCREENSHOT })
    if (this.state.screenshot.imageURL) return
    chrome.tabs.captureVisibleTab(null, {}, this.displayScreenshot)
  }

  displayScreenshot (imageURL) {
    this.setState({
      screenshot: {
        imageURL
      }
    })
  }

  onClickSeachItunes () {
    this.setState({ currentTab: TAB.SEARCH })
    if (this.state.search.results.length > 0) return
    const tabQueryOptions = { active: true, currentWindow: true }
    chrome.tabs.query(tabQueryOptions, tabs => {
      this.searchItunes(tabs[0].title)
    })
  }

  searchItunes (term) {
    this.setState({
      search: {
        term,
        results: [],
        message: `Searching "${term}"...`
      }
    })

    const itunesSearchURL = encodeURI(`https://itunes.apple.com/search?entity=song&limit=20&term=${term}`)
    fetch(itunesSearchURL)
      .then(data => data.json())
      .then(this.displayItunesData)
      .catch(this.displayItunesError)
  }

  displayItunesData (data) {
    this.setState({
      search: {
        results: data.results,
        message: `${data.resultCount} results for "${this.state.search.term}"`
      }
    })
  }

  displayItunesError () {
    this.setState({
      search: {
        results: [],
        message: `Error searching "${this.state.search.term}" on iTunes`
      }
    })
  }

  render () {
    const { currentTab, screenshot, search } = this.state
    return (
      <div className='padding-box container'>
        <div className='padding-box distribute-horizontally'>
          <button
            id='take-screenshot'
            onClick={this.onClickTakeScreenshot}>
            Take screenshot
          </button>
          <button
            id='search-itunes'
            onClick={this.onClickSeachItunes}>
            Search on iTunes
          </button>
        </div>
        {
          currentTab === TAB.SCREENSHOT
            ? <ScreenshotTab screenshot={screenshot} />
            : <SearchTab search={search} />
        }
      </div>
    )
  }

}

export default App
