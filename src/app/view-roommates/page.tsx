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

  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  const students = await prisma.student.findMany({
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

  const users = await prisma.user.findMany({
    where: { email: { in: students.map((s) => s.email) } },
    select: { id: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.email, u.id]));

  const studentsWithUserId: StudentListEntry[] = students.map((student) => ({
    ...student,
    userId: userMap.get(student.email) ?? null,
  }));

  return (
    <main>
      <Container fluid className="py-3">
        <Row className="mb-3">
          <Col>
            <h1 className="text-uppercase fw-bold mb-0">list</h1>
          </Col>
        </Row>
        <RoommateListClient students={studentsWithUserId} isAdmin={role === 'ADMIN'} />
      </Container>
    </main>
  );
};

export default ViewRoommatesPage;
