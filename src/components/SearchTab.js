import React from 'react'
import ItunesListItem from './ItunesListItem'

const SearchTab = ({search}) => (
  <div>
    <h3 id='search-message' className='padding-box'>
      {search.message}
    </h3>
    <ul id='search-results' className='unbulletted-list padding-box'>
      {search.results.map(ItunesListItem)}
    </ul>
  </div>
)

export default SearchTab
