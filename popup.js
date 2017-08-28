// Shortcut to the console.log function.
var log = chrome.extension.getBackgroundPage().console.log

// Need to wait for window to load before adding events to elements.
window.onload = () => {
  var screenshotImage = document.querySelector('#screenshot-image')
  var takeScreenshotButton = document.querySelector('#take-screenshot')

  // Take screenshot and show on extension's window.
  takeScreenshotButton.onclick = () => {
    chrome.tabs.captureVisibleTab(null, {}, function (imageURL) {
       screenshotImage.src = imageURL
    })
  }
}
