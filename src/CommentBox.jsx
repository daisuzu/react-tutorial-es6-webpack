import React from 'react';

import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  loadCommentsFromServer() {
    this.props.api.getComments()
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error(error);  // eslint-disable-line no-console
      });
  }

  handleCommentSubmit(comment) {
    const data = comment;
    data.id = Date.now();

    const comments = this.state.data;
    const newComments = comments.concat([data]);
    this.setState({ data: newComments });

    this.props.api.postComment(data)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        this.setState({ data: comments });
        console.error(error);  // eslint-disable-line no-console
      });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  api: React.PropTypes.func,
  pollInterval: React.PropTypes.number,
};
