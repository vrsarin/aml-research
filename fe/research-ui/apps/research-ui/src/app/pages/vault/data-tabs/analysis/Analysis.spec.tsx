import { render } from '@testing-library/react';

import Analysis from './Analysis';

describe('Analysis', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Analysis />);
    expect(baseElement).toBeTruthy();
  });
});
