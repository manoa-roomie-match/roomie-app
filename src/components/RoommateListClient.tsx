'use client';

import React from 'react';
import { Ratings } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Badge, Button, Card, Col, Form, Image, Row, Stack } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

export type StudentListEntry = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  hobbies: string[];
  cleanliness: Ratings;
  noiseLevels: Ratings;
  major: string;
  profilePicture: string;
  userId: number | null;
};

const ratingToNumber = (rating: Ratings): number => {
  const map: Record<Ratings, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return map[rating] ?? 3;
};

const renderStars = (rating: Ratings, size = 14) => {
  const numRating = ratingToNumber(rating);
  return (
    <div className="d-flex align-items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <FaStar
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={i < numRating ? 'text-warning' : 'text-muted'}
          size={size}
        />
      ))}
    </div>
  );
};

const deriveRoommateType = (cleanliness: Ratings, noiseLevels: Ratings) => {
  const clean = ratingToNumber(cleanliness);
  const noise = ratingToNumber(noiseLevels);
  if (clean >= 4 && noise <= 2) return 'Quiet & Tidy';
  if (clean >= 4 && noise >= 4) return 'Social & Clean';
  if (clean <= 2 && noise >= 4) return 'Laid-back & Loud';
  if (clean <= 2 && noise <= 2) return 'Chill & Low-Key';
  return 'Balanced';
};

type StarFilterProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
};

const StarFilter = ({ label, value, onChange }: StarFilterProps) => (
  <div className="mb-3">
    <div className="d-flex justify-content-between align-items-center mb-1">
      <Form.Label className="mb-0">{label}</Form.Label>
      <small className="text-muted">{value || 'any'}</small>
    </div>
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(value === star ? 0 : star)}
          className={`btn btn-sm ${value >= star ? 'btn-warning' : 'btn-outline-secondary'}`}
        >
          <FaStar size={14} className="mb-1" />
        </button>
      ))}
    </div>
  </div>
);

type ListClientProps = {
  students: StudentListEntry[];
};

const RoommateListClient = ({ students }: ListClientProps) => {
  const router = useRouter();
  const [nameFilter, setNameFilter] = React.useState('');
  const [hobbyFilter, setHobbyFilter] = React.useState('');
  const [majorFilter, setMajorFilter] = React.useState('');
  const [minClean, setMinClean] = React.useState(0);
  const [minNoise, setMinNoise] = React.useState(0);
  const [minCombined, setMinCombined] = React.useState(0);

  const filtered = React.useMemo(() => {
    const term = (val: string) => val.toLowerCase();
    const nameTerm = term(nameFilter);
    const hobbyTerm = term(hobbyFilter);
    const majorTerm = term(majorFilter);

    return students.filter((s) => {
      const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
      const hobbies = s.hobbies.join(', ').toLowerCase();
      const major = s.major.toLowerCase();
      const cleanNum = ratingToNumber(s.cleanliness);
      const noiseNum = ratingToNumber(s.noiseLevels);

      const passesName = !nameTerm || fullName.includes(nameTerm);
      const passesHobby = !hobbyTerm || hobbies.includes(hobbyTerm);
      const passesMajor = !majorTerm || major.includes(majorTerm);
      const passesClean = minClean === 0 || cleanNum >= minClean;
      const passesNoise = minNoise === 0 || noiseNum >= minNoise;
      const passesCombined = minCombined === 0 || (cleanNum >= minCombined && noiseNum >= minCombined);

      return passesName && passesHobby && passesMajor && passesClean && passesNoise && passesCombined;
    });
  }, [students, nameFilter, hobbyFilter, majorFilter, minClean, minNoise, minCombined]);

  return (
    <Row>
      <Col xs={12} md={3} className="mb-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Filtering criteria</Card.Title>
            <Form.Group className="mb-3" controlId="filter-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="filter-hobby">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter interests"
                value={hobbyFilter}
                onChange={(e) => setHobbyFilter(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="filter-major">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter major"
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
              />
            </Form.Group>

            <StarFilter label="Cleanliness" value={minClean} onChange={setMinClean} />
            <StarFilter label="Noise tolerance" value={minNoise} onChange={setMinNoise} />
            <StarFilter label="Cleanliness & Noise" value={minCombined} onChange={setMinCombined} />
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={9}>
        <div className="d-flex flex-wrap gap-3">
          {filtered.map((s) => (
            <Card key={s.id} className="shadow-sm" style={{ width: '260px' }}>
              <Card.Body className="p-2 d-flex flex-column align-items-center text-center">
                <div className="fw-bold small mb-2">{`${s.firstName} ${s.lastName}`}</div>
                <div className="mb-2">
                  <Image
                    src={s.profilePicture}
                    alt={`${s.firstName} ${s.lastName}`}
                    roundedCircle
                    style={{
                      width: '1.7cm',
                      height: '1.7cm',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Stack gap={1} className="w-100">
                  <div className="small text-muted">Hobbies</div>
                  <div className="small fw-semibold">
                    {s.hobbies.length ? s.hobbies.join(', ') : 'N/A'}
                  </div>
                  <div className="small text-muted mt-1">Roommate type</div>
                  <div className="small fw-semibold">{deriveRoommateType(s.cleanliness, s.noiseLevels)}</div>
                  <div className="small text-muted mt-1">Major</div>
                  <Badge bg="light" text="dark" className="fw-normal small">
                    {s.major || 'Undeclared'}
                  </Badge>
                  <div className="small text-muted mt-1">Cleanliness</div>
                  {renderStars(s.cleanliness, 12)}
                  <div className="small text-muted mt-1">Noise</div>
                  {renderStars(s.noiseLevels, 12)}
                  <div className="d-grid mt-2">
                    {/*
                      Navigate to messages when there is a linked user account; keep the button disabled if none exists.
                    */}
                    <Button
                      onClick={() => s.userId && router.push(`/messages?with=${s.userId}`)}
                      variant="success"
                      size="sm"
                      disabled={!s.userId}
                    >
                      Send Message
                    </Button>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          ))}
          {filtered.length === 0 && <div className="text-muted">No roommates match your filters.</div>}
        </div>
      </Col>
    </Row>
  );
};

export default RoommateListClient;
