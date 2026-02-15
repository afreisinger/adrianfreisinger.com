import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  position: relative;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--medium-gray);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--light-gray);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    color: var(--dark-gray);
  }

  .hero-item {
    opacity: 1; /* Visible by default for SSR */
    @media (prefers-reduced-motion: no-preference) {
      animation: ${fadeUp} 600ms var(--easing) both;
    }
  }

  .down_arrow {
    display: none;
    position: absolute;
    bottom: 30px;
    right: 20px;
    width: 30px;
    height: 30px;
    color: var(--light-gray) !important;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const TEXTS = [
  'Automation Freak',
  'Building in Public',
  'Product Enthusiast',
  'Aspiring AI Engineer',
  'Content Creator',
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const intervalId = setInterval(
      () => setIndex(prevIndex => (prevIndex + 1) % TEXTS.length),
      3000,
    );
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const items = [
    <h1>Hi, my name is</h1>,
    <h2 className="big-heading">Adrián Freisinger</h2>,
    <h3 className="medium-heading">
      <span>{TEXTS[index]}</span>
    </h3>,
    <p>
      I’m an Electronic Engineer, passionate programmer from Argentina specializing in building
      exceptional digital experiences. Currently, I work on open-source video platforms and
      AI-powered bots.
    </p>,
  ];

  return (
    <StyledHeroSection>
      {items.map((item, i) => (
        <div 
          key={i} 
          className="hero-item" 
          style={{ animationDelay: `${(i + 1) * 100}ms` }}
        >
          {item}
        </div>
      ))}
      <Link className="down_arrow" to="#featured-posts">
        <Icon className="detail__item__icon" name="DownArrow" />
      </Link>
    </StyledHeroSection>
  );
};

export default Hero;
