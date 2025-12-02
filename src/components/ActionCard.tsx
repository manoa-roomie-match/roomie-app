'use client';

import { Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { IconType } from 'react-icons';
import styles from './actioncard.module.css';

interface ActionCardProps {
  icon: IconType;
  iconColor: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const ActionCard = ({ icon: Icon, iconColor, title, description, buttonText, href }: ActionCardProps) => (
  <Col xs={12} md={4}>
    <Card className={styles.actionCard}>
      <Card.Body className="text-center p-4 d-flex flex-column">
        <Icon size={40} className={`${iconColor} mb-3`} />
        <h5>{title}</h5>
        <p className="text-muted small flex-grow-1">{description}</p>
        <Link href={href} passHref>
          <button className={styles['small-button']} type="button">
            {buttonText}
          </button>
        </Link>
      </Card.Body>
    </Card>
  </Col>
);

export default ActionCard;
