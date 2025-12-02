'use client';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // listens for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    // event.stopPropagation();
    console.log('hello world');

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setValidated(false);
  };

  return (
    // main page div
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px',
      }}
    >
      <Row className="w-100 m-0">
        <Col md={6}>
          <Container
            fluid
            style={{
              //   borderRadius: '30px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              padding: '40px',
            }}
          >
            <h1
              className="text-center mt-3"
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#2c3e50',
              }}
            >
              Contact Us
            </h1>
            <p
              className="text-center text-muted mb-4"
              style={{ fontSize: '0.95rem' }}
            >
              Have a question? We&apos;re here to help!
            </p>
            {submitted ? (
              <Alert
                variant="success"
                className="text-center py-4"
                style={{ borderRadius: '12px' }}
              >
                <div className="text-center py-5">
                  <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    ✅ Thank You!
                  </h3>
                  <p className="mb-3">
                    Your message has been successfully sent. We&apos;ll get back
                    to you within 24 hours.
                  </p>
                </div>
                <Button
                  variant="outline-success"
                  onClick={handleReset}
                  size="sm"
                >
                  Send Another Message
                </Button>
              </Alert>
            ) : (
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500' }}>
                        First Name
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John"
                        required
                        disabled={isSubmitting}
                        style={{
                          borderRadius: '8px',
                          padding: '10px 14px',
                          border: '1.5px solid #dee2e6',
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="mt-3 mt-sm-0">
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500' }}>
                        Last Name
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Doe"
                        required
                        disabled={isSubmitting}
                        style={{
                          borderRadius: '8px',
                          padding: '10px 14px',
                          border: '1.5px solid #dee2e6',
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: '500' }}>
                    Email Address
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="john.doe@hawaii.edu"
                    required
                    disabled={isSubmitting}
                    style={{
                      borderRadius: '8px',
                      padding: '10px 14px',
                      border: '1.5px solid #dee2e6',
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '500' }}>
                    Your Message
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    required
                    disabled={isSubmitting}
                    style={{
                      borderRadius: '8px',
                      padding: '10px 14px',
                      border: '1.5px solid #dee2e6',
                      resize: 'none',
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your message.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: 'none',
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>
            )}
          </Container>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h2 className="mb-3">Get in Touch</h2>
            <p className="mb-2">
              <strong>Email: </strong>
              contact@example.com
            </p>
            <p className="mb-2">
              <strong>Phone: </strong>
              (123) 456-7890
            </p>
            <p className="mb-2">
              <strong>Address: </strong>
              123 Main Street, City, State 12345
            </p>
            <p className="mt-4">
              We&apos;d love to hear from you! Fill out the form and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
