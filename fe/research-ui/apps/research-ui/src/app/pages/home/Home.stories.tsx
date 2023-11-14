import type { Meta, StoryObj } from '@storybook/react';
import { Home } from './Home';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Home> = {
  component: Home,
  title: 'Home',
};
export default meta;
type Story = StoryObj<typeof Home>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Home!/gi)).toBeTruthy();
  },
};
