import React from 'react';

export const StudioBio: React.FC = () => {
  return (
    <section id="manifesto" className="studio-manifesto-section">
      <div className="container">
        <div className="manifesto-layout">
          {/* Left Column: Serif Quote Statement */}
          <div className="manifesto-quote-block">
            <div>
              <div className="section-tag" style={{ marginBottom: '16px' }}>
                Studio Manifesto &middot; Perspective
              </div>

              <blockquote className="manifesto-serif-quote">
                &ldquo;We document the <span>unspoken cadence</span> of modern culture &mdash; distilling raw humanity into <span>uncompromising</span> visual cinema.&rdquo;
              </blockquote>
            </div>

            <div className="caption-meta" style={{ marginTop: '32px' }}>
              PlusNine Creative House &mdash; Edmonton / Global
            </div>
          </div>

          {/* Right Column: Editorial Bio & Specs */}
          <div className="manifesto-details-block">
            <p className="manifesto-paragraph">
              <strong>PlusNine</strong> operates as an independent creative development house, film production studio, and cultural magazine. Rooted in cinematic experimentation and community-driven storytelling, we craft original narrative films, high-fashion editorials, music visuals, and collaborative publications.
            </p>

            <p className="manifesto-paragraph">
              Through collaborative milestones like the <strong>Vernacular &ldquo;As We Are&rdquo;</strong> issue, we explore the quiet dignity and vibrant textures of the diaspora. Our process merges bespoke 3D identity, narrative exploration, and deliberate soundscapes.
            </p>

            {/* Studio Capabilities / Specs */}
            <div className="manifesto-specs-grid">
              <div>
                <div className="spec-item__label">Disciplines</div>
                <div className="spec-item__value">Directing &middot; Film</div>
                <div className="spec-item__value">Creative Direction</div>
                <div className="spec-item__value">Editorial Design</div>
              </div>


              <div>
                <div className="spec-item__label">Locations</div>
                <div className="spec-item__value">Edmonton, Canada</div>
                <div className="spec-item__value">Montreal &middot; London</div>
                <div className="spec-item__value">Worldwide Inquiries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
