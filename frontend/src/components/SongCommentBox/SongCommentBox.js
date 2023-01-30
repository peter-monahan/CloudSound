import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Comment from "../Comment";

import { getSongComments, resetComments, createComment } from "../../store/comments";

import './SongCommentBox.css';

function SongCommentBox ({songId, sessionUser}) {
const dispatch = useDispatch();
const comments = useSelector(state => state.comments);
const [showEditButton, setShowEditButton] = useState(true);
const [newComment, setNewComment] = useState('');


useEffect(() => {
  dispatch(resetComments());
}, []);
useEffect(() => {
  if(songId) {
    dispatch(getSongComments(songId))
    console.log('getting comments');
  }
}, [songId]);

const createNewComment = (e) => {
  e.preventDefault();

  const outerPayload = {
    songId,
    payload: {
      body: newComment
    }
  }
  dispatch(createComment(outerPayload));
  setNewComment('');
}

const createCommentBox = (
  <div className="leave-comment-box">
    {/* <div className="create-comment">
      Leave a comment:
        <div className="create-comment-2">
          <textarea className="comment-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
          {newComment.length > 0 && <button onClick={createNewComment}>Create Comment</button>}
        </div>
    </div> */}

    <textarea maxLength='200' rows={newComment.split(' ').join('').split('\n').reduce((acc, curr) => {
            if(acc >= 6) {
              return 6;
            }
            if(curr.length === 0 ) {
              return acc + 1
            }
            return acc + Math.ceil(curr.length / 40)
            }, 1) } cols='40'
        placeholder='Leave a comment' className="message-textarea"
        value={newComment} onChange={e => setNewComment(e.target.value)}
        id="message-bar-chat-bar">
        </textarea>
        {newComment.length > 0 && <button onClick={createNewComment}>Create Comment</button>}

  </div>
);
  return (
    <div className="comment-box">
      {sessionUser && createCommentBox}
      {comments.map(comment => <Comment key={comment.id} showEditButton={showEditButton} setShowEditButton={setShowEditButton} comment={comment} sessionUserId={sessionUser ? sessionUser.id : null} />)}
    </div>
  );
}

export default SongCommentBox;
