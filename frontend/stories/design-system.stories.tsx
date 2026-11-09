import type { Meta, StoryObj } from "@storybook/nextjs";

function DesignSystemReference() {
  return (
    <main style={{ padding: "2rem", background: "var(--old-parchment)", minHeight: "100vh" }}>
      <p className="eyebrow">Design system reference</p>
      <h1>Heroic Tales foundations</h1>
      <p className="hero-copy">
        Approved colors and typography roles are documented here before feature components are
        introduced.
      </p>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
          marginTop: "2rem",
        }}
      >
        {[
          ["Brand Background", "var(--brand-background)"],
          ["Antique Gold", "var(--antique-gold)"],
          ["Old Parchment", "var(--old-parchment)"],
          ["Royal Burgundy", "var(--royal-burgundy)"],
          ["Forest Green", "var(--forest-green)"],
        ].map(([name, color]) => (
          <div key={name} style={{ background: color, minHeight: "6rem", padding: "1rem" }}>
            <strong>{name}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}

const meta = {
  title: "Design System/Reference",
  component: DesignSystemReference,
  tags: ["autodocs"],
} satisfies Meta<typeof DesignSystemReference>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApprovedTokens: Story = {};
