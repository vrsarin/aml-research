import { render } from '@testing-library/react';

import CreateCaseFile from './CreateCaseFile';

describe('CreateCaseFile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCaseFile />);
    expect(baseElement).toBeTruthy();
  });
});
