import React from 'react';
import { render } from '@testing-library/react';

import { AnimeCard } from './';

describe('AnimeCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnimeCard anime={{}} />);
    expect(baseElement).toBeTruthy();
  });
});
