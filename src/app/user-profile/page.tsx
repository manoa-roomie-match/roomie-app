'use client';

import './user-profile.module.css';

import { useSession } from 'next-auth/react';
import {
  Container,
  Card,
  Image,
  Row,
  Col,
  Badge,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import {
  FaEdit,
  FaClock,
  FaVolumeUp,
  FaUsers,
  FaBroom,
  FaMoon,
  FaGraduationCap,
  FaEnvelope,
  FaHome,
  FaHeart,
} from 'react-icons/fa';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <Container className="text-center mt-5">
        <Card className="p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <h3>Sign In Required</h3>
          <p className="text-muted">
            You must be signed in to view your profile.
          </p>
          <Button variant="primary" href="/api/auth/signin">
            Sign In
          </Button>
        </Card>
      </Container>
    );
  }

  const user = session.user as {
    name?: string;
    email: string;
    image?: string;
    major?: string;
    year?: string;
    bio?: string;
    preferences?: string[];
    hobbies?: string[];
    sleepSchedule?: string;
    cleanliness?: string;
    socialLevel?: string;
    noiseLevel?: string;
    guestPolicy?: string;
    housingPreference?: string;
    lookingForRoommate?: boolean;
  };

  // Sample data for demonstration (in real app, this comes from database)
  const profileData = {
    ...user,
    year: user.year || 'Sophomore',
    bio:
      user.bio
      || `Hey! I'm looking for a chill roommate to share an apartment with next semester. 
      I love hiking, trying new restaurants, and having movie nights!`,
    preferences: user.preferences || [
      'Non-smoker',
      'Pet-friendly',
      'Share cleaning duties',
      'Quiet during study hours',
    ],
    hobbies: user.hobbies || [
      'Hiking & outdoor activities',
      'Cooking',
      'Playing guitar',
      'Video games',
      'Intramural sports',
    ],
    sleepSchedule: user.sleepSchedule || 'Night Owl (12am - 9am)',
    cleanliness: user.cleanliness || 'Moderately clean',
    socialLevel: user.socialLevel || 'Balanced',
    noiseLevel: user.noiseLevel || 'Moderate',
    guestPolicy: user.guestPolicy || 'Occasionally',
    housingPreference: user.housingPreference || 'Off-campus apartment',
    lookingForRoommate: user.lookingForRoommate ?? true,
  };

  // Calculate profile completeness
  const calculateCompleteness = () => {
    const fields = [
      profileData.name,
      profileData.major,
      profileData.bio,
      profileData.preferences?.length > 0,
      profileData.hobbies?.length > 0,
      profileData.sleepSchedule,
      profileData.cleanliness,
      profileData.socialLevel,
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <Container className="py-4" style={{ maxWidth: '900px' }}>
      {/* Header Banner */}
      <div
        className="position-relative mb-4"
        style={{
          height: '200px',
          background: 'linear-gradient(135deg, #225824ff 0%, #FFD700 100%)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div className="position-absolute top-0 end-0 m-3">
          <Button variant="light" size="sm" className="me-2">
            <FaEdit className="me-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Profile Card */}
      <Card className="shadow-sm border-0 mb-4" style={{ marginTop: '-80px' }}>
        <Card.Body className="p-4">
          <Row className="align-items-start">
            <Col
              xs={12}
              md={4}
              className="text-center text-md-start mb-3 mb-md-0"
            >
              <div className="position-relative d-inline-block">
                <Image
                  src={profileData.image || '/temp-pfp.jpg'}
                  alt="Profile Picture"
                  roundedCircle
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '5px solid white',
                    objectFit: 'cover',
                  }}
                  className="shadow-sm"
                />
                {profileData.lookingForRoommate && (
                  <Badge
                    bg="success"
                    className="position-absolute bottom-0 end-0"
                    style={{ padding: '8px 12px' }}
                  >
                    Looking for Roommate
                  </Badge>
                )}
              </div>
            </Col>

            <Col xs={12} md={8}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-2">{profileData.name || 'Unnamed User'}</h2>
                  <div className="mb-3">
                    <Badge bg="primary" className="me-2 px-3 py-2">
                      <FaGraduationCap className="me-1" />
                      {profileData.major || 'Undeclared'}
                    </Badge>
                    <Badge bg="secondary" className="px-3 py-2">
                      {profileData.year}
                    </Badge>
                  </div>
                  <p className="text-muted mb-2">
                    <FaEnvelope className="me-2" />
                    {profileData.email}
                  </p>
                  <p className="text-muted mb-0">
                    <FaHome className="me-2" />
                    Prefers:
                    {profileData.housingPreference}
                  </p>
                </div>
              </div>

              {/* Profile Completeness */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Profile Completeness</small>
                  <small className="fw-bold text-primary">
                    {completeness}
                    %
                  </small>
                </div>
                <ProgressBar
                  now={completeness}
                  variant={completeness === 100 ? 'success' : 'primary'}
                  style={{ height: '8px' }}
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* About Me Section */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-3 d-flex align-items-center">
            <FaHeart className="me-2 text-danger" />
            About Me
          </h4>
          <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
            {profileData.bio}
          </p>
        </Card.Body>
      </Card>

      {/* Lifestyle Preferences */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-4">Lifestyle & Habits</h4>
          <Row>
            <Col xs={12} sm={6} className="mb-3">
              <div className="d-flex align-items-center p-3 bg-light rounded">
                <FaMoon className="me-3 text-primary" size={24} />
                <div>
                  <small className="text-muted d-block">Sleep Schedule</small>
                  <strong>{profileData.sleepSchedule}</strong>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} className="mb-3">
              <div className="d-flex align-items-center p-3 bg-light rounded">
                <FaBroom className="me-3 text-success" size={24} />
                <div>
                  <small className="text-muted d-block">Cleanliness</small>
                  <strong>{profileData.cleanliness}</strong>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} className="mb-3">
              <div className="d-flex align-items-center p-3 bg-light rounded">
                <FaUsers className="me-3 text-info" size={24} />
                <div>
                  <small className="text-muted d-block">Social Level</small>
                  <strong>{profileData.socialLevel}</strong>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} className="mb-3">
              <div className="d-flex align-items-center p-3 bg-light rounded">
                <FaVolumeUp className="me-3 text-warning" size={24} />
                <div>
                  <small className="text-muted d-block">Noise Tolerance</small>
                  <strong>{profileData.noiseLevel}</strong>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Roommate Preferences */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-3">Roommate Preferences</h4>
          <div className="d-flex flex-wrap gap-2">
            {profileData.preferences?.map((pref) => (
              <Badge
                key={pref}
                bg="primary"
                className="px-3 py-2"
                style={{ fontSize: '0.9rem', fontWeight: 'normal' }}
              >
                {pref}
              </Badge>
            ))}
          </div>
          <div className="mt-3 p-3 bg-light rounded">
            <small className="text-muted d-block mb-1">
              <FaClock className="me-2" />
              Guest Policy
            </small>
            <strong>{profileData.guestPolicy}</strong>
          </div>
        </Card.Body>
      </Card>

      {/* Hobbies & Interests */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-3">Hobbies & Interests</h4>
          <div className="d-flex flex-wrap gap-2">
            {profileData.hobbies?.map((hobby) => (
              <Badge
                key={hobby}
                bg="light"
                text="dark"
                className="px-3 py-2 border"
                style={{ fontSize: '0.9rem', fontWeight: 'normal' }}
              >
                {hobby}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
