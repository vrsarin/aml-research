import { render } from '@testing-library/react';

import RelationTable from './RelationTable';

describe('RelationTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RelationTable />);
    expect(baseElement).toBeTruthy();
  });
});
