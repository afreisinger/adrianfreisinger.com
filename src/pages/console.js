import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledConsoleContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 150px;

  @media (max-width: 1080px) {
    padding: 0 100px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const StyledMono = styled.span`
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  color: var(--black);
  margin-bottom: 20px;
  display: block;
`;

const StyledTitle = styled.h1`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  margin-bottom: 30px;
  color: var(--black);
`;

const StyledDescription = styled.p`
  margin: 20px 0 0;
  max-width: 540px;
  font-size: var(--fz-xl);
  line-height: 1.5;
`;

const StyledLoginButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 50px;
  padding: 20px 40px;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  letter-spacing: 1px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 60px;
`;

const StyledCard = styled.div`
  border: 1px solid var(--light-grey);
  padding: 25px;
  background-color: transparent;
  transition: var(--transition);

  &:hover {
    border-color: var(--black);
    transform: translateY(-5px);
  }

  .status {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-bottom: 10px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
  }

  .title {
    font-weight: 700;
    font-size: var(--fz-lg);
  }

  .info {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
    margin-top: 5px;
  }
`;

const ConsolePage = ({ location }) => (
  <Layout location={location}>
    <StyledConsoleContainer>
      <StyledMono>Restricted Area</StyledMono>
      <StyledTitle>
          Infrastructure
        <br />
          Gateway
      </StyledTitle>
      <StyledDescription>
          Accessing internal services requires cryptographic identification. Use your Single Sign-On
          credentials to proceed.
      </StyledDescription>

      <StyledLoginButton href="https://guac.adrianfreisinger.com/guacamole/">
          SIGN IN WITH KEYCLOAK
      </StyledLoginButton>

      <StyledGrid>
        <StyledCard>
          <div className="status">
            <div className="dot"></div> SSH: PROD-CORE
          </div>
          <div className="title">Production Cluster</div>
          <div className="info">Status: Operational</div>
        </StyledCard>
        <StyledCard style={{ opacity: 0.6 }}>
          <div className="status">
            <div className="dot" style={{ backgroundColor: '#94a3b8' }}></div> RDP: BACKUP-01
          </div>
          <div className="title">Backup Server</div>
          <div className="info">Status: Offline</div>
        </StyledCard>
      </StyledGrid>
    </StyledConsoleContainer>
  </Layout>
);

ConsolePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ConsolePage;
