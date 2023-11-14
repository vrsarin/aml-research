import type { Meta, StoryObj } from '@storybook/react';
import { Nodes } from './Nodes';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Nodes> = {
  component: Nodes,
  title: 'Nodes',
};
export default meta;
type Story = StoryObj<typeof Nodes>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Nodes!/gi)).toBeTruthy();
  },
};
