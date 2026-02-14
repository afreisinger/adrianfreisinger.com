import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia, name } from '@config';
import PropTypes from 'prop-types';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;

  .copy {
    display: flex;
    color: var(--black);
    align-items: center;
    justify-content: center;
    margin-top: 0.4rem;
  }
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
    version: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !process.env.GATSBY_FETCH_STATS) {
      return;
    }

    const repoUrl = 'https://api.github.com/repos/afreisinger/adrianfreisinger.com';

    Promise.all([fetch(repoUrl), fetch(`${repoUrl}/releases/latest`)])
      .then(async ([repoRes, releaseRes]) => {
        const repoJson = await repoRes.json();
        const releaseJson = releaseRes.ok ? await releaseRes.json() : null;

        setGitHubInfo({
          stars: repoJson.stargazers_count,
          forks: repoJson.forks_count,
          version: releaseJson ? releaseJson.tag_name : null,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <a href="https://github.com/afreisinger/adrianfreisinger.com">
          <div>
            Designed &amp; Built by Adrián Freisinger
            {githubInfo.version && <span> — {githubInfo.version}</span>}
          </div>

          {githubInfo.stars !== null && githubInfo.forks !== null && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;