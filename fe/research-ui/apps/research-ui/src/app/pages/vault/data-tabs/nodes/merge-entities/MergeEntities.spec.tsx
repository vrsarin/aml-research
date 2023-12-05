import { render } from '@testing-library/react';

import MergeEntities from './MergeEntities';

describe('MergeEntities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MergeEntities />);
    expect(baseElement).toBeTruthy();
  });
});
