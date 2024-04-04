import {PrismaClient} from '@prisma/client';
import e from 'express';

const prisma = new PrismaClient();

export async function checkExistingUserData(req, res, next) {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (username && username !== user[0].username) {
      const confirmUsername = await prisma.user.findUnique({
        where: {
          username: username
        }
      });
      if (confirmUsername.length > 0 && username !== user[0].username) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    if (email && email !== user[0].email) {

      const confirmEmail = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      if (confirmEmail.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking existing user data" });
  }
}

export default checkExistingUserData;
