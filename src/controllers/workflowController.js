const workflowService = require('../services/workflowService');

class WorkflowController {
    async createWorkflow(req, res) {
        try {
            const newWorkflow = await workflowService.createWorkflow(req.body);
            res.status(201).json(newWorkflow);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getWorkflowById(req, res) {
        try {
            const workflow = await workflowService.getWorkflowById(req.params.id);
            res.status(200).json(workflow);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllWorkflows(req, res) {
        try {
            const workflows = await workflowService.getAllWorkflows();
            res.status(200).json(workflows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateWorkflow(req, res) {
        try {
            const updatedWorkflow = await workflowService.updateWorkflow(req.params.id, req.body);
            res.status(200).json(updatedWorkflow);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteWorkflow(req, res) {
        try {
            await workflowService.deleteWorkflow(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new WorkflowController();
