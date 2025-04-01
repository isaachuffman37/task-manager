const Task = require('../models/index');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = new Task({ description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uncompleteAllTasks = async (req, res) => {
  try {
    let result = await Task.updateMany({}, { $set: { completed: false}})
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


exports.completeAllTasks = async (req, res) => {
  try {
    let result = await Task.updateMany({}, { $set: { completed: true}})
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteAllTasks = async (req, res) => {
  try {
    let result = await Task.deleteMany({});
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
