import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {IoCloseCircle} from 'react-icons/io5'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import {SearchButton, HamburgerButton, LogoutButton} from './styledComponents'
import './index.css'

const Header = props => {
  const [isOpen, setHamburgerButton] = useState(false)
  const [searchBarVisible, setShowSearchBar] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {
          searchText,
          resetSearchButton,
          setSearchButton,
          updateLoading,
          updateSearchText,
          setPostsData,
          setFailure,
          resetFailure,
        } = value

        const showSearchBar = () => {
          setShowSearchBar(!searchBarVisible)
        }

        const changeSearchText = async event => {
          updateSearchText(event.target.value)
          resetSearchButton()
          const jwtToken = Cookies.get('jwt_token')
          const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${event.target.value}`
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
            setPostsData(updatedData)
          }
        }

        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

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
            setSearchButton()
            resetFailure()
          } else {
            updateLoading()
            setFailure()
            setSearchButton()
          }
        }

        return (
          <nav className="header-container">
            <div className="large-container">
              <div className="title-div">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
                    className="login-website-logo-image"
                    alt="website logo"
                  />
                </Link>
                <h1 className="title-heading">Insta Share</h1>
              </div>
              <div className="links-search-div">
                <div className="search-div">
                  <input
                    type="search"
                    value={searchText}
                    onChange={changeSearchText}
                    className="search-bar"
                    placeholder="Search Caption"
                  />
                  <SearchButton
                    onClick={getUserSearchPosts}
                    type="button"
                    data-testid="searchIcon"
                  >
                    <FaSearch className="search-icon" />
                  </SearchButton>
                </div>
                <ul className="nav-bar">
                  <Link to="/" className="nav-item">
                    <li>Home</li>
                  </Link>
                  <Link to="/my-profile" className="nav-item">
                    <li>Profile</li>
                  </Link>
                </ul>
                <LogoutButton onClick={onClickLogout} type="button">
                  Logout
                </LogoutButton>
              </div>
            </div>
            <div className="mobile-container">
              <div className="top-div">
                <div className="title-div">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
                      className="login-website-logo-image"
                      alt="website logo"
                    />
                  </Link>
                  <h1 className="title-heading">Insta Share</h1>
                </div>
                <HamburgerButton
                  onClick={() => setHamburgerButton(!isOpen)}
                  data-testid="hamburgerIcon"
                  className="hamburger-button"
                  type="button"
                >
                  <GiHamburgerMenu className="hamburger-icon" />
                </HamburgerButton>
              </div>
              {isOpen && (
                <div className="links-div">
                  <ul className="nav-bar">
                    <Link to="/" className="nav-item">
                      <li>Home</li>
                    </Link>
                    <Link to="/my-profile" className="nav-item">
                      <li>Profile</li>
                    </Link>
                    <li onClick={showSearchBar}>Search</li>
                  </ul>
                  <HamburgerButton
                    onClick={() => setHamburgerButton(!isOpen)}
                    type="button"
                  >
                    <IoCloseCircle className="hamburger-icon" />
                  </HamburgerButton>
                </div>
              )}
              {searchBarVisible && (
                <div className="search-div">
                  <input
                    value={searchText}
                    onChange={changeSearchText}
                    className="search-bar"
                    type="search"
                    placeholder="Search Caption"
                  />
                  <SearchButton
                    onClick={getUserSearchPosts}
                    type="button"
                    data-testid="searchIcon"
                  >
                    <FaSearch className="search-icon" />
                  </SearchButton>
                </div>
              )}
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
