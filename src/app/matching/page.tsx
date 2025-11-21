import { getServerSession } from 'next-auth';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const MatchingPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  // console.log(stuff);
  return (
    <main>
      <Container id="matching-page" fluid className="py-3">
        <Row>
          <Col>
            <h1>Matching Page</h1>
            <Image src="/matching.jpg" alt="Matching page" fluid />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MatchingPage;
