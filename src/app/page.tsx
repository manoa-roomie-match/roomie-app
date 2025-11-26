'use client';

import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from './home.module.css';

/** The Home page. */
const Home = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;

  return (
    <main>
      <Container className={styles.backgroundImage} fluid>
        {(() => {
          if (session && role === 'ADMIN') {
            return (
              <>
                <h1>Welcome, {currentUser}!</h1>
                <h2>Manage the Roomie Match platform effectively.</h2>
              </>
            );
          }

          if (session && role === 'USER') {
            return (
              <>
                <h1>Welcome, {currentUser}!</h1>
                <h2>
                  We&apos;re excited to help you find your perfect roommate.
                </h2>
              </>
            );
          }
          return (
            <>
              <h1>Welcome to UH Mānoa Roomie Match</h1>
              <h2>Find your perfect roommate at UH Mānoa</h2>
              <Link href='/auth/signup' passHref>
              <button className={styles['custom-button']} type='submit'> Get Started </button>
              </Link>
            </>
          );
        })()}
      </Container>
    </main>
  );
};

export default Home;
