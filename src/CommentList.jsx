import React from 'react';

import Comment from './Comment.jsx';

const CommentList = (props) => {
  const commentNodes = props.data.map((comment) =>
    <Comment author={comment.author} key={comment.id}>
      {comment.text}
    </Comment>
  );

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: React.PropTypes.array,
};

export default CommentList;
