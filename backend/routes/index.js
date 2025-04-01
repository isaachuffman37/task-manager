const express = require('express');
const router = express.Router();
const taskController = require('../controllers/index');

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/uncomplete', taskController.uncompleteAllTasks)
router.put('/tasks/complete', taskController.completeAllTasks)
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks', taskController.deleteAllTasks);
router.delete('/tasks/:id', taskController.deleteTask);


module.exports = router;
