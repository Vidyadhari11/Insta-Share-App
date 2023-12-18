import React from 'react'

const CartContext = React.createContext({
  searchText: '',
  isSearchButtonClicked: false,
  setLoading: false,
  isFailure: false,
  resetFailure: () => {},
  setFailure: () => {},
  setSearchButton: () => {},
  updateLoading: () => {},
  updateSearchText: () => {},
  resetSearchButton: () => {},
  postsData: [],
  setPostsData: () => {},
  initiateSearchPostLikeApi: () => {},
})

export default CartContext
