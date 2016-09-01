import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './CommentBox.jsx';
import api from './api';

ReactDOM.render(
  React.createElement(CommentBox, { api, pollInterval: 2000 }),
  document.getElementById('content')
);
