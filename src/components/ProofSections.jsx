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

// Placeholder testimonials until the client supplies genuine, approved reviews.
// To publish a real review: fill in `company` and `rating` (1–5), update the quote,
// and set `placeholder: false`. Stars and the company name only show for real reviews.
const reviewGroups = [
  {
    id: 'shipper',
    title: 'Shipper Reviews',
    subtitle: 'Manufacturers & shippers',
    feedbackEmail: 'mailto:Nathanw.logistics@gmail.com?subject=Shipper%20review%20for%20Lil%20Man%20Big%20Van',
    reviews: [
      { company: '', type: 'Manufacturer', rating: null, quote: 'Great communication, on-time pickup and delivery. Professional, reliable and easy to work with.', location: 'Winston-Salem, NC', placeholder: true },
      { company: '', type: 'Shipper', rating: null, quote: 'Clear updates from pickup to drop-off. The load arrived on schedule and in good condition.', location: 'Greensboro, NC', placeholder: true },
    ],
  },
  {
    id: 'broker',
    title: 'Broker Reviews',
    subtitle: 'Freight brokers',
    feedbackEmail: 'mailto:Nathanw.logistics@gmail.com?subject=Broker%20review%20for%20Lil%20Man%20Big%20Van',
    reviews: [
      { company: '', type: 'Broker', rating: null, quote: 'Reliable carrier, responsive communication, and smooth pickup and delivery.', location: 'Charlotte, NC', placeholder: true },
      { company: '', type: 'Broker', rating: null, quote: 'Answers the phone, confirms details quickly and keeps the load moving.', location: 'Winston-Salem, NC', placeholder: true },
    ],
  },
];

// Mock reviews for previewing the design locally. These render ONLY in the local dev
// server (`pnpm dev`) — never in the prerendered HTML or the production build — so no
// invented review is ever published. Replace `reviewGroups` with real reviews to go live.
const SHOW_MOCK_REVIEWS = import.meta.env.DEV && !import.meta.env.SSR;

const mockReviewGroups = [
  {
    ...reviewGroups[0],
    reviews: [
      { company: 'Triad Manufacturing Co.', type: 'Manufacturer', rating: 5, quote: 'Great communication, on-time pickup and delivery. Professional, reliable and easy to work with. Highly recommend!', location: 'Winston-Salem, NC', placeholder: false },
      { company: 'Piedmont Supply Group', type: 'Shipper', rating: 5, quote: 'Clear updates from pickup to drop-off. The load arrived on schedule and in good condition.', location: 'Greensboro, NC', placeholder: false },
    ],
  },
  {
    ...reviewGroups[1],
    reviews: [
      { company: 'Carolina Freight Solutions', type: 'Broker', rating: 5, quote: 'Reliable carrier, responsive communication, and smooth pickup and delivery. Will definitely work with again.', location: 'Charlotte, NC', placeholder: false },
      { company: 'Queen City Logistics', type: 'Broker', rating: 5, quote: 'Answers the phone, confirms details quickly and keeps the load moving.', location: 'Charlotte, NC', placeholder: false },
    ],
  },
];

function ReviewIcon({ type }) {
  return type === 'broker'
    ? <svg viewBox="0 0 48 48"><path d="M5 22l8-8 7 3 5-3 6 2 6-2 6 8M11 28l7 7c1.5 1.5 3.5 1.5 5 0l1-1 1 1c1.5 1.5 3.5 1.5 5 0l6-6M18 22l5 5M23 20l6 6" /></svg>
    : <svg viewBox="0 0 48 48"><path d="M8 40V18l16-9 16 9v22zM8 40h32M16 24h4v4h-4zM28 24h4v4h-4zM21 40v-8h6v8" /></svg>;
}

function Stars({ rating }) {
  return (
    <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
      <b>{rating.toFixed(1)}</b>
    </span>
  );
}

export function CustomerReviewsSection() {
  return (
    <section className="customer-reviews-section section-pad" id="reviews" aria-labelledby="reviews-title">
      <div className="section-shell">
        <div className="reviews-intro section-heading-row">
          <div><p className="eyebrow"><span className="eyebrow-line" />Reviews</p><h2 id="reviews-title">Shippers and brokers.<br /><em>On the record.</em></h2></div>
          <p className="heading-aside">Feedback from the manufacturers, shippers and brokers we haul for around Winston-Salem, the Triad and Charlotte.</p>
        </div>
        {SHOW_MOCK_REVIEWS && <p className="mock-reviews-note">Mock review data · local preview only · not shown on the live site</p>}
        <div className="review-groups">
          {(SHOW_MOCK_REVIEWS ? mockReviewGroups : reviewGroups).map((group) => (
            <section className={`review-group review-group-${group.id}`} key={group.id} aria-labelledby={`${group.id}-reviews-title`}>
              <div className="review-group-head">
                <h3 id={`${group.id}-reviews-title`}>{group.title}</h3>
                <span>{group.subtitle}</span>
              </div>
              <ul className="review-quotes">
                {group.reviews.map((review) => (
                  <li className={`review-quote${review.placeholder ? ' is-placeholder' : ''}`} key={review.quote}>
                    <div className="review-quote-head">
                      <span className={`review-group-icon review-group-icon-${group.id}`} aria-hidden="true"><ReviewIcon type={group.id} /></span>
                      <div>
                        <b className="review-company">{review.placeholder ? 'Placeholder testimonial' : review.company}</b>
                        <small className="review-company-type">({review.type})</small>
                        {!review.placeholder && review.rating && <Stars rating={review.rating} />}
                      </div>
                    </div>
                    <blockquote>“{review.quote}”</blockquote>
                    <p className="review-location"><span aria-hidden="true">⌖</span> {review.location}</p>
                  </li>
                ))}
              </ul>
              <a className="review-action" href={group.feedbackEmail}>Share your {group.id} feedback <span aria-hidden="true">↗</span></a>
            </section>
          ))}
        </div>
        <a className="button button-copper review-call" href="tel:+13369556193"><span aria-hidden="true">✆</span> Call 336-955-6193</a>
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
          <a className="contact-phone" href="tel:+13369556193">Call 336-955-6193</a><span className="contact-line-break" aria-hidden="true">—</span>
          <a href="mailto:Nathanw.logistics@gmail.com">Nathanw.logistics@gmail.com</a><a href="mailto:Lilman.bigvan@gmail.com">Lilman.bigvan@gmail.com</a>
        </div>
        <p className="contact-address">4175 Smith Farm Lane, Winston-Salem, NC 27107 · USDOT 4327224 · MC-1689088</p>
      </div>
    </section>
  );
}
