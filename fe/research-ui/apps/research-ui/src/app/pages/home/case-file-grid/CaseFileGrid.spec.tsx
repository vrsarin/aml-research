import { render } from '@testing-library/react';

import CaseFileGrid from './CaseFileGrid';

describe('CaseFileGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CaseFileGrid />);
    expect(baseElement).toBeTruthy();
  });
});
