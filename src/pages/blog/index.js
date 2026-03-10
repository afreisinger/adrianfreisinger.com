import React, { useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledMainContainer = styled.main`
  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 100px;

  @media (prefers-reduced-motion: no-preference) {
    visibility: hidden;
  }
`;
const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: inline-flex;
  align-items: baseline;
  flex-direction: column;
  padding: 1rem;
  gap: 2.5rem;
`;

const StyledPost = styled.li`
  transition: var(--transition);
  display: flex;

  ${({ theme }) => theme.mixins.flexBetween};
  gap: 3rem;
  align-items: flex-start;

  .more_link {
    margin-left: 2px;
  }

  .metadata {
    display: flex;
    min-width: 8rem;
    flex-direction: column;
    justify-content: flex-start;
    font-size: var(--fz-md);
  }

  .date {
    color: var(--medium-gray);
    margin: 0.2rem 0;
  }

  .read_time {
    color: var(--light-gray);
  }

  .title {
    font-size: var(--fz-xxl);
    color: var(--black);
    margin-top: 2px;
  }

  .description {
    margin: 1rem 0;
    margin-top: 0.4rem;
    font-size: var(--fz-lg);
  }

  @media (max-width: 870px) {
    flex-direction: column;
    gap: 0.5rem;

    .description {
      margin-top: 0;
    }

    .date {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    visibility: hidden;
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealPosts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Eliminamos el delay inicial para que empiece de inmediato al montar
    sr.reveal(revealTitle.current, { ...srConfig(0), viewFactor: 0.01, duration: 400 });
    revealPosts.current.forEach((ref, i) =>
      sr.reveal(ref, { ...srConfig(100 + i * 50), viewFactor: 0.01, duration: 400 }),
    );
  }, []);

  // Function to calculate read time
  const calculateReadTime = text => {
    const wordsPerMinute = 150; // Average reading speed
    const words = text.split(/\s+/).length; // Split by whitespace and count words
    const minutes = Math.ceil(words / wordsPerMinute); // Calculate minutes and round up
    return minutes;
  };

  return (
    <Layout location={location}>
      <Helmet title="Blog" />

      <StyledMainContainer>
        <StyledHeader ref={revealTitle}>
          <h1 className="big-heading">Blog</h1>
          <p className="subtitle">All the latest posts</p>
        </StyledHeader>

        <div className="post_container">
          <StyledGrid>
            {posts.length > 0 &&
              posts.map(({ node }, i) => {
                const { frontmatter, html } = node;
                const { title, description, slug, date } = frontmatter;
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                const readTime = calculateReadTime(html);
                return (
                  <StyledPost key={i} ref={el => (revealPosts.current[i] = el)}>
                    <div className="metadata">
                      <p className="date">{formattedDate}</p>
                      <p className="read_time">{readTime} min read</p>
                    </div>
                    <div className="main">
                      <Link to={slug}>
                        <h3 className="title">{title}</h3>
                      </Link>
                      <p className="description">{description}</p>
                      <Link className="styled_link more_link" to={slug}>
                        Read More &rarr;
                      </Link>
                    </div>
                  </StyledPost>
                );
              })}
          </StyledGrid>
        </div>
      </StyledMainContainer>
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
          }
          html
        }
      }
    }
  }
`;
