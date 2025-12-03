import { getServerSession } from 'next-auth';
import { Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import CreateProfileForm from '@/components/CreateProfileForm';

/** Render a list of stuff for the logged in user. */
const CreateProfilePage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  //   const owner = (session && session.user && session.user.email) || '';
  // console.log(stuff);
  return (
    <main>
      <Container id="create-profile" fluid className="py-3">
        <Row>
          <CreateProfileForm />
        </Row>
      </Container>
    </main>
  );
};

export default CreateProfilePage;
