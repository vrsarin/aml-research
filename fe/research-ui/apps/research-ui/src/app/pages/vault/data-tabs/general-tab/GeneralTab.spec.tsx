import { render } from '@testing-library/react';

import GeneralTab from './GeneralTab';

describe('GeneralTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GeneralTab />);
    expect(baseElement).toBeTruthy();
  });
});
