'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, Image, FormControlProps } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStudentSchema } from '@/lib/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const CreateProfileForm: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStudentSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  const onSubmit = async (submitData: { email: string, firstName: string, lastName: string, 
    hobbies: (string | undefined)[], bioInfo: string,
    cleanliness: "THREE" | "TWO" | "ONE" | "FOUR" | "FIVE",
    noiseLevels: "THREE" | "TWO" | "ONE" | "FOUR" | "FIVE",
    major: string}) => {
      // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
      console.log('Submitted student profile data:', submitData);
      try {
      let photo_url = null;

      // 1. Upload to Supabase Storage if a file was selected
      if (photoFile) {
      const form = new FormData();
      form.append("file", photoFile);

      const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: form,
      });

      const uploadData = await uploadRes.json();
      photo_url = uploadData.publicUrl;
      }

      console.log('Photo URL:', photo_url);
      // await addStuff(submitData);

      swal('Success', 'Your item has been added', 'success', {
      timer: 2000,
      });
      } catch (err) {
      console.error(err);
      swal("Error", "Failed to save profile", "error");
      }
      };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('Selected file:', file);
    if (!file) return;
  
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container className="py-3">
        <Row className='justify-content-center'>
          <Col className="text-center">
            <h1>Create Profile</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={4}>
              <Card>
                <Card.Header className='text-center'>
                    <h2>Upload profile pic</h2>
                </Card.Header>
                <Card.Body className="text-center">
                  {preview && (
                    <Image
                      src={preview}
                      alt="Profile Preview"
                      roundedCircle
                      fluid
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <Form.Group className="mt-3">
                    <Form.Label>Choose a profile picture</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
          </Col>
          <Col xs={6}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                    <input type="hidden" {...register('email')} value={currentUser} />
                      <Form.Label>First Name</Form.Label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Biography</Form.Label>
                  <input
                    type="text"
                    {...register('bioInfo')}
                    className={`form-control ${errors.bioInfo ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.bioInfo?.message}</div>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Cleanliness Level</Form.Label>
                      <select {...register('cleanliness')} className={`form-control ${errors.cleanliness ? 'is-invalid' : ''}`}>
                        <option value="FIVE">5</option>
                        <option value="FOUR">4</option>
                        <option value="THREE">3</option>
                        <option value="TWO">2</option>
                        <option value="ONE">1</option>
                      </select>
                      <div className="invalid-feedback">{errors.cleanliness?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Noise Level</Form.Label>
                      <select {...register('noiseLevels')} className={`form-control ${errors.noiseLevels ? 'is-invalid' : ''}`}>
                      `<option value="FIVE">5</option>
                        <option value="FOUR">4</option>
                        <option value="THREE">3</option>
                        <option value="TWO">2</option>
                        <option value="ONE">1</option>
                      </select>
                      <div className="invalid-feedback">{errors.noiseLevels?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Major</Form.Label>
                  <input
                    type="text"
                    {...register('major')}
                    className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.major?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Hobbies</Form.Label>
                  <Controller
                    name="hobbies"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={[
                          { value: "Surfing", label: "Surfing" },
                          { value: "Painting", label: "Painting" },
                          { value: "Reading", label: "Reading" },
                          { value: "Cooking", label: "Cooking" },
                          { value: "Gaming", label: "Gaming" },
                          { value: "Hiking", label: "Hiking" },
                          { value: "Photography", label: "Photography" },
                          { value: "Music", label: "Music" },
                          { value: "Traveling", label: "Traveling" },
                          { value: "Writing", label: "Writing" }
                        ]}
                        isMulti
                        onChange={(opts) => field.onChange(opts.map(o => o.value))}
                        value={
                          field.value
                            ? field.value
                                .filter((v): v is string => typeof v === 'string')
                                .map((v) => ({ value: v, label: v }))
                            : []
                        }
                        className={errors.hobbies ? "is-invalid" : ""}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {errors.hobbies?.message}
                  </div>
                </Form.Group>


                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Form>

  );
};

export default CreateProfileForm;
