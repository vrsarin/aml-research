import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from './portal';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Portal> = {
  component: Portal,
  title: 'Portal',
};
export default meta;
type Story = StoryObj<typeof Portal>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Portal!/gi)).toBeTruthy();
  },
};
