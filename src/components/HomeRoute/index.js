import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import UserStories from '../UserStories'

import './index.css'

import UserPosts from '../UserPosts'

import CartContext from '../../context/CartContext'

class Home extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            searchPosts,
            searchText,
            updateLoading,
            setPostsData,
            updateSearchText,
            setSearchButton,
            resetFailure,
            setFailure,
          } = value

          const getUserSearchPosts = async () => {
            updateLoading()
            const jwtToken = Cookies.get('jwt_token')
            const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchText}`
            const options = {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              method: 'GET',
            }
            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if (response.ok) {
              const updatedData = data.posts.map(eachPost => ({
                postId: eachPost.post_id,
                createdAt: eachPost.created_at,
                likesCount: eachPost.likes_count,
                comments: eachPost.comments,
                userId: eachPost.user_id,
                profilePic: eachPost.profile_pic,
                userName: eachPost.user_name,
                postCaption: eachPost.post_details.caption,
                postImage: eachPost.post_details.image_url,
              }))
              updateLoading()
              setPostsData(updatedData)
              updateSearchText()
              setSearchButton()
              resetFailure()
            } else {
              updateLoading()
              setFailure()
              setSearchButton()
            }
          }

          return (
            <div className="home-container">
              <Header getUserSearchPosts={getUserSearchPosts} />
              <UserStories />
              <UserPosts searchPosts={searchPosts} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Home
