import { render } from '@testing-library/react';

import EntityTypes from './EntityTypes';

describe('EntityTypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EntityTypes />);
    expect(baseElement).toBeTruthy();
  });
});
