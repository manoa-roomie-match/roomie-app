import { Container } from 'react-bootstrap';
import styles from './home.module.css';

/** The Home page. */
const Home = () => (
  <main>
    <Container className={styles.backgroundImage} fluid>
      <h1>Welcome to UH Mānoa Roomie Match</h1>
      <p>Find your perfect roommate at UH Mānoa</p>
    </Container>
  </main>
);

export default Home;
