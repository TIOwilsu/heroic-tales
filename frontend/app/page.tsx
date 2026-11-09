export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <p className="brand-name">Heroic Tales</p>
        <p className="brand-tagline">Every Hero Has a Story.</p>
      </header>

      <section className="hero-panel" aria-labelledby="hero-title">
        <p className="eyebrow">Character creation, guided by your imagination</p>
        <h1 id="hero-title">Every Hero Has a Story.</h1>
        <p className="hero-copy">
          Shape an original character story with thoughtful assistance while keeping every
          creative decision in your hands.
        </p>
        <div className="foundation-note" role="note">
          <strong>Foundation ready.</strong> The creation experience will be added in a later
          task.
        </div>
      </section>
    </main>
  );
}
