import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: (role as UserRole) ?? 'USER',
      },
    });

    res.status(201).json(user);
  } catch (error: any) {
    // console.error(error);
    // if (error.code === 'P2002') {
    //   return res.status(409).json({ message: 'Email already exists' });
    // }
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
