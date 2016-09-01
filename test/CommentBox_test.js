import assert  from 'power-assert';
import { mount } from 'enzyme';
import React from 'react';

import CommentBox from '../src/CommentBox.jsx';

class mockAPI {
  static getComments() {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          { author: 'John Smith', text: 'British', id: '1' },
        ],
      });
    });
  }

  static postComment(data) {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          { author: 'John Smith', text: 'British', id: '1' },
          { author: 'Hans Schmidt', text: 'German', id: '2' },
        ],
      });
    });
  }
}

describe('<CommentBox />', () => {
  it('should handle comment submit', () => {
    const props = { api: mockAPI, pollInterval: 2000 };
    const wrapper = mount(<CommentBox {...props} />);

    wrapper.instance().handleCommentSubmit({ author: 'Hans Schmidt', text: 'German' });

    const page = wrapper.html();
    assert(page.search('Hans Schmidt') > -1);
    assert(page.search('German') > -1);
  });
});
