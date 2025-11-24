'use client';

import { Col, Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;

  return (
    <footer className="uh-footer">
      <Container>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          {/* <br /> */}
          {/* <a href="http://ics-software-engineering.github.io/nextjs-application-template">
            Template Home Page
          </a> */}
          {currentUser && (
            <>
              <br />
              <a href="/contact">Contact Us</a>
            </>
          )}
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
