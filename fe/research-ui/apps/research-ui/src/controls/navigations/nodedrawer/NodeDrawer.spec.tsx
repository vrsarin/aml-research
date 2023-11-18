import { render } from '@testing-library/react';

import NodeDrawer from './NodeDrawer';

describe('NodeDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
