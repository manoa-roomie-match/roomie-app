import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col } from 'react-bootstrap';
import MatchingPageSwiper from '@/components/MatchingPageSwiper';
import { Student } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { findMatchingStudents, findStudentsWithinRange } from '@/lib/dbActions';
import { notFound } from 'next/navigation';

const MatchingPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
        // eslint-disable-next-line @typescript-eslint/comma-dangle
      } | null,
    );
  const email: string | undefined = session?.user?.email ?? undefined;
  const student: Student | null = await prisma.student.findUnique({
    where: { email },
  });
  if (!student) {
    return notFound();
  }
  const topMatches: Student[] = await findMatchingStudents(student?.id);
  const rangeMatches: Student[] = await findStudentsWithinRange(student?.id); 
  topMatches.push(...rangeMatches);
  const uniqueMatches = Array.from(
    new Map(topMatches.map(s => [s.id, s])).values()
  );
  return (
    <Container id="find-match" fluid className="py-3">
      <Row>
        <Col>
        <Row className="d-flex justify-content-center align-items-center">
          <h1 className="text-uppercase fw-bold mb-0 text-center">We found matches!</h1>
        </Row>
          <MatchingPageSwiper topMatches={uniqueMatches}/>
        </Col>
      </Row>
    </Container>
  )


}

export default MatchingPage;