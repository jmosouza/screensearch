var log = chrome.extension.getBackgroundPage().console.log

window.onload = () => {
  var screenshotImage = document.querySelector('#screenshot-image')
  var takeScreenshotButton = document.querySelector('#take-screenshot')

  takeScreenshotButton.onclick = () => {
    chrome.tabs.captureVisibleTab(null, {}, function (imageURL) {
       screenshotImage.src = imageURL
    })
  }
}
