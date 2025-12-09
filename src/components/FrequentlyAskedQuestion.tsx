'use client';

import { Accordion } from 'react-bootstrap';
import React from 'react';

interface Questions {
  question: string;
  answer: React.ReactNode;
  eventKey: string;
}

const FAQ = ({ question, answer, eventKey }: Questions) => (
  <Accordion.Item
    eventKey={eventKey}
    style={{
      border: 'none',
      borderBottom: '1px solid #dee2e6',
    }}
  >
    <Accordion.Header
      style={{
        fontSize: '1.1rem',
        fontWeight: '600',
      }}
    >
      {question}
    </Accordion.Header>
    <Accordion.Body
      style={{
        color: '#6c757d',
        lineHeight: '1.6',
      }}
    >
      {answer}
    </Accordion.Body>
  </Accordion.Item>
);

export default FAQ;
