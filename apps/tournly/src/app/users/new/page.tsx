'use server';

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as UserRole;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  redirect('/users');
}

export default async function NewUserPage() {
  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Create User</h1>
      <form action={createUser} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          className="w-full p-2 border rounded"
          defaultValue="USER"
        >
          <option value="USER">User</option>
          <option value="COACH">Coach</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
