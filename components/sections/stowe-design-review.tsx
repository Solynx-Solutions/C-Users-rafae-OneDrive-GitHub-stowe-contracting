'use client';

import Link from 'next/link';
import { StoweAssociations } from './stowe-associations';
import { StowePaverSignature } from './stowe-paver-signature';
import { ProjectGallery } from './stowe-project-gallery';
import { HomeHeroFilm } from './home-hero-film';

export function StoweDesignReview() {

  return (
    <div className="dr-page dr-cinematic">
      <a className="dr-skip" href="#stowe-main">Skip to content</a>

      <div id="stowe-main">
        <section className="dr-hero" aria-label="Stowe introduction">
          <div className="dr-film">
            <HomeHeroFilm showCaption={false} />
          </div>
          <div className="dr-hero-scrim" aria-hidden="true" />
          <div className="dr-intro">
            <p className="dr-kicker">STOWE CONTRACTING / MONTEREY BAY</p>
            <h1>Monterey built.<br /><em>Hardscape first.</em></h1>
            <p className="dr-lede">Paver driveways, outdoor spaces, and site-ready construction. A considered approach, from the ground up.</p>
            <div className="dr-actions">
              <Link className="dr-button" href="/contact#contact-form">Start a project <span aria-hidden="true">↗</span></Link>
              <a className="dr-text-link" href="#stowe-work">Explore our work <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <div className="dr-trust" aria-label="Company credentials">
          <span>MONTEREY BAY AREA</span>
          <span>SINCE 1987</span>
          <span>CA LICENSE 513674</span>
        </div>

        <section className="dr-section dr-statement">
          <p className="dr-kicker">01 / THE STOWE APPROACH</p>
          <div>
            <h2>Good work begins<br /><em>before the first stone.</em></h2>
            <p>Stowe Contracting was founded in 1987 by Gary and Debbie Stowe, after their military assignment at Fort Ord. From the beginning, the company was built on professionalism, integrity, and respect — for clients, for crews, and for the work itself.</p>
            <p>In 2004, Stowe Contracting added a grading division, extending the company’s reach beyond hardscape into site preparation and earthwork. Stowe owns its trucks and equipment, giving direct control over scheduling, quality, and the coordination that larger projects require.</p>
            <p>Planning, site preparation, and field coordination come together to shape outdoor spaces that belong to their surroundings.</p>
            <Link className="dr-text-link" href="/about">Get to know Stowe <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <StowePaverSignature />

        <section className="dr-section dr-work" id="stowe-work">
          <div className="dr-section-heading">
            <p className="dr-kicker">02 / A CLOSER LOOK</p>
            <h2>The difference<br /><em>is in the details.</em></h2>
          </div>
          <p className="dr-work-intro">Every project starts with materials chosen for the setting. From paver driveways and patios to retaining walls and site preparation, Stowe brings construction and hardscape experience together. Explore Belgard / Oldcastle paver options for your project.</p>
          <div className="dr-project-preview">
            <ProjectGallery featured />
            <Link className="dr-button dr-button-light" href="/projects">Explore all project photographs <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="dr-section dr-capabilities">
          <div className="dr-section-heading">
            <p className="dr-kicker">03 / CAPABILITIES</p>
            <h2>One project.<br /><em>A connected approach.</em></h2>
          </div>
          <div className="dr-service-grid">
            {[
              ['01', 'Kitchen & bath remodels', 'Interior remodeling for kitchens and bathrooms, built to the same standard as our exterior work.', '/services'],
              ['02', 'Custom homes', 'Ground-up construction for custom residences across the Monterey Bay area.', '/services'],
              ['03', 'Commercial tenant improvements', 'Build-outs and improvements for commercial tenant spaces.', '/services'],
              ['04', 'Paver driveways, patios & walkways', 'Belgard and Oldcastle paver systems, including permeable paver installations.', '/services'],
              ['05', 'Grading & site preparation', 'Grading, drainage, asphalt paving, and stackable retaining walls.', '/services'],
              ['06', 'Synthetic grass', 'Low-water, low-maintenance landscapes for residential and commercial sites.', '/services'],
            ].map(([n, title, body, url]) => (
              <Link className="dr-service" href={url} key={n}>
                <span className="dr-service-num">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="dr-section dr-process">
          <p className="dr-kicker">04 / MECHANICAL INSTALLATION</p>
          <div>
            <h2>Preparation.<br />Precision.<br /><em>A considered finish.</em></h2>
            <p>Stowe’s grading division, added in 2004, brought site preparation, drainage, and underground work in-house. People, equipment, and process — including Stowe’s own trucks and machinery — come together for larger hardscape scopes, from initial grading through the finished installation.</p>
            <Link className="dr-button dr-button-light" href="/mechanical-installation">See the installation approach <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="dr-section dr-turf">
          <p className="dr-kicker">05 / SYNTHETIC GRASS</p>
          <div>
            <h2>Less water.<br /><em>Less upkeep.</em></h2>
            <p>Synthetic grass reduces irrigation, mowing, and ongoing yard maintenance, which can mean real savings in water use and time over the life of a landscape.</p>
            <p>How long a synthetic lawn performs well depends on the product selected and how it’s cared for — we’ll walk through the options and what to expect for your site.</p>
            <Link className="dr-text-link" href="/contact#contact-form">Ask about synthetic grass <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="dr-section dr-materials">
          <p className="dr-kicker">06 / MATERIALS & PARTNERS</p>
          <div>
            <h2>Paver systems<br /><em>built to last.</em></h2>
            <p>Stowe installs paver systems from Belgard and Oldcastle, including permeable paver options for driveways, patios, and walkways.</p>
            <a className="dr-text-link" href="https://www.belgard.com/" target="_blank" rel="noopener noreferrer">Visit Belgard <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="dr-section dr-contact" id="stowe-contact">
          <p className="dr-kicker">07 / GET IN TOUCH</p>
          <div className="dr-contact-grid">
            <address className="dr-contact-address">
              <span>Stowe Contracting, Inc.</span>
              <span>3338 Paul Davis Drive</span>
              <span>Marina, CA 93933</span>
              <a href="tel:+18318840732">(831) 884-0732</a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=3338+Paul+Davis+Drive%2C+Marina%2C+CA+93933"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on map <span aria-hidden="true">↗</span>
              </a>
            </address>
            <div className="dr-contact-social">
              <a href="https://www.facebook.com/stowecontractinginc" target="_blank" rel="noopener noreferrer">Facebook <span aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/company/stowe-contracting-inc." target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <Link className="dr-button dr-button-light" href="/contact#contact-form">Tell us what you have in mind <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <StoweAssociations className="mx-auto max-w-6xl px-5 py-16 md:px-8" />

        <section className="dr-section dr-close">
          <p className="dr-kicker">YOUR PROJECT / OUR NEXT CONVERSATION</p>
          <h2>Let’s build<br /><em>something lasting.</em></h2>
          <Link className="dr-button" href="/contact#contact-form">Tell us what you have in mind <span aria-hidden="true">↗</span></Link>
        </section>
      </div>

      <style jsx global>{`
        .dr-project-preview { display: grid; gap: 2.5rem; }
        .dr-project-preview > :global(a) { justify-self: start; }
        .dr-original-projects { margin-top: 3rem; }
        .dr-original-projects h3 { font-size: clamp(1.75rem, 3vw, 2.5rem); }
        .dr-original-projects > p { max-width: 42rem; margin: 1rem 0 2rem; }
        .dr-original-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        .dr-original-grid figure { margin: 0; min-width: 0; }
        .dr-original-grid a { display: block; color: inherit; text-decoration: none; background: var(--stone-100); }
        .dr-original-grid a:focus-visible { outline: 3px solid var(--gold); outline-offset: 4px; }
        .dr-original-grid :global(img) { width: 100%; height: 260px; object-fit: contain; }
        .dr-enlarge { display: block; padding: .6rem .8rem; font-size: .8rem; }
        .dr-original-grid figcaption { padding-top: .6rem; font-size: .85rem; }
        @media (max-width: 899px) { .dr-original-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 599px) { .dr-original-grid { grid-template-columns: 1fr; } }

        .dr-page {
          --navy-950: #0b1420;
          --navy-900: #101d2c;
          --navy-800: #16283b;
          --stone-050: #f6f3ec;
          --stone-100: #ece7de;
          --stone-300: #d9d2c4;
          --stone-600: #6f6a5e;
          --ink: #16283b;
          --gold: #b08d57;
          background: var(--stone-050);
          color: var(--ink);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          line-height: 1.5;
        }
        .dr-page * { box-sizing: border-box; }
        .dr-page img { max-width: 100%; height: auto; display: block; }
        .dr-page h1, .dr-page h2, .dr-page h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
          color: inherit;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .dr-page em { font-style: italic; color: var(--gold); }

        .dr-skip {
          position: absolute;
          left: -9999px;
          top: 0;
          background: var(--navy-900);
          color: var(--stone-100);
          padding: 0.75rem 1rem;
          z-index: 100;
        }
        .dr-skip:focus {
          left: 0.5rem;
          top: 0.5rem;
        }

        .dr-review-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          background: rgba(16, 29, 44, 0.94);
          backdrop-filter: blur(6px);
          color: var(--stone-100);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
        }
        .dr-review-label { opacity: 0.7; }
        .dr-toggle { display: flex; gap: 0.5rem; }
        .dr-toggle-btn {
          font: inherit;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--stone-100);
          background: transparent;
          border: 1px solid rgba(236, 231, 222, 0.35);
          border-radius: 999px;
          padding: 0.4rem 0.85rem;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .dr-toggle-btn[aria-pressed='true'] {
          background: var(--stone-100);
          color: var(--navy-900);
          border-color: var(--stone-100);
        }
        .dr-toggle-btn:hover { border-color: var(--stone-100); }
        .dr-toggle-btn:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }
        .dr-recommended { opacity: 0.75; font-size: 0.62rem; }

        .dr-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--stone-600);
          margin: 0 0 0.9rem;
        }
        .dr-cinematic .dr-hero .dr-kicker { color: var(--stone-300); }

        .dr-hero {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .dr-film { width: 100%; background: var(--navy-950); }
        .dr-hero-scrim { display: none; }

        .dr-cinematic .dr-hero { display: block; }
        .dr-cinematic .dr-hero-scrim {
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(0deg, rgba(11,20,32,0.92) 0%, rgba(11,20,32,0.55) 32%, rgba(11,20,32,0.05) 60%, rgba(11,20,32,0) 100%);
        }
        .dr-cinematic .dr-intro {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 3rem 1.25rem 2.75rem;
          color: var(--stone-100);
          max-width: 44rem;
        }
        .dr-cinematic .dr-intro h1 { font-size: clamp(2.1rem, 5.2vw, 3.6rem); color: var(--stone-050); }
        .dr-cinematic .dr-lede { color: var(--stone-300); }

        .dr-editorial .dr-hero {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: var(--stone-050);
        }
        .dr-editorial .dr-intro {
          order: -1;
          position: static;
          padding: 3.5rem 1.25rem 2rem;
          max-width: 46rem;
          margin: 0 auto;
          text-align: left;
        }
        .dr-editorial .dr-intro h1 { font-size: clamp(2rem, 4.6vw, 3.1rem); color: var(--navy-900); }
        .dr-editorial .dr-lede { color: var(--stone-600); }
        .dr-editorial .dr-film { border-top: 1px solid var(--stone-300); border-bottom: 1px solid var(--stone-300); }

        .dr-lede {
          font-size: 1.05rem;
          max-width: 32rem;
          margin: 0 0 1.5rem;
        }
        .dr-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }

        .dr-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--stone-100);
          color: var(--navy-900);
          padding: 0.85rem 1.5rem;
          border-radius: 2px;
          font-size: 0.85rem;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .dr-button:hover { background: var(--stone-050); box-shadow: 0 6px 18px rgba(0,0,0,0.18); transform: translateY(-1px); }
        .dr-button:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
        .dr-button-light { background: var(--navy-900); color: var(--stone-100); }
        .dr-button-light:hover { background: var(--navy-800); }

        .dr-text-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-size: 0.9rem;
        }
        .dr-text-link:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        .dr-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.25rem 1rem;
          background: var(--navy-900);
          color: var(--stone-300);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
        }

        .dr-section {
          padding: 4.5rem 1.25rem;
          max-width: 72rem;
          margin: 0 auto;
        }
        .dr-section-heading { margin-bottom: 2.5rem; max-width: 40rem; }
        .dr-section-heading h2, .dr-statement h2, .dr-process h2, .dr-close h2 {
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
        }

        .dr-statement {
          display: grid;
          gap: 1.25rem;
          max-width: 44rem;
        }
        .dr-statement p { margin-bottom: 1.2rem; color: var(--stone-600); max-width: 34rem; }

        .dr-work-intro { color: var(--stone-600); max-width: 42rem; margin: 0 0 2rem; }

        .dr-wide-image { position: relative; margin: 0 0 1.5rem; }
        .dr-wide-image figcaption {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--stone-600);
          padding-top: 0.6rem;
        }
        .dr-image-pair { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
        .dr-image-pair figcaption { font-size: 0.72rem; letter-spacing: 0.08em; color: var(--stone-600); padding-top: 0.6rem; }

        .dr-service-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
        .dr-service {
          position: relative;
          display: block;
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          padding: 1.75rem;
          text-decoration: none;
          color: var(--ink);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .dr-service:hover { border-color: var(--navy-900); transform: translateY(-2px); }
        .dr-service:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
        .dr-service-num { display: block; font-size: 0.75rem; color: var(--stone-600); margin-bottom: 0.75rem; }
        .dr-service h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
        .dr-service p { margin: 0; color: var(--stone-600); font-size: 0.92rem; }
        .dr-service b { position: absolute; top: 1.5rem; right: 1.5rem; font-weight: 400; color: var(--stone-600); }

        .dr-process {
          background: var(--navy-900);
          color: var(--stone-100);
          max-width: none;
          padding: 5rem 1.25rem;
        }
        .dr-process > div { max-width: 40rem; margin: 0 auto; }
        .dr-process p { color: var(--stone-300); margin: 1.25rem 0 2rem; }
        .dr-process .dr-kicker { color: var(--stone-300); }

        .dr-turf, .dr-materials {
          display: grid;
          gap: 1.25rem;
          max-width: 44rem;
        }
        .dr-turf p, .dr-materials p { color: var(--stone-600); max-width: 34rem; }

        .dr-contact-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }
        .dr-contact-address {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-style: normal;
          color: var(--stone-600);
        }
        .dr-contact-address span:first-child {
          color: var(--ink);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 1.1rem;
        }
        .dr-contact-address a {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .dr-contact-social {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
        }
        .dr-contact-social a {
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .dr-contact-social .dr-button-light { color: var(--stone-100); text-decoration: none; }

        .dr-resources h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); margin-bottom: 1rem; }
        .dr-resources p { color: var(--stone-600); max-width: 40rem; }
        .dr-resource-list {
          list-style: none;
          margin: 1.25rem 0;
          padding: 0;
          display: grid;
          gap: 0.6rem;
        }
        .dr-resource-list a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
        .dr-resource-note { font-size: 0.78rem; color: var(--stone-600); }

        .dr-close {
          text-align: center;
          padding-top: 5rem;
          padding-bottom: 6rem;
        }
        .dr-close h2 { margin-bottom: 2rem; }
        .dr-close .dr-kicker { text-align: center; }

        @media (min-width: 768px) {
          .dr-image-pair { grid-template-columns: 1fr 1fr; }
          .dr-service-grid { grid-template-columns: repeat(3, 1fr); }
          .dr-section { padding: 6rem 2rem; }
          .dr-cinematic .dr-intro { padding: 3rem 3rem 6rem; }
          .dr-editorial .dr-intro { padding: 4.5rem 2rem 2.5rem; }
          .dr-contact-grid { grid-template-columns: 1fr 1fr; align-items: start; }
        }

        @media (min-width: 1024px) {
          .dr-statement { grid-template-columns: 1fr; }
        }

        @media (max-width: 767px) {
          .dr-cinematic .dr-hero-scrim { display: none; }
          .dr-cinematic .dr-intro {
            position: static;
            padding: 2rem 1.25rem 2.5rem;
            max-width: none;
            color: var(--ink);
            background: var(--stone-050);
          }
          .dr-cinematic .dr-intro h1 { color: var(--navy-900); }
          .dr-cinematic .dr-lede { color: var(--stone-600); }
          .dr-cinematic .dr-hero .dr-kicker { color: var(--stone-600); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dr-button, .dr-service, .dr-toggle-btn { transition: none; }
        }
      `}</style>
    </div>
  );
}

