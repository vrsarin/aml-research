import { render } from '@testing-library/react';

import Nodes from './Nodes';

describe('Nodes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Nodes />);
    expect(baseElement).toBeTruthy();
  });
});
