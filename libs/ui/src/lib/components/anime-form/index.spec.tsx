import React from 'react';
import { render } from '@testing-library/react';

import AnimeForm from './index';

describe('AnimeForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnimeForm />);
    expect(baseElement).toBeTruthy();
  });
});
