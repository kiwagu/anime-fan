import React from 'react';
import { render } from '@testing-library/react';

import NotFound from './';

describe('NotFound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotFound />);
    expect(baseElement).toBeTruthy();
  });
});
