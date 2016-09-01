import assert  from 'power-assert';
import { mount } from 'enzyme';
import React from 'react';

import CommentForm from '../src/CommentForm.jsx';

describe('<CommentForm />', () => {
  it('should input author', () => {
    const props = { onCommentSubmit: () => {} };
    const wrapper = mount(<CommentForm {...props} />);

    wrapper.find({ placeholder: 'Your name' })
      .simulate('change', { target: { value: 'author' } });
    assert(wrapper.state('author') === 'author');
  });

  it('should input text', () => {
    const props = { onCommentSubmit: () => {} };
    const wrapper = mount(<CommentForm {...props} />);

    wrapper.find({ placeholder: 'Say something...' })
      .simulate('change', { target: { value: 'text' } });
    assert(wrapper.state('text') === 'text');
  });

  it('should submit data', () => {
    let author = '';
    let text = '';
    let submitted = false;
    const props = {
      onCommentSubmit: (data) => {
        author = data.author;
        text = data.text;
        submitted = true;
      },
    };
    const wrapper = mount(<CommentForm {...props} />);

    // form is empty
    wrapper.find('form').simulate('submit');
    assert(!submitted);

    // after input author, text
    wrapper.setState({ author: 'author' });
    wrapper.setState({ text: 'text' });
    wrapper.find('form').simulate('submit');
    assert(submitted);
    assert(author === 'author');
    assert(text === 'text');
  });
});
