'use client';

import { Container, Accordion } from 'react-bootstrap';
import FAQ from '@/components/FrequentlyAskedQuestion';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      id: 'create-account',
      question: 'How do I create an account?',
      answer: (
        <>
          You can sign up using your hawaii.edu email account at
          {' '}
          <a href="/sign-up">this link</a>
          .
        </>
      ),
    },
    {
      id: 'affiliation',
      question: 'Are you affiliated with the University of Hawaii?',
      answer: (
        <>
          We are currently
          <strong> not </strong>
          affiliated with the University of Hawaii
        </>
      ),
    },
    {
      id: 'response-time',
      question: 'How long does it take to get a response?',
      answer: <>We typically respond within 24 hours during business days.</>,
    },
    {
      id: 'block users',
      question: 'Can I block someone if they make me uncomfortable?',
      answer: (
        <>We are working on adding features like a blocking one in the future. For now, please contact us about a user making you uncomfortable.</>
      ),
    },
    {
      id: 'privacy',
      question: 'Is my personal information safe?',
      answer: (
        <>Yes! your information is safe and is not redistributed in any form.</>
      ),
    },
    {
      id: 'delete-profile',
      question: 'Can I delete my profile after I have found a roommate?',
      answer: (
        <>
          Deleting your profile will be an option, however, we are in early
          stages of the application and have not implemented the feature yet.
          However, do expect to have the option to delete your profile in the
          near future!
        </>
      ),
    },
    {
      id: 'housing options',
      question: 'Where would I go to look for housing options near the university?',
      answer: (
        <>
          To find housing, we typically recommend students to use the
          <Link href="https://offcampushousing.manoa.hawaii.edu/" target="_blank">  University of Hawaii Manoa housing </Link>
          site first.
        </>
      ),
    },
    {
      id: 'matches',
      question: 'How many matches can I have at a time?',
      answer: (
        <>
          We currently don&apos;t have a cap on how many people you can match with at once.
        </>
      ),
    },
  ];

  return (
    // page
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '40px 20px',
      }}
    >
      <Container style={{ maxWidth: '800px' }}>
        <h1
          className="text-center mb-4"
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50',
          }}
        >
          Frequently Asked Questions
          <p
            className="text-center text-muted mb-5"
            style={{ fontSize: '0.9rem' }}
          >
            Answers to commonly asked questions
          </p>
        </h1>
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            padding: '30px',
          }}
        >
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((faq) => (
              <FAQ
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                eventKey={faq.id.toString()}
              />
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
