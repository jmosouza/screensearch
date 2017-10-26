import chrome from './chrome'

// const log = process.env.NODE_ENV === 'production'
//   ? () => {}
//   : chrome.extension.getBackgroundPage().console.log
//
// export default log

export default chrome.extension.getBackgroundPage().console.log
