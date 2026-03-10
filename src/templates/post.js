import React, { useEffect, useRef } from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconGitHub, IconMedium } from '@components/icons';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }

  @media (prefers-reduced-motion: no-preference) {
    visibility: hidden;
  }
`;

const StyledPostContent = styled.div`
  // margin-bottom: 100px;

  // h1,
  // h2,
  // h3,
  // h4,
  // h5,
  // h6 {
  //   margin: 2em 0 1em;
  // }

  // p {
  //   margin: 1em 0;
  //   line-height: 1.5;
  // }

  margin-bottom: 100px;

  /* Ajuste de Color y Tamaño base para el contenido */
  color: var(--text-color); /* Un gris oscuro más legible (#374151) */
  font-size: var(--fz-xl); /* 18px en lugar de 20px, ideal para lectura */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    color: var(--dark-gray); /* Títulos más oscuros para contraste */
  }
  p {
    margin: 1em 0; /* Un poco más de aire entre párrafos */
    line-height: 1.5; /* Altura de línea más cómoda */
  }

  a {
    ${({ theme }) => theme.mixins.underlineLink};
  }

  li > a {
    font-weight: 400;
    line-height: 1.5;
  }

  code {
    background-color: var(--dark-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  ol {
    padding-inline-start: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: var(--fz-sm);
    display: block;
    overflow-x: auto;
    border-radius: var(--border-radius);
  }

  th {
    background-color: #e2e8f0;
    color: #1e293b;
    text-align: left;
    padding: 12px 16px;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #94a3b8;
    white-space: nowrap;
  }

  td {
    padding: 5px 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    font-size: var(--fz-lg);
    line-height: 1.5;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  tr:hover td {
    background-color: #94a3b8;
    color: #0f172a;
    transition: var(--transition);
  }

  .post-links {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    a {
      margin-right: 15px;
      color: var(--medium-gray);
      transition: var(--transition);
      text-decoration: none;

      &:hover,
      &:focus {
        color: var(--black);
        transform: translateY(-3px);
      }

      &:after {
        display: none !important;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    visibility: hidden;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html, tableOfContents } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  const revealTitle = useRef(null);
  const revealContent = useRef(null);
  const revealBreadcrumb = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealBreadcrumb.current, { ...srConfig(0), viewFactor: 0.01, duration: 400 });
    sr.reveal(revealTitle.current, { ...srConfig(100), viewFactor: 0.01, duration: 400 });
    sr.reveal(revealContent.current, { ...srConfig(200), viewFactor: 0.01, duration: 400 });
  }, []);

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <span className="breadcrumb" ref={revealBreadcrumb}>
          <span className="arrow">&larr;</span>
          <Link className="styled_link" to="/blog">
            All Posts
          </Link>
        </span>

        <StyledPostHeader ref={revealTitle}>
          <h1 className="medium-heading">{title}</h1>

          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            <span>&nbsp;&mdash;&nbsp;</span>

            {tags &&
              tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
        </StyledPostHeader>

        {/* TABLE OF CONTENTS */}
        <StyledPostContent ref={revealContent}>
          {/* Descripción del post */}
          {frontmatter.description && <p className="post-description">{frontmatter.description}</p>}

          {/* Links opcionales (GitHub, Medium) */}
          {(frontmatter.repo || frontmatter.medium) && (
            <div className="post-links">
              {frontmatter.repo && (
                <a
                  href={frontmatter.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on GitHub">
                  <IconGitHub />
                </a>
              )}
              {frontmatter.medium && (
                <a
                  href={frontmatter.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Medium">
                  <IconMedium />
                </a>
              )}
            </div>
          )}

          {/* Tabla de contenido */}
          {tableOfContents && (
            <>
              <h2>Contents</h2>
              <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
            </>
          )}

          {/* Contenido principal */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledPostContent>
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      tableOfContents(maxDepth: 2)
      html
      frontmatter {
        title
        description
        date
        slug
        tags
        repo
        medium
      }
    }
  }
`;
