import { render } from '@testing-library/react';

import Vault from './Vault';

describe('Vault', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Vault />);
    expect(baseElement).toBeTruthy();
  });
});
