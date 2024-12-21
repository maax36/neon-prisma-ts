import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        const todos = await prisma.todo.findMany();
        return res.status(200).json(todos);
      }
      case 'POST': {
        const { text } = req.body;
        const newTodo = await prisma.todo.create({
          data: { text },
        });
        return res.status(201).json(newTodo);
      }
      default: {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Error: ${req.method}` });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
