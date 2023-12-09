import {Component} from 'react'
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
          const {searchPosts} = value

          return (
            <div className="home-container">
              <Header />
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
