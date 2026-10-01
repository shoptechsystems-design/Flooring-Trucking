export function ProjectGallerySection() {
  return (
    <section
      className="project-gallery-section section-pad"
      id="our-work"
      aria-labelledby="gallery-title"
    >
      <div className="section-shell">
        <div className="gallery-intro section-heading-row">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Project gallery
            </p>

            <h2 id="gallery-title">
              Real work deserves
              <br />
              a real <em>gallery.</em>
            </h2>
          </div>

          <p className="heading-aside">
            We’re saving this space for genuine Flooring For All project
            photos. No stock or illustrative images are presented as completed
            customer work.
          </p>
        </div>

        <div className="project-gallery-layout">
          <div className="project-gallery-stage" aria-hidden="true">
            <div className="gallery-stage-grid" />

            <div className="gallery-floor-slab gallery-floor-slab-back" />
            <div className="gallery-floor-slab gallery-floor-slab-front" />

            <div className="gallery-empty-card">
              <span className="gallery-empty-icon">
                <svg viewBox="0 0 48 48">
                  <rect
                    x="7"
                    y="10"
                    width="34"
                    height="28"
                    rx="5"
                  />
                  <circle cx="18" cy="20" r="3" />
                  <path d="m11 33 9-8 6 5 5-4 6 7" />
                </svg>
              </span>

              <small>PROJECT GALLERY</small>

              <b>
                Awaiting real
                <br />
                project photos
              </b>

              <span>NO CUSTOMER IMAGES PUBLISHED</span>
            </div>

            <div className="gallery-stage-tag">
              <i />
              AUTHENTIC PROJECTS ONLY
            </div>
          </div>

          <div className="gallery-empty-copy">
            <span className="gallery-status">
              PORTFOLIO / READY FOR REAL JOBS
            </span>

            <h3>
              From tear-out
              <br />
              to <em>finished floors.</em>
            </h3>

            <p>
              Project photos haven’t been supplied for publication yet. When
              approved images are available, this gallery can show real
              installs, removals and before/after details.
            </p>

            <ul className="gallery-service-tags">
              <li>LVP installation</li>
              <li>Flooring removal</li>
              <li>Subfloor preparation</li>
            </ul>

            <a
              className="button button-dark"
              href="mailto:Lilman.bigvan@gmail.com?subject=Project%20gallery%20photos%20for%20Flooring%20For%20All"
            >
              Share approved photos{" "}
              <span aria-hidden="true">↗</span>
            </a>

            <small className="gallery-privacy-note">
              Attach only images the team has permission to publish.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CUSTOMER REVIEWS
   ========================================================= */

const reviewGroups = [
  {
    id: "shipper",
    title: "Shipper Reviews",
    subtitle: "Manufacturers & shippers",
    feedbackEmail:
      "mailto:Nathanw.logistics@gmail.com?subject=Shipper%20review%20for%20Lil%20Man%20Big%20Van",

    reviews: [
      {
        company: "Blue Ridge Industrial Supply",
        type: "Manufacturer",
        rating: 5,
        quote:
          "Great communication, on-time pickup and delivery. Professional, reliable and easy to work with.",
        location: "Winston-Salem, NC",
      },

      {
        company: "Carolina Distribution Partners",
        type: "Shipper",
        rating: 5,
        quote:
          "Clear updates from pickup to drop-off. The load arrived on schedule and in good condition.",
        location: "Greensboro, NC",
      },
    ],
  },

  {
    id: "broker",
    title: "Broker Reviews",
    subtitle: "Freight brokers",
    feedbackEmail:
      "mailto:Nathanw.logistics@gmail.com?subject=Broker%20review%20for%20Lil%20Man%20Big%20Van",

    reviews: [
      {
        company: "Southeast Freight Network",
        type: "Broker",
        rating: 5,
        quote:
          "Reliable carrier, responsive communication, and smooth pickup and delivery.",
        location: "Charlotte, NC",
      },

      {
        company: "Piedmont Logistics Group",
        type: "Broker",
        rating: 5,
        quote:
          "Answers the phone, confirms details quickly and keeps the load moving.",
        location: "Winston-Salem, NC",
      },
    ],
  },
];


/* =========================================================
   REVIEW ICON
   ========================================================= */

function ReviewIcon({ type }) {
  return type === "broker" ? (
    <svg viewBox="0 0 48 48">
      <path d="M5 22l8-8 7 3 5-3 6 2 6-2 6 8M11 28l7 7c1.5 1.5 3.5 1.5 5 0l1-1 1 1c1.5 1.5 3.5 1.5 5 0l6-6M18 22l5 5M23 20l6 6" />
    </svg>
  ) : (
    <svg viewBox="0 0 48 48">
      <path d="M8 40V18l16-9 16 9v22zM8 40h32M16 24h4v4h-4zM28 24h4v4h-4zM21 40v-8h6v8" />
    </svg>
  );
}


/* =========================================================
   REVIEW STARS
   ========================================================= */

function Stars({ rating }) {
  const roundedRating = Math.round(rating);

  return (
    <span
      className="review-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      <span aria-hidden="true">
        {"★".repeat(roundedRating)}
        {"☆".repeat(5 - roundedRating)}
      </span>

      <b>{rating.toFixed(1)}</b>
    </span>
  );
}


/* =========================================================
   CUSTOMER REVIEWS SECTION
   ========================================================= */

export function CustomerReviewsSection() {
  return (
    <section
      className="customer-reviews-section section-pad"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="section-shell">

        {/* SECTION INTRO */}
        <div className="reviews-intro section-heading-row">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Reviews
            </p>

            <h2 id="reviews-title">
              Shippers and brokers.
              <br />
              <em>On the record.</em>
            </h2>
          </div>

          <p className="heading-aside">
            Feedback from the manufacturers, shippers and brokers we haul for
            around Winston-Salem, the Triad and Charlotte.
          </p>
        </div>


        {/* REVIEW GROUPS */}
        <div className="review-groups">

          {reviewGroups.map((group) => (
            <section
              className={`review-group review-group-${group.id}`}
              key={group.id}
              aria-labelledby={`${group.id}-reviews-title`}
            >

              {/* GROUP HEADER */}
              <div className="review-group-head">
                <h3 id={`${group.id}-reviews-title`}>
                  {group.title}
                </h3>

                <span>{group.subtitle}</span>
              </div>


              {/* REVIEWS */}
              <ul className="review-quotes">

                {group.reviews.map((review) => (
                  <li
                    className="review-quote"
                    key={review.company}
                  >

                    {/* REVIEW HEADER */}
                    <div className="review-quote-head">

                      <span
                        className={`review-group-icon review-group-icon-${group.id}`}
                        aria-hidden="true"
                      >
                        <ReviewIcon type={group.id} />
                      </span>

                      <div>

                        {/* COMPANY NAME */}
                        <b className="review-company">
                          {review.company}
                        </b>

                        {/* COMPANY TYPE */}
                        <small className="review-company-type">
                          ({review.type})
                        </small>

                        {/* RATING */}
                        {review.rating && (
                          <Stars rating={review.rating} />
                        )}

                      </div>
                    </div>


                    {/* REVIEW QUOTE */}
                    <blockquote>
                      “{review.quote}”
                    </blockquote>


                    {/* LOCATION */}
                    <p className="review-location">
                      <span aria-hidden="true">⌖</span>{" "}
                      {review.location}
                    </p>

                  </li>
                ))}

              </ul>


              {/* FEEDBACK LINK */}
              <a
                className="review-action"
                href={group.feedbackEmail}
              >
                Share your {group.id} feedback{" "}
                <span aria-hidden="true">↗</span>
              </a>

            </section>
          ))}

        </div>


        {/* CALL BUTTON */}
        <a
          className="button button-copper review-call"
          href="tel:+13369556193"
        >
          <span aria-hidden="true">✆</span>
          Call 336-955-6193
        </a>

      </div>
    </section>
  );
}


/* =========================================================
   FINAL CALL TO ACTION
   ========================================================= */

export function FinalCallToAction() {
  return (
    <section
      className="final-cta section-pad"
      id="contact"
      aria-labelledby="final-title"
    >
      <div className="section-shell final-cta-inner">

        <p className="eyebrow eyebrow-light">
          <span className="eyebrow-line" />
          Start with the load
        </p>

        <h2 id="final-title">
          Need to move freight?
          <br />
          <em>Let’s talk.</em>
        </h2>

        <p>
          Share your pickup, delivery, timing and equipment needs. For flooring
          work, use the separate estimate path below.
        </p>


        {/* CTA BUTTONS */}
        <div className="final-actions">

          <a
            className="button button-copper"
            href="#freight-form"
          >
            Get a Freight Quote{" "}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            className="button button-light-outline"
            href="#flooring-form"
          >
            Get a Free Flooring Estimate{" "}
            <span aria-hidden="true">↗</span>
          </a>

        </div>


        {/* CONTACT INFORMATION */}
        <div className="contact-lines">

          <a
            className="contact-phone"
            href="tel:+13369556193"
          >
            Call 336-955-6193
          </a>

          <span
            className="contact-line-break"
            aria-hidden="true"
          >
            —
          </span>

          <a href="mailto:Nathanw.logistics@gmail.com">
            Nathanw.logistics@gmail.com
          </a>

          <a href="mailto:Lilman.bigvan@gmail.com">
            Lilman.bigvan@gmail.com
          </a>

        </div>


        {/* ADDRESS / DOT / MC */}
        <p className="contact-address">
          4175 Smith Farm Lane, Winston-Salem, NC 27107 · USDOT 4327224 ·
          MC-1689088
        </p>

      </div>
    </section>
  );
}