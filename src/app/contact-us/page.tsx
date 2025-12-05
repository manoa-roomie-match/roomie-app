'use client';

/* eslint-disable import/no-extraneous-dependencies */
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactUs() {
  const RECAPTCHA_SITE_KEY = '6Ldi9SEsAAAAALP8REihLnmS1j9qed2KWUt_9Zgz';

  const [capVal, setCapVal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const handleCaptcha = (token: string | null) => {
    setCapVal(token !== null); // or setCapVal(token !== null);

    if (token) {
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
    }
  };

  // listens for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log('hello world');

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if (!capVal) {
      setCaptchaError(true);
      // alert('Please complete the reCAPTCHA verification before submitting.');
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
    setCapVal(false);
    setCaptchaError(false);
  };

  return (
    // main page div
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px',
      }}
    >
      <Container
        fluid
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          padding: '40px',
          maxWidth: '1000px',
        }}
      >
        <h1
          className="text-center mb-2"
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

        <Row className="g-4">
          <Col lg={7}>
            {/* if form is submitted */}
            {submitted ? (
              <Alert
                variant="success"
                className="text-center py-4"
                style={{ borderRadius: '12px' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  Thank You!
                </h3>
                <p className="mb-3">
                  Your message has been successfully sent. We&apos;ll get back
                  to you within 24 hours.
                </p>
                <Button
                  variant="outline-success"
                  onClick={handleReset}
                  size="sm"
                >
                  Send Another Message
                </Button>
              </Alert>
            ) : (
              // Form
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  {/* first name */}
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
                  {/* last name */}
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
                {/* email */}
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
                {/* message */}
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
                {/* captcha this is setup through google recaptcha v2 */}
                <div className="mb-3">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptcha}
                  />
                  {captchaError && (
                    <div
                      style={{
                        color: '#dc3545',
                        fontSize: '0.875rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      Please complete the reCAPTCHA verification.
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={!capVal && isSubmitting}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: 'none',
                    background:
                      'linear-gradient(135deg, #4f8b51ff 0%, #f3d948ff 100%)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  // hover over "send message button causes levitation of the button & slight shadow"
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
                  {/* processing the submission, displays "sending" in button */}
                  {isSubmitting && capVal ? (
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
          </Col>
          <Col lg={5}>
            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '30px',
                height: '100%',
              }}
            >
              <h2
                className="mb-4 text-center"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2c3e50',
                }}
              >
                Get in Touch
              </h2>

              <div className="mb-3">
                <p className="mb-2" style={{ lineHeight: '1.6' }}>
                  <strong style={{ color: '#2c3e50' }}>Email:</strong>
                  <br />
                  <a
                    href="mailto:admin@hawaii.edu"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                    }}
                  >
                    admin@hawaii.edu
                  </a>
                </p>
              </div>

              <div
                className="mb-3"
                style={{
                  borderTop: '2px solid #dee2e6',
                  paddingTop: '10px',
                }}
              >
                <p className="mb-2" style={{ lineHeight: '1.6' }}>
                  <strong style={{ color: '#2c3e50' }}>Phone:</strong>
                  <br />
                  <a
                    href="tel:+11234567890"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                    }}
                  >
                    (123) 456-7890
                  </a>
                </p>
              </div>

              <div
                className="mb-4"
                style={{
                  borderTop: '2px solid #dee2e6',
                  paddingTop: '10px',
                }}
              >
                <p className="mb-2" style={{ lineHeight: '1.6' }}>
                  <strong style={{ color: '#2c3e50' }}>Address:</strong>
                  <br />
                  <span style={{ color: '#6c757d' }}>
                    321 Manoa Rooms St
                    <br />
                    Honolulu, Hawaii 96822
                  </span>
                </p>
              </div>

              <div
                style={{
                  borderTop: '2px solid #dee2e6',
                  paddingTop: '10px',
                }}
              >
                <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
                  We&apos;d love to hear from you! Fill out the form and
                  we&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
