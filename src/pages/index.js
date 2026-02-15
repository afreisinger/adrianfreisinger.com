import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout,
  Hero,
  About,
  FeaturedProject,
  FeaturedPost,
  FeaturedVideo,
  Projects,
  Contact,
} from '@components';
const { features } = require('@config');

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      {features.featuredProjects && <FeaturedProject />}
      {features.blog && <FeaturedPost />}
      {features.youtube && <FeaturedVideo />}
      {features.projects && <Projects />}
      {features.contact && <Contact />}
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
