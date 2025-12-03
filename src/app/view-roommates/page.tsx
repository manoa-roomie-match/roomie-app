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

  const students: StudentListEntry[] = await prisma.student.findMany({
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      hobbies: true,
      cleanliness: true,
      noiseLevels: true,
      major: true,
      profilePicture: true,
    },
  });

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
