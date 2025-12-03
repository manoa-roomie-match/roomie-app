'use server';

import { Stuff, Condition, Ratings } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/** -----------------------------
 *  Create a new Student profile
 *  ----------------------------- */
export async function addStudent(studentData: {
  email: string;
  firstName: string;
  lastName: string;
  hobbies: string[];
  bioInfo: string;
  cleanliness: Ratings;
  noiseLevels: Ratings;
  major: string;
  profilePicture?: string;
}) {
  await prisma.student.create({
    data: {
      email: studentData.email,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      hobbies: studentData.hobbies,
      bioInfo: studentData.bioInfo,
      cleanliness: studentData.cleanliness,
      noiseLevels: studentData.noiseLevels,
      major: studentData.major,
      profilePicture: studentData.profilePicture, // optional, has default
    },
  });
}

/** -----------------------------
 *  Get a student by email
 *  ----------------------------- */
export async function getStudentByEmail(email: string) {
  await prisma.student.findUnique({
    where: { email },
  });
}

/** -----------------------------
 *  Get a student by ID
 *  ----------------------------- */
export async function getStudentById(id: number) {
  await prisma.student.findUnique({
    where: { id },
  });
}

/** -----------------------------
 *  Get all students (for listing / matching)
 *  ----------------------------- */
export async function getAllStudents() {
  await prisma.student.findMany({
    orderBy: { lastName: 'asc' },
  });
}

/** -----------------------------
 *  Update a Student profile
 *  ----------------------------- */
export async function updateStudent(id: number, updatedData: {
  email: string;
  firstName: string;
  lastName: string;
  hobbies: string[];
  bioInfo: string;
  cleanliness: Ratings;
  noiseLevels: Ratings;
  major: string;
  profilePicture?: string;
}) {
  await prisma.student.update({
    where: { id },
    data: {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      hobbies: updatedData.hobbies,
      bioInfo: updatedData.bioInfo,
      cleanliness: updatedData.cleanliness,
      noiseLevels: updatedData.noiseLevels,
      major: updatedData.major,
      profilePicture: updatedData.profilePicture,
    },
  });
}
