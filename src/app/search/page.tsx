import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Image } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const SearchPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  // console.log(stuff);
  return (
    <main>
      <Container id="search-page" fluid className="py-3">
        <Row>
          <Col>
          <h1>Search for a roomate</h1>
            <Image
            src="/search.jpg"
            alt="Search page"
            fluid
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SearchPage;
