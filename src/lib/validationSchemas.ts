import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddStudentSchema = Yup.object({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  hobbies: Yup.array().of(Yup.string()).required(), // <-- fixed
  bioInfo: Yup.string().required(),
  cleanliness: Yup.string()
    .oneOf(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .required(),
  noiseLevels: Yup.string()
    .oneOf(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .required(),
  major: Yup.string().required(),
  // profilePicture: Yup.mixed().optional(),
  // profilePicture: Yup.string().url().optional(),
});

export const EditStudentSchema = Yup.object({
  id: Yup.number().required(),
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  hobbies: Yup.array().of(Yup.string()).required(), // <-- fixed
  bioInfo: Yup.string().required(),
  cleanliness: Yup.string()
    .oneOf(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .required(),
  noiseLevels: Yup.string()
    .oneOf(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .required(),
  major: Yup.string().required(),
  // profilePicture: Yup.mixed().optional(),
  // profilePicture: Yup.string().url().optional(),
});
