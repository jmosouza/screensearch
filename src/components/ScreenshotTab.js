import React from 'react'

const ScreenshotTab = ({screenshot}) => (
  <img
    src={screenshot.imageURL}
    id='screenshot-image'
    className='padding-box responsive-image'
    width='300'
  />
)

export default ScreenshotTab
