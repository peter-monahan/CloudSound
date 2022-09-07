import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateComment, deleteComment } from "../../store/comments";

import { Link } from "react-router-dom";





import './Comment.css';

function Comment ({comment, sessionUserId, showEditButton, setShowEditButton}) {

  const dispatch = useDispatch();
  const {User} = comment;
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.body)

  const destroyComment = async (e) => {
    e.preventDefault();

    const outerPayload = {
      commentId: comment.id,
      songId: comment.songId
    }

    await dispatch(deleteComment(outerPayload));
    setShowEdit(false);
    setShowEditButton(true);
  }

  const saveComment = async (e) => {
    e.preventDefault();

    const outerPayload = {
      commentId: comment.id,
      payload: {
        body: newComment
      }
    }

    await dispatch(updateComment(outerPayload));
    setShowEdit(false);
    setShowEditButton(true);
  }

  if(showEdit) {
    return(
      <div className="comment">
      <div className="comment-top">
      <Link to={`/users/${User.id}`} className='comment-user-button'>
      {( User.previewImage && User.previewImage.length > 1 && <img src={User.previewImage} className='user-icon-img' />) || <i className="fas fa-user-circle fa-2xl user-icon" />}
      <h5>{User.username}</h5>
      </Link>
      </div>

      <div className="comment-body edit-area">
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
      <button onClick={saveComment}>Save</button>
      <button onClick={destroyComment}>Delete</button>
      </div>

    </div>
    );
  }
  return (
    <div className="comment">
      <div className="comment-top">
      <Link to={`/users/${User.id}`} className='comment-user-button'>
      {( User.previewImage && User.previewImage.length > 1 && <img src={User.previewImage} className='user-icon-img' />) || <i className="fas fa-user-circle fa-2xl user-icon" />}
      <h5>{User.username}</h5>
      </Link>
      {showEditButton && User.id === sessionUserId && <button onClick={e => {
        setShowEdit(true)
        setShowEditButton(false);
        }}>Edit</button>}
      </div>
      <div className="comment-body">{comment.body}</div>
      {comment.createdAt !== comment.updatedAt && <div className="edited-comment">Edited</div>}
    </div>
  );
}

export default Comment;
