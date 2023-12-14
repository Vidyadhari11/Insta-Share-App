import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {IoCloseCircle} from 'react-icons/io5'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {getUserSearchPosts, changeSearchText} = props
  const [isOpen, setHamburgerButton] = useState(false)

  const [searchBarVisible, setShowSearchBar] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {searchText, resetSearchButton, updateSearchText} = value

        const showSearchBar = () => {
          setShowSearchBar(!searchBarVisible)
        }

        const changeSearchTextButton = event => {
          changeSearchText(event)
        }

        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        const userSearchPosts = () => {
          getUserSearchPosts()
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
                    onChange={changeSearchTextButton}
                    className="search-bar"
                    placeholder="Search Caption"
                  />
                  <button
                    className="search-button"
                    onClick={userSearchPosts}
                    type="button"
                    aria-label="close"
                    testid="searchIcon"
                  >
                    <FaSearch className="search-icon" />
                  </button>
                </div>
                <ul className="nav-bar">
                  <Link to="/" className="nav-item">
                    <li>Home</li>
                  </Link>
                  <Link to="/my-profile" className="nav-item">
                    <li>Profile</li>
                  </Link>
                </ul>
                <button
                  className="logout-button"
                  onClick={onClickLogout}
                  type="button"
                >
                  Logout
                </button>
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
                <button
                  className="hamburger-button"
                  onClick={() => setHamburgerButton(!isOpen)}
                  type="button"
                  aria-label="close"
                  testid="hamburgerIcon"
                >
                  <GiHamburgerMenu className="hamburger-icon" />
                </button>
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
                  <button
                    onClick={() => setHamburgerButton(!isOpen)}
                    type="button"
                    className="hamburger-button"
                    aria-label="close"
                  >
                    <IoCloseCircle className="hamburger-icon" />
                  </button>
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
                  <button
                    onClick={getUserSearchPosts}
                    type="button"
                    aria-label="close"
                    className="search-button"
                    testid="searchIcon"
                  >
                    <FaSearch className="search-icon" />
                  </button>
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
