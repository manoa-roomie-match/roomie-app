'use client';
import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import styles from './home.module.css';

/** The Home page. */
const Home = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;

  return (
    <main>
      <Container className={styles.backgroundImage} fluid>
        {session ? (
          <>
            <h1>
              Welcome,
              {currentUser}
              !
            </h1>
            <h2>We&apos;re excited to help you find your perfect roommate.</h2>
          </>
        ) : (
          <>
            <h1>Welcome to UH Mānoa Roomie Match</h1>
            <h2>Find your perfect roommate at UH Mānoa</h2>
          </>
        )}
      </Container>
    </main>
  );
};

export default Home;
