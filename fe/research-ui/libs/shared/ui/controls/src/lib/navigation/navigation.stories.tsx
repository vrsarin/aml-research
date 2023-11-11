import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './navigation';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  title: 'Navigation',
};
export default meta;
type Story = StoryObj<typeof Navigation>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Navigation!/gi)).toBeTruthy();
  },
};
