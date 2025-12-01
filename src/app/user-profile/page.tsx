'use client';

import './user-profile.module.css';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
  FaVolumeUp,
  FaBroom,
  FaGraduationCap,
  FaEnvelope,
  FaHeart,
  FaStar,
} from 'react-icons/fa';

// type Ratings = 1 | 2 | 3 | 4 | 5;

interface StudentData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  hobbies: string;
  bioInfo: string;
  cleanliness: string;
  noiseLevels: string;
  major: string;
  profilePicture: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/student?email=${encodeURIComponent(session.user.email)}`,
        );
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [session, status]);

  if (status === 'loading' || loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // convert rating enum to number
  const ratingToNumber = (rating: string): number => {
    const ratingMap: { [key: string]: number } = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
    };
    return ratingMap[rating] || 3;
  };

  // render star rating
  const renderStars = (rating: string) => {
    const numRating = ratingToNumber(rating);
    return (
      <div className="d-flex align-items-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <FaStar
            key={`star-${i}`}
            className={i < numRating ? 'text-warning' : 'text-muted'}
            size={18}
          />
        ))}
      </div>
    );
  };

  // Helper function to get rating label
  const getRatingLabel = (rating: string, type: 'cleanliness' | 'noise') => {
    const num = ratingToNumber(rating);
    if (type === 'cleanliness') {
      const labels = [
        '',
        'Very messy',
        'Somewhat messy',
        'Moderately clean',
        'Clean',
        'Very clean',
      ];
      return labels[num];
    }
    const labels = [
      '',
      'Very quiet',
      'Quiet',
      'Moderate',
      'Can be noisy',
      'Very noisy',
    ];
    return labels[num];
  };

  // Parse hobbies string into array
  const hobbiesArray = studentData?.hobbies
    ? studentData.hobbies
      .split(',')
      .map((h) => h.trim())
      .filter((h) => h.length > 0)
    : [];

  const calculateCompleteness = () => {
    if (!studentData) return 0;
    const fields = [
      studentData.firstName,
      studentData.lastName,
      studentData.email,
      studentData.major,
      studentData.bioInfo,
      studentData.hobbies,
      studentData.cleanliness,
      studentData.noiseLevels,
      studentData.profilePicture,
    ];
    const completed = fields.filter((f) => f && f !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  // Profile data with fallbacks
  const profileData = studentData || {
    firstName: session?.user?.name?.split(' ')[0] || 'User',
    lastName: session?.user?.name?.split(' ')[1] || '',
    email: session?.user?.email || 'No email',
    major: 'Undeclared',
    bioInfo: 'No bio added yet.',
    hobbies: 'None',
    cleanliness: 'THREE',
    noiseLevels: 'THREE',
    profilePicture:
      session?.user?.image || 'https://img.icons8.com/?size=100&id=7820&format=png',
  };

  return (
    <Container className="py-4" style={{ maxWidth: '900px' }}>
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
          <Button
            variant="light"
            size="sm"
            className="me-2"
            href="/profile/edit"
          >
            <FaEdit className="me-2" />
            Edit Profile
          </Button>
        </div>
      </div>

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
                  src={profileData.profilePicture}
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
                {!studentData && (
                  <Badge
                    bg="warning"
                    className="position-absolute bottom-0 end-0"
                    style={{ padding: '8px 12px' }}
                  >
                    Profile Incomplete
                  </Badge>
                )}
              </div>
            </Col>

            <Col xs={12} md={8}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-2">
                    {profileData.firstName}
                    &nbsp;
                    {profileData.lastName}
                  </h2>
                  <div className="mb-3">
                    <Badge bg="primary" className="me-2 px-3 py-2">
                      <FaGraduationCap className="me-1" />
                      {profileData.major}
                    </Badge>
                  </div>
                  <p className="text-muted mb-2">
                    <FaEnvelope className="me-2" />
                    {profileData.email}
                  </p>
                </div>
              </div>

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

      {!studentData ? (
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body className="p-4 text-center">
            <h4 className="mb-3">Complete Your Profile</h4>
            <p className="text-muted mb-3">
              Create your student profile to start finding compatible roommates!
            </p>
            <Button variant="primary" size="lg" href="/profile/edit">
              Create Profile
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <h4 className="mb-3 d-flex align-items-center">
                <FaHeart className="me-2 text-danger" />
                About Me
              </h4>
              <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                {profileData.bioInfo}
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <h4 className="mb-4">Lifestyle & Habits</h4>
              <Row>
                <Col xs={12} sm={6} className="mb-3">
                  <div className="d-flex align-items-start p-3 bg-light rounded">
                    <FaBroom className="me-3 text-success mt-1" size={28} />
                    <div className="flex-grow-1">
                      <small className="text-muted d-block mb-1">
                        Cleanliness
                      </small>
                      <strong className="d-block mb-2">
                        {getRatingLabel(profileData.cleanliness, 'cleanliness')}
                      </strong>
                      {renderStars(profileData.cleanliness)}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} className="mb-3">
                  <div className="d-flex align-items-start p-3 bg-light rounded">
                    <FaVolumeUp className="me-3 text-warning mt-1" size={28} />
                    <div className="flex-grow-1">
                      <small className="text-muted d-block mb-1">
                        Noise Tolerance
                      </small>
                      <strong className="d-block mb-2">
                        {getRatingLabel(profileData.noiseLevels, 'noise')}
                      </strong>
                      {renderStars(profileData.noiseLevels)}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {hobbiesArray.length > 0 && (
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h4 className="mb-3">Hobbies & Interests</h4>
                <div className="d-flex flex-wrap gap-2">
                  {hobbiesArray.map((hobby) => (
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
          )}
        </>
      )}
    </Container>
  );
}
