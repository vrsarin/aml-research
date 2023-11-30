import { render } from '@testing-library/react';

import RelationGraph from './RelationGraph';

describe('RelationGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RelationGraph />);
    expect(baseElement).toBeTruthy();
  });
});
