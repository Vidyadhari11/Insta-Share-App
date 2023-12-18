import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, userProfileData: []}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        userBio: data.user_details.user_bio,
      }

      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="user-story-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="user-profile-failure-img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        onClick={this.getUserProfileData}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {userProfileData} = this.state
    const {
      followersCount,
      followingCount,
      userBio,
      userId,
      userName,
      stories,
      posts,
      postsCount,
      profilePic,
    } = userProfileData
    return (
      <div className="main-container">
        <div className="user-profile-large-container">
          <img
            src={profilePic}
            alt="user profile"
            className="user-profile-pic"
          />
          <div className="user-profile-div">
            <h1 className="user-profile-name">{userName}</h1>
            <div className="count-div">
              <p className="text">
                <span className="count">{postsCount} </span>
                posts
              </p>
              <p className="text">
                <span className="count">{followersCount} </span>
                followers
              </p>
              <p className="text">
                <span className="count">{followingCount} </span>
                following
              </p>
            </div>
            <p className="user-profile-user-id">{userId}</p>
            <p className="user-profile-bioText">{userBio}</p>
          </div>
        </div>
        <ul className="user-profile-stories-container">
          {stories.map(eachStory => (
            <li key={eachStory.id}>
              <img
                src={eachStory.image}
                alt="user story"
                className="story-img"
              />
            </li>
          ))}
        </ul>
        <div className="posts-heading-div">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="user-profile-posts-container">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="user post"
                  className="user-profile-post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="user-profile-no-post-div">
            <BiCamera className="camera-icon" />
            <h1 className="no-posts-heading">No Posts Yet</h1>
          </div>
        )}
      </div>
    )
  }

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-container">
        <Header />
        {this.renderUserProfile()}
      </div>
    )
  }
}

export default UserProfile
