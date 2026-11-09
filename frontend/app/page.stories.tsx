import type { Meta, StoryObj } from "@storybook/nextjs";
import HomePage from "./page";

const meta = {
  title: "Foundation/Home page",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
