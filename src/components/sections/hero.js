import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { loaderDelay } from '@utils';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

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

  @media (max-width: 768px) {
    padding: auto;
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

  /* Fade up animation for SSR-friendly rendering */
  @media (prefers-reduced-motion: no-preference) {
    .fadeup-enter {
      opacity: 0.01;
      transform: translateY(20px);
    }
    .fadeup-enter-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 600ms var(--easing), transform 600ms var(--easing);
    }
    .fadeup-appear {
      opacity: 0.01;
      transform: translateY(20px);
    }
    .fadeup-appear-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 600ms var(--easing), transform 600ms var(--easing);
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
  const revealRefs = useRef([]);

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

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Adrián Freisinger</h2>;
  const three = (
    <h3 className="medium-heading">
      <span>{TEXTS[index]}</span>
    </h3>
  );

  const four = (
    <p>
      I’m an Electronic Engineer, passionate programmer from Argentina specializing in building
      exceptional digital experiences. Currently, I work on open-source video platforms and
      AI-powered bots.
    </p>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        items.map((item, i) => <div key={i}>{item}</div>)
      ) : (
        <TransitionGroup component={null}>
          {items.map((item, i) => {
            const ref = (revealRefs.current[i] ||= React.createRef());
            return (
              <CSSTransition
                key={i}
                nodeRef={ref}
                classNames="fadeup"
                timeout={loaderDelay}
                appear={true}
              >
                <div ref={ref} style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                  {item}
                </div>
              </CSSTransition>
            );
          })}
          <Link className="down_arrow" to="#featured-posts">
            <Icon className="detail__item__icon" name="DownArrow" />
          </Link>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
