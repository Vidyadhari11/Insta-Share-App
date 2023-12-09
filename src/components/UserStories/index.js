import './index.css'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserStories extends Component {
  state = {apiStatus: apiConstantStatus.initial, storiesList: []}

  componentDidMount() {
    this.getUsersStories()
  }

  getUsersStories = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        storiesList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="user-story-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user-story-failure-image"
      />
      <h1 className="failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        onClick={this.getUsersStories}
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {storiesList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
      initialSlide: 0,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {storiesList.map(each => (
            <li key={each.userId} className="story-container">
              <img src={each.storyUrl} alt="user story" className="story-img" />
              <p className="user-name">{each.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderUserStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-stories-container">{this.renderUserStories()}</div>
    )
  }
}

export default UserStories
