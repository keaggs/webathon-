const prisma = require("../lib/prismaClient");

// GET all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await prisma.todo.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};


// GET one list
exports.getOneList = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const list = await prisma.todo.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!list) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo" });
  }
};


// CREATE list
exports.createList = async (req, res) => {
  try {
    const { title, items } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const itemObjects = [];

    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        itemObjects.push({ name: items[i] });
      }
    }

    const newList = await prisma.todo.create({
      data: {
        title: title,
        items: {
          create: itemObjects
        }
      },
      include: { items: true }
    });

    res.status(201).json(newList);

  } catch (error) {
    res.status(500).json({ message: "Error creating todo list" });
  }
};


// UPDATE list + items
exports.updateList = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, items } = req.body;

    // update title
    const updatedList = await prisma.todo.update({
      where: { id },
      data: { title: title }
    });

    // delete old items
    await prisma.todoItem.deleteMany({
      where: { todoId: id }
    });

    // add new items
    if (Array.isArray(items)) {

      const itemObjects = [];

      for (let i = 0; i < items.length; i++) {
        itemObjects.push({
          name: items[i],
          todoId: id
        });
      }

      await prisma.todoItem.createMany({
        data: itemObjects
      });
    }

    const finalList = await prisma.todo.findUnique({
      where: { id },
      include: { items: true }
    });

    res.json(finalList);

  } catch (error) {
    res.status(500).json({ message: "Error updating todo list" });
  }
};


// DELETE list
exports.deleteList = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.todo.delete({
      where: { id }
    });

    res.json({ message: "Todo list deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting todo list" });
  }
};