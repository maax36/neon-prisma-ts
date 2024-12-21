import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID не указан' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const todo = await prisma.todo.findUnique({
          where: { id: Number(id) },
        });
        if (!todo) {
          return res.status(404).json({ error: `Todo с ID ${id} не найден` });
        }
        return res.status(200).json(todo);
      }
      case 'DELETE': {
        const deletedTodo = await prisma.todo.delete({
          where: { id: Number(id) },
        });
        return res
          .status(200)
          .json({ message: `Todo с ID ${id} удален`, deletedTodo });
      }
      default: {
        res.setHeader('Allow', ['GET', 'DELETE']);
        return res.status(405).json({ error: `Error:${req.method} ` });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
