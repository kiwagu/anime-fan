import React from 'react';
import { render } from '@testing-library/react';

import DeleteAllButton from './index';

describe('DeleteAllButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteAllButton />);
    expect(baseElement).toBeTruthy();
  });
});
