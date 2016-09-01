import assert  from 'power-assert';
import { mount } from 'enzyme';
import React from 'react';

import CommentList from '../src/CommentList.jsx';

describe('<CommentList />', () => {
  it('should render comments', () => {
    const props = {
      data: [
        { author: 'John Smith', text: 'British', id: '1' },
        { author: 'Hans Schmidt', text: 'German', id: '2' },
      ],
    };
    const wrapper = mount(<CommentList {...props} />);

    const page = wrapper.html();
    assert(page.search('John Smith') > -1);
    assert(page.search('British') > -1);
    assert(page.search('Hans Schmidt') > -1);
    assert(page.search('German') > -1);
  });
});
