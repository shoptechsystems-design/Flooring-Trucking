export function ProjectGallerySection() {
  return (
    <section className="project-gallery-section section-pad" id="our-work" aria-labelledby="gallery-title">
      <div className="section-shell">
        <div className="gallery-intro section-heading-row">
          <div><p className="eyebrow"><span className="eyebrow-line" />Project gallery</p><h2 id="gallery-title">Real work deserves<br />a real <em>gallery.</em></h2></div>
          <p className="heading-aside">We’re saving this space for genuine Flooring For All project photos. No stock or illustrative images are presented as completed customer work.</p>
        </div>
        <div className="project-gallery-layout">
          <div className="project-gallery-stage" aria-hidden="true">
            <div className="gallery-stage-grid" />
            <div className="gallery-floor-slab gallery-floor-slab-back" />
            <div className="gallery-floor-slab gallery-floor-slab-front" />
            <div className="gallery-empty-card">
              <span className="gallery-empty-icon"><svg viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="28" rx="5" /><circle cx="18" cy="20" r="3" /><path d="m11 33 9-8 6 5 5-4 6 7" /></svg></span>
              <small>PROJECT GALLERY</small>
              <b>Awaiting real<br />project photos</b>
              <span>NO CUSTOMER IMAGES PUBLISHED</span>
            </div>
            <div className="gallery-stage-tag"><i />AUTHENTIC PROJECTS ONLY</div>
          </div>
          <div className="gallery-empty-copy">
            <span className="gallery-status">PORTFOLIO / READY FOR REAL JOBS</span>
            <h3>From tear-out<br />to <em>finished floors.</em></h3>
            <p>Project photos haven’t been supplied for publication yet. When approved images are available, this gallery can show real installs, removals and before/after details.</p>
            <ul className="gallery-service-tags"><li>LVP installation</li><li>Flooring removal</li><li>Subfloor preparation</li></ul>
            <a className="button button-dark" href="mailto:Lilman.bigvan@gmail.com?subject=Project%20gallery%20photos%20for%20Flooring%20For%20All">Share approved photos <span aria-hidden="true">↗</span></a>
            <small className="gallery-privacy-note">Attach only images the team has permission to publish.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedbackIcon({ freight = false }) {
  return freight
    ? <svg viewBox="0 0 48 48"><path d="M7 13h23v20H7zM30 20h7l5 6v7H30z" /><circle cx="16" cy="36" r="3" /><circle cx="36" cy="36" r="3" /><path d="M33 23v5h8" /></svg>
    : <svg viewBox="0 0 48 48"><path d="M9 11h30v21H22l-9 7v-7H9zM16 19h16M16 25h11" /></svg>;
}

export function CustomerReviewsSection() {
  return (
    <section className="customer-reviews-section section-pad" id="reviews" aria-labelledby="reviews-title">
      <div className="section-shell">
        <div className="reviews-intro section-heading-row">
          <div><p className="eyebrow"><span className="eyebrow-line" />Customer reviews</p><h2 id="reviews-title">Real feedback.<br /><em>No made-up stars.</em></h2></div>
          <p className="heading-aside">No customer review quotes have been supplied for publication yet. We’ll feature genuine words with permission—not invented ratings or filler.</p>
        </div>
        <div className="review-cards">
          <article className="review-card review-card-flooring">
            <div className="review-card-top"><span className="review-type">01 / FLOORING CUSTOMERS</span><span className="review-icon" aria-hidden="true"><FeedbackIcon /></span></div>
            <h3>Your flooring experience<br />belongs here.</h3>
            <p>No flooring review quote has been approved for this page yet. Real customer words will go here when they’re ready to share.</p>
            <div className="review-card-bottom"><span className="review-pending"><i />No review published</span><a className="review-action" href="mailto:Lilman.bigvan@gmail.com?subject=Flooring%20customer%20feedback">Share flooring feedback <span aria-hidden="true">↗</span></a></div>
          </article>
          <article className="review-card review-card-freight">
            <div className="review-card-top"><span className="review-type">02 / FREIGHT CUSTOMERS</span><span className="review-icon" aria-hidden="true"><FeedbackIcon freight /></span></div>
            <h3>Good service deserves<br />honest feedback.</h3>
            <p>No freight review quote has been approved for this page yet. We’ll keep this space for genuine shipper and delivery feedback.</p>
            <div className="review-card-bottom"><span className="review-pending"><i />No review published</span><a className="review-action" href="mailto:Nathanw.logistics@gmail.com?subject=Freight%20customer%20feedback">Share freight feedback <span aria-hidden="true">↗</span></a></div>
          </article>
        </div>
        <p className="reviews-integrity-note">Reviews are published only with permission. No star rating or review count is shown until real, approved feedback is available.</p>
      </div>
    </section>
  );
}

export function FinalCallToAction() {
  return (
    <section className="final-cta section-pad" id="contact" aria-labelledby="final-title">
      <div className="section-shell final-cta-inner">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />Start with the load</p>
        <h2 id="final-title">Need to move freight?<br /><em>Let’s talk.</em></h2>
        <p>Share your pickup, delivery, timing and equipment needs. For flooring work, use the separate estimate path below.</p>
        <div className="final-actions">
          <a className="button button-copper" href="#freight-form">Get a Freight Quote <span aria-hidden="true">↗</span></a>
          <a className="button button-light-outline" href="#flooring-form">Get a Free Flooring Estimate <span aria-hidden="true">↗</span></a>
        </div>
        <div className="contact-lines">
          <a href="tel:+18176784346">817-678-4346 · Freight</a><span aria-hidden="true">/</span>
          <a href="tel:+13369556193">336-955-6193 · Flooring</a><span className="contact-line-break" aria-hidden="true">—</span>
          <a href="mailto:Nathanw.logistics@gmail.com">Nathanw.logistics@gmail.com</a><a href="mailto:Lilman.bigvan@gmail.com">Lilman.bigvan@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
