import { render } from '@testing-library/react';

import AddNote from './AddNote';

describe('AddNote', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddNote />);
    expect(baseElement).toBeTruthy();
  });
});
