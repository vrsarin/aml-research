import type { Meta, StoryObj } from '@storybook/react';
import { Vault } from './Vault';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Vault> = {
  component: Vault,
  title: 'Vault',
};
export default meta;
type Story = StoryObj<typeof Vault>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Vault!/gi)).toBeTruthy();
  },
};
