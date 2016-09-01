import assert  from 'power-assert';
import { mount } from 'enzyme';
import React from 'react';

import Comment from '../src/Comment.jsx';

describe('<Comment />', () => {
  it('should render comment', () => {
    const props = { author: 'John Smith', key: 'key' };
    const wrapper = mount(<Comment {...props}>this is a test</Comment>);

    const page = wrapper.html();
    assert(page.search('John Smith') > -1);
    assert(page.search('this is a test') > -1);
  });
});
