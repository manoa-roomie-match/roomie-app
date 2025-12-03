import { getServerSession } from 'next-auth';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import RoommateListClient, { StudentListEntry } from '@/components/RoommateListClient';

const ViewRoommatesPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const studentsRaw = await prisma.student.findMany({
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      hobbies: true,
      cleanliness: true,
      noiseLevels: true,
      major: true,
      profilePicture: true,
    },
  });

  const emails = studentsRaw.map((s) => s.email);
  const users = await prisma.user.findMany({
    where: { email: { in: emails } },
    select: { id: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.email, u.id]));

  const students: StudentListEntry[] = studentsRaw.map((s) => ({
    id: s.id,
    userId: userMap.get(s.email),
    firstName: s.firstName,
    lastName: s.lastName,
    hobbies: s.hobbies,
    cleanliness: s.cleanliness,
    noiseLevels: s.noiseLevels,
    major: s.major,
    profilePicture: s.profilePicture,
  }));

  return (
    <main>
      <Container fluid className="py-3">
        <Row className="mb-3">
          <Col>
            <h1 className="text-uppercase fw-bold mb-0">list</h1>
          </Col>
        </Row>
        <RoommateListClient students={students} />
      </Container>
    </main>
  );
};

export default ViewRoommatesPage;
