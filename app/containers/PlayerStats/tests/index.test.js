import React from 'react';
import { shallow } from 'enzyme';

import SocialAdmin from '../index';

describe('<SocialAdmin />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(<SocialAdmin />);
    expect(renderedComponent.contains(<div className="social-admin"></div>)).toBe(true);
  });
});
