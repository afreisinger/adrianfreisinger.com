import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import TextTransition, { presets } from 'react-text-transition';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  /* min-height: 100vh;
  height: 100vh; */
  padding: 0;
  position: relative;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  @media (max-width: 768px) {
    /* height: auto; */
    /* min-height: auto; */
    padding: auto;
    /* padding-top: 10rem; */
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
    /* max-width: 540px; */
    color: var(--dark-gray);
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

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const TEXTS = [
  'Automation Freak',
  'Building in Public',
  'Product Enthusiast',
  'Aspiring AI Engineer',
  'Content Creator',
];

// const styledDown = styled

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Adrián Freisinger</h2>;
  const three = (
    <h3 className="medium-heading">
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h3>
  );

  const four = (
    <>
      {/* <p>
        I'm a software engineer specializing in building exceptional digital experiences. Currently,
        I'm working on digitize health records of users to make it easier, seamless and secure for
        them to view and share their medical history at{' '}
        <a href="https://research.samsung.com/sri-n" target="_blank" rel="noreferrer">
          Samsung R&D
        </a>
      </p> */}
      <p>
        I’m an Electronic Engineer, passionate programmer from Argentina specializing in building
        exceptional digital experiences. Currently, I work on open-source video platforms and
        AI-powered bots.
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection style={{ height: height }}>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
          <Link className="down_arrow" to="#featured-posts">
            <Icon className="detail__item__icon" name="DownArrow" />
          </Link>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
