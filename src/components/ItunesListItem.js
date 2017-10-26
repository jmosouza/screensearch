import React from 'react'

const ItunesListItem = ({artworkUrl30, trackViewUrl, trackName, artistName}) => (
  <li className='media-item'>
    <div className='media-thumbnail'>
      <img src={artworkUrl30} width='30' height='30' />
    </div>
    <div className='media-info'>
      <h3>
        <a href={trackViewUrl} target='_blank'>
          {trackName}
        </a>
      </h3>
      <p>{artistName}</p>
    </div>
  </li>
)

export default ItunesListItem
