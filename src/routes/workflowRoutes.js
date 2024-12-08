const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/workflows', workflowController.createWorkflow);
router.get('/workflows', workflowController.getAllWorkflows);
router.get('/workflows/:id', workflowController.getWorkflowById);
router.put('/workflows/:id', workflowController.updateWorkflow);
router.delete('/workflows/:id', workflowController.deleteWorkflow);

router.post('/workflows/:id/tasks', workflowController.addTaskToWorkflow);
router.post('/workflows/:id/start', workflowController.startWorkflow);

module.exports = router;