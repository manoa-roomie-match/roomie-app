'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { redirect, useRouter } from 'next/navigation';
import { Card, Image, Stack, Badge, Button, Row, Col } from 'react-bootstrap';
import { deriveRoommateType } from '@/lib/utilityFunctions';
import renderStars from '@/lib/renderFunctions';
import { Student } from '@prisma/client';

type StudentList = {
  topMatches: Student[];
  student: Student;
};

const MatchingPageSwiper = ({ topMatches, student }: StudentList) => {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = session?.user?.email || '';
  const router = useRouter();
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  console.log(`Top matches: ${JSON.stringify(topMatches, null, 2)}`);

  return (
    <Swiper
      direction="vertical"
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      style={{ height: '100vh' }}
    >
      {topMatches.map((s) => (
        <SwiperSlide key={s.id} className="d-flex justify-content-center align-items-center h-100">
          <Card key={s.id} className="shadow-sm" style={{ width: '500px' }}>
            <Card.Body className="p-2 d-flex flex-column align-items-center text-center">
              <Card.Header className="w-100 text-center fs-3 fw-bold bg-white text-dark mb-3">
                {`${s.firstName} ${s.lastName}`}
              </Card.Header>
              <Row>
                <Col>
                  <div className="mb-2">
                    <Image
                      src={s.profilePicture}
                      alt={`${s.firstName} ${s.lastName}`}
                      roundedCircle
                      style={{
                        width: '5cm',
                        height: '5cm',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <Stack gap={1} className="w-100">
                    <div className="small text-muted">Hobbies</div>
                    {/* <div className="small fw-semibold">
                      {s.hobbies.length ? s.hobbies.join(', ') : 'N/A'}
                    </div> */}
                    <div className="small fw-semibold">
                      {s.hobbies.length
                        ? s.hobbies.map((hobby, idx) => (
                          <span
                            key={hobby}
                            className={student.hobbies.includes(hobby) ? 'text-success fw-bold' : ''}
                          >
                            {hobby}
                            {idx < s.hobbies.length - 1 && ', '}
                          </span>
                        ))
                        : 'N/A'}
                    </div>
                    <div className="small text-muted mt-1">Roommate type</div>
                    <div className="small fw-semibold">
                      <span
                        className={deriveRoommateType(student.cleanliness, student.noiseLevels) === deriveRoommateType(s.cleanliness, s.noiseLevels) ? 'text-success fw-bold' : ''}
                      >
                        {deriveRoommateType(s.cleanliness, s.noiseLevels)}
                      </span>
                    </div>
                  </Stack>
                </Col>
              </Row>
              <Stack gap={1} className="w-100">
                <div className="small text-muted mt-1">Major</div>
                <Badge
                  bg={s.major.toLowerCase() === student.major.toLowerCase() ? 'success' : 'light'}
                  text={s.major.toLowerCase() === student.major.toLowerCase() ? 'light' : 'dark'}
                  className="fw-normal fs-6"
                >
                  {s.major || 'Undeclared'}
                </Badge>
                <div className="mb-2">
                  <div className="small text-muted mt-1 text-center">Cleanliness</div>
                  <div className="d-flex justify-content-center">
                    {renderStars(s.cleanliness, 12, student.cleanliness)}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="small text-muted mt-1 text-center">Noise</div>
                  <div className="d-flex justify-content-center">
                    {renderStars(s.noiseLevels, 12, student.noiseLevels)}
                  </div>
                </div>
                <div className="d-grid mt-2">
                  {/*
                    Navigate to messages when there is a linked user account; keep the button disabled if none exists.
                  */}
                  <Button
                    onClick={() => s.id && router.push(`/messages?with=${s.id}`)}
                    variant="success"
                    size="sm"
                    disabled={!s.id}
                  >
                    Send Message
                  </Button>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}
      <SwiperSlide className="d-flex justify-content-center align-items-center h-100">
        <Card className="shadow-sm" style={{ width: '500px' }}>
          <Card.Body className="p-4 d-flex flex-column align-items-center text-center">
            <Card.Header className="w-100 text-center fs-3 fw-bold bg-white text-dark mb-3">
              No More Matches
            </Card.Header>
            <div className="fs-5 fw-semibold">
              You&apos;ve reached the end of your top matches!
            </div>
            <div className="text-muted mt-2">
              Check back later for more potential roommates.
            </div>
          </Card.Body>
        </Card>
      </SwiperSlide>

    </Swiper>
  );
};

export default MatchingPageSwiper;
