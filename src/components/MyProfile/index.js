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

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, myProfileData: []}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/my-profile`
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
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        userBio: data.profile.user_bio,
      }

      this.setState({
        myProfileData: updatedData,
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
        className="my-profile-failure-img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        onClick={() => this.getMyProfileData()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {myProfileData} = this.state
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
    } = myProfileData
    return (
      <div className="main-container">
        <div className="my-profile-large-container">
          <img src={profilePic} alt="my profile" className="my-profile-pic" />
          <div className="my-profile-div">
            <h1 className="my-profile-name">{userName}</h1>
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
            <p className="my-profile-user-id">{userId}</p>
            <p className="my-profile-bioText">{userBio}</p>
          </div>
        </div>
        <ul className="my-profile-stories-container">
          {stories.map(eachStory => (
            <li key={eachStory.id}>
              <img src={eachStory.image} alt="my story" className="story-img" />
            </li>
          ))}
        </ul>
        <div className="posts-heading-div">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="my-profile-posts-container">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="my post"
                  className="my-profile-post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="my-profile-no-post-div">
            <BiCamera className="camera-icon" />
            <h1 className="no-posts-heading">No Posts Yet</h1>
          </div>
        )}
      </div>
    )
  }

  renderMyProfile = () => {
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
      <div className="my-profile-container">
        <Header />
        {this.renderMyProfile()}
      </div>
    )
  }
}

export default MyProfile
