import { render } from '@testing-library/react';

import Topbar from './Topbar';

describe('Topbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Topbar />);
    expect(baseElement).toBeTruthy();
  });
});
