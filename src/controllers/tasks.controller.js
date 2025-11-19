import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error getting tasks" });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const updated = await prisma.task.update({
      where: { id },
      data: { title, description, status }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
