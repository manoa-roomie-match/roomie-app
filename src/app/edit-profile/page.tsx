import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Student } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProfileForm from '@/components/EditProfileForm';

/** Render a list of stuff for the logged in user. */
const EditProfilePage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const email: string | undefined = session?.user?.email ?? undefined;
  // console.log(id);
  const student: Student | null = await prisma.student.findUnique({
    where: { email },
  });
  // console.log(stuff);
  if (!student) {
    return notFound();
  }
  // console.log(stuff);
  return (
    <main>
      <Container id="edit-profile" fluid className="py-3">
        <Row>
          <Col>
            <h1>Edit Profile</h1>
            <EditProfileForm student={student} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditProfilePage;
