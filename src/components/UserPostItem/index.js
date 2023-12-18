import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import './index.css'

const UserPostItem = props => {
  const {postDetails, initiatePostLikeApi} = props
  const {
    comments,
    postId,
    likesCount,
    message,
    profilePic,
    userName,
    postImage,
    postCaption,
    createdAt,
    userId,
  } = postDetails
  const updatedComment = comments.map(each => ({
    comment: each.comment,
    commentUserId: each.user_id,
    commentUserName: each.user_name,
  }))
  const isLiked = message === 'Post has been liked'

  const postLikeApp = () => {
    initiatePostLikeApi(postId, true)
  }

  const postUnlikeApp = () => {
    initiatePostLikeApi(postId, false)
  }

  return (
    <li key={postId} className="post-item-container">
      <div className="profile-div">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-pic"
        />
        <Link to={`users/${userId}`}>
          <p className="profile-name">{userName}</p>
        </Link>
      </div>
      <img src={postImage} alt="post" className="post-image" />
      <div className="social-div">
        {isLiked ? (
          <button
            type="button"
            onClick={postUnlikeApp}
            aria-label="close"
            className="icon-button"
            data-testid="unLikeIcon"
          >
            <FcLike className="like-icon" />
          </button>
        ) : (
          <button
            onClick={postLikeApp}
            aria-label="close"
            type="button"
            className="icon-button"
            data-testid="likeIcon"
          >
            <BsHeart className="icon" />
          </button>
        )}
        <button
          aria-label="close"
          type="button"
          className="icon-button"
          data-testid="commentIcon"
        >
          <FaRegComment className="icon" />
        </button>
        <button
          aria-label="close"
          type="button"
          className="icon-button"
          data-testid="shareIcon"
        >
          <BiShareAlt className="icon" />
        </button>
      </div>
      <p className="likes">{likesCount} likes</p>
      <p className="caption">{postCaption}</p>
      <ul className="comments-container">
        {updatedComment.map(each => (
          <li className="comment-item" key={each.commentUserId}>
            <Link to={`/users/${each.commentUserId}`}>
              <span className="comment-user-name">{each.commentUserName}</span>
            </Link>
            <p className="comment">{each.comment}</p>
          </li>
        ))}
      </ul>
      <p className="created-at">{createdAt}</p>
    </li>
  )
}

export default UserPostItem
