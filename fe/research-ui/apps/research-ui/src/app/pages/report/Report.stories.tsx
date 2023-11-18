import type { Meta, StoryObj } from '@storybook/react';
import { Report } from './Report';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Report> = {
  component: Report,
  title: 'Report',
};
export default meta;
type Story = StoryObj<typeof Report>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Report!/gi)).toBeTruthy();
  },
};
