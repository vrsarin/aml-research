import type { Meta, StoryObj } from '@storybook/react';
import { Graph } from './Graph';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Graph> = {
  component: Graph,
  title: 'Graph',
};
export default meta;
type Story = StoryObj<typeof Graph>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Graph!/gi)).toBeTruthy();
  },
};
