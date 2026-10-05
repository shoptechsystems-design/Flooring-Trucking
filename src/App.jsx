import { useCallback, useEffect, useRef, useState } from 'react';
import { SiteFooter, SiteHeader, MobileActions } from './components/SiteChrome.jsx';
import {
  EquipmentSection,
  FreightServicesSection,
  HeroSection,
  ProcessSection,
  ServiceAreaSection,
} from './components/Transportation.jsx';
import { FreightQuoteSection, FlooringQuoteSection } from './components/QuoteForms.jsx';
import { FlooringServicesSection, FlooringVisualizer } from './components/Flooring.jsx';
import { CustomerReviewsSection, FinalCallToAction, ProjectGallerySection } from './components/ProofSections.jsx';

const formatArea = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(Math.round(value * 10) / 10);

function usePageInteractions() {
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress span');
    let progressQueued = false;
    const updateProgress = () => {
      if (progressBar) {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const amount = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
        progressBar.style.transform = `scaleX(${amount})`;
      }
      progressQueued = false;
    };
    const queueProgress = () => {
      if (progressQueued) return;
      progressQueued = true;
      window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', queueProgress, { passive: true });
    updateProgress();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let revealObserver;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const revealTargets = document.querySelectorAll(
        '.section-heading, .service-card, .flooring-feature, .quote-intro, .lead-form, .freight-showcase, .vehicle-card, .why-card, .process-track, .process-timeline, .project-gallery-layout, .review-group, .area-copy, .area-map, .final-cta-inner'
      );
      revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
      revealTargets.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
        revealObserver.observe(element);
      });
    }

    const supportsFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const tiltedCards = !prefersReducedMotion && supportsFineHover
      ? Array.from(document.querySelectorAll('.service-card, .vehicle-card'))
      : [];
    const tilt = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(1100px) translateY(-5px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    };
    const resetTilt = (event) => { event.currentTarget.style.transform = ''; };
    tiltedCards.forEach((card) => {
      card.addEventListener('pointermove', tilt);
      card.addEventListener('pointerleave', resetTilt);
    });

    return () => {
      window.removeEventListener('scroll', queueProgress);
      window.removeEventListener('resize', queueProgress);
      revealObserver?.disconnect();
      tiltedCards.forEach((card) => {
        card.removeEventListener('pointermove', tilt);
        card.removeEventListener('pointerleave', resetTilt);
        card.style.transform = '';
      });
    };
  }, []);
}

export default function App() {
  const flooringFormRef = useRef(null);
  const previousVisualizerSummary = useRef('');
  const [flooringFields, setFlooringFields] = useState({ area: '', message: '' });

  usePageInteractions();

  const handleFlooringFieldChange = useCallback((name, value) => {
    setFlooringFields((current) => ({
      ...current,
      [name === 'Approximate Square Footage' ? 'area' : 'message']: value,
    }));
  }, []);

  const handleUseEstimate = useCallback((estimate) => {
    const coverageLine = estimate.coverage && estimate.coverageValid
      ? ` Product coverage entered: ${formatArea(estimate.coverage)} sq ft per carton (${estimate.cartons} cartons estimated).`
      : estimate.coverageValid
        ? ' Carton count not calculated because product coverage was not entered.'
        : ' Carton count not calculated; verify the product coverage value first.';
    const summary = `Flooring visualizer planning notes (not a quote): ${estimate.length} ft × ${estimate.width} ft = ${formatArea(estimate.roomArea)} sq ft room area; ${estimate.waste}% allowance = ${formatArea(estimate.plannedArea)} sq ft to plan. Selected illustrative tone: ${estimate.tone}.${coverageLine}`;
    const priorSummary = previousVisualizerSummary.current;
    const currentMessage = flooringFields.message.trim();
    const remainingMessage = priorSummary && currentMessage.startsWith(priorSummary)
      ? currentMessage.slice(priorSummary.length).trim()
      : currentMessage;
    const plannedWholeSquareFeet = Math.ceil(estimate.plannedArea - Number.EPSILON * Math.max(1, estimate.plannedArea));

    previousVisualizerSummary.current = summary;
    setFlooringFields({
      area: String(plannedWholeSquareFeet),
      message: remainingMessage ? `${summary}\n\n${remainingMessage}` : summary,
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    flooringFormRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => flooringFormRef.current?.querySelector('[name="Message"]')?.focus({ preventScroll: true }), prefersReducedMotion ? 0 : 450);
  }, [flooringFields.message]);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <CustomerReviewsSection />
        <EquipmentSection />
        <FreightServicesSection />
        <ProcessSection />
        <ServiceAreaSection />
        <FreightQuoteSection />
        <FlooringServicesSection />
        <FlooringVisualizer onUseEstimate={handleUseEstimate} />
        <FlooringQuoteSection
          formRef={flooringFormRef}
          flooringFields={flooringFields}
          onFlooringFieldChange={handleFlooringFieldChange}
        />
        <ProjectGallerySection />
        <FinalCallToAction />
      </main>
      <SiteFooter />
      <MobileActions />
    </>
  );
}
