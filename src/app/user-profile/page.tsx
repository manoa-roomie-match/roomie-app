'use client';

import './user-profile.module.css';

import { useSession } from 'next-auth/react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (!session) {
    return (
      <p className="text-center mt-5">
        You must be signed in to view your profile.
      </p>
    );
  }

  const user = session.user as {
    name?: string;
    email: string;
    randomKey?: string;
    image?: string;
  };

  return (
    <Container className="profile-container py-5">
      <Card className="profile-card mx-auto p-4">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <Image
              src={user.image || '/temp-pfp.jpg'}
              alt="Profile Picture"
              roundedCircle
              width={150}
              height={150}
            />
          </Col>

          <Col md={8}>
            <h2 className="profile-name">{user.name || 'Unnamed User'}</h2>
            <p className="profile-email">{user.email}</p>
            {user.randomKey && (
              <p className="profile-role">Role: {user.randomKey}</p>
            )}
          </Col>
        </Row>

        <hr />

        <h4 className="mt-4">About Me</h4>
        <p className="profile-bio">
          {user.profile || 'No profile information provided.'}
        </p>

        <h4 className="mt-4">Roommate Preferences</h4>
        <ul className="profile-list">
          <li>{user.preferences || 'No preferences provided.'}</li>
          <li>{user.preferences || 'No preferences provided.'}</li>
          <li>{user.preferences || 'No preferences provided.'}</li>
        </ul>
      </Card>
    </Container>
  );
}
