'use client';

import ActionCard from '@/components/ActionCard';
import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import {
  FaSearch,
  FaComments,
  FaChartLine,
  FaUserFriends,
  FaStar,
  FaShieldAlt,
  FaEnvelope,
  FaQuestionCircle,
} from 'react-icons/fa';
import styles from './home.module.css';

const Home = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  if (session && role === 'ADMIN') {
    return (
      <main>
        <Container className={styles.backgroundImage} fluid>
          <div className={styles.hero}>
            <h1>
              Welcome,
              {currentUser}
              !
            </h1>
            <h2>Manage the Roomie Match platform effectively.</h2>
            <div className={styles.buttonRow}>
              <Link href="/admin/dashboard" passHref>
                <button className={styles['custom-button']} type="button">
                  Admin Dashboard
                </button>
              </Link>
              <Link href="/admin/manage-users" passHref>
                <button
                  className={styles['custom-button']}
                  type="button"
                >
                  Manage Users
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if (session && role === 'USER') {
    return (
      <main>
        <Container className={styles.backgroundImage} fluid>
          <div className={styles.hero}>
            <h1>
              Welcome back, &nbsp;
              {currentUser}
              !
            </h1>
            <h2 className="mb-4">
              We&apos;re excited to help you find your perfect roommate.
            </h2>
            <Row
              className="g-4 mt-4"
              style={{ maxWidth: '900px', margin: '0 auto' }}
            >
              <ActionCard
                icon={FaUserFriends}
                iconColor="text-primary"
                title="View Matches"
                description="See your recommended roommates"
                buttonText="Browse"
                href="/view-roommates"
              />
              <ActionCard
                icon={FaComments}
                iconColor="text-success"
                title="Messages"
                description="Chat with potential roommates"
                buttonText="Open"
                href="/messages"
              />
              <ActionCard
                icon={FaStar}
                iconColor="text-warning"
                title="My Profile"
                description="Update your preferences"
                buttonText="Edit"
                href="/profile"
              />
            </Row>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className={styles.backgroundImage} fluid>
        <div className={styles.hero}>
          <h1>Welcome to UH Mānoa Roomie Match</h1>
          <p className={styles.subtitle}>
            Find your perfect roommate at UH Mānoa — safely, easily, and
            stress-free.
          </p>

          <div className={styles.buttonRow}>
            <Link href="/auth/signup" passHref>
              <button className={`${styles['custom-button']}`} type="button">
                Get Started
              </button>
            </Link>
            <Link
              href="/#how-it-works"
              passHref
            >
              <button className={`${styles['custom-button']}`} type="button">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </Container>

      <Container className="py-5" id="how-it-works">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted">
            Finding your ideal roommate is simple with our smart matching system
          </p>
        </div>

        <Row className="g-4">
          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FaChartLine size={50} className="text-primary" />
              </div>
              <Card.Body>
                <h5 className="fw-bold mb-3">Smart Matching Algorithm</h5>
                <p className="text-muted">
                  Our algorithm analyzes your living preferences, habits, and
                  personality to recommend the most compatible roommates for
                  you.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FaSearch size={50} className="text-success" />
              </div>
              <Card.Body>
                <h5 className="fw-bold mb-3">Advanced Search</h5>
                <p className="text-muted">
                  Filter by major, year, cleanliness level, sleep schedule, and
                  more to find roommates who match your specific needs.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FaComments size={50} className="text-warning" />
              </div>
              <Card.Body>
                <h5 className="fw-bold mb-3">Direct Messaging</h5>
                <p className="text-muted">
                  Connect instantly with potential roommates through our secure
                  messaging system. Get to know each other before committing.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-light py-5" id="why-choose-us">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Roomie Match?</h2>
            <p className="text-muted">
              The safe and trusted platform for UH Mānoa students
            </p>
          </div>

          <Row className="g-4 align-items-center">
            <Col xs={12} md={6}>
              <div className="d-flex align-items-start mb-4">
                <FaShieldAlt size={40} className="text-primary me-3 mt-1" />
                <div>
                  <h5 className="fw-bold">UH-Verified Students Only</h5>
                  <p className="text-muted mb-0">
                    All users are verified with their UH Mānoa email, ensuring a
                    safe and trustworthy community.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <FaUserFriends size={40} className="text-success me-3 mt-1" />
                <div>
                  <h5 className="fw-bold">Compatibility Focused</h5>
                  <p className="text-muted mb-0">
                    Our matching algorithm considers lifestyle habits,
                    schedules, and preferences to find your best match.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <FaStar size={40} className="text-warning me-3 mt-1" />
                <div>
                  <h5 className="fw-bold">Free for Students</h5>
                  <p className="text-muted mb-0">
                    Completely free service for all UH Mānoa students. No hidden
                    fees, no subscriptions.
                  </p>
                </div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <Card className="border-0 shadow-lg p-4">
                <Card.Body>
                  <h4 className="fw-bold mb-3">Have Questions?</h4>
                  <p className="text-muted mb-4">
                    We&apos;re here to help! Contact our team or explore our FAQ
                    to learn more about how Roomie Match can help you find the
                    perfect roommate.
                  </p>
                  <div className="d-flex gap-3">
                    <Link href="/contact-us" passHref className="flex-grow-1">
                      <button
                        className={`${styles['custom-button-secondary']}`}
                        type="button"
                        style={{ width: '100%' }}
                      >
                        <FaEnvelope className="me-2" />
                        Contact Us
                      </button>
                    </Link>
                    <Link
                      href="/faq"
                      className="flex-grow-1"
                    >
                      <button
                        className={`${styles['custom-button-secondary']}`}
                        type="button"
                        style={{ width: '100%' }}
                      >
                        <FaQuestionCircle className="me-2" />
                        View FAQ
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="py-5 text-center" id="get-started">
        <h3 className="fw-bold mb-3">
          Your Perfect Roommate is Just a Click Away
        </h3>
        <p
          className="text-muted mb-4"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          Create your profile in minutes, set your preferences, and let our
          smart algorithm do the rest. Finding a compatible roommate has never
          been easier!
        </p>
        <Link href="/auth/signup" passHref>
          <button className={styles['custom-button-secondary']} type="button">
            Get Started Free
          </button>
        </Link>
      </Container>
    </main>
  );
};

export default Home;
