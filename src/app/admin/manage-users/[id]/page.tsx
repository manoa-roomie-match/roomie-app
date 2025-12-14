import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Student } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProfileForm from '@/components/EditProfileForm';

async function ManageUserPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const student: Student | null = await prisma.student.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  if (!student) {
    return notFound();
  }
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
}

export default ManageUserPage;
