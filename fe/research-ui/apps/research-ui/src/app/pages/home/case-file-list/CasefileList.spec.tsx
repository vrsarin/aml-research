import { render } from '@testing-library/react';

import CasefileList from './CasefileList';

describe('CasefileList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CasefileList />);
    expect(baseElement).toBeTruthy();
  });
});
