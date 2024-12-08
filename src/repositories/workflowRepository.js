const { Workflow } = require('../models/mongoModel');

class WorkflowRepository {
    async createWorkflow(data) {
        return await Workflow.create(data);
    }

    async getWorkflowById(workflowId) {
        return await Workflow.findById(workflowId).populate('dependencies');
    }

    async getAllWorkflows() {
        return await Workflow.find();
    }

    async updateWorkflow(workflowId, updateData) {
        return await Workflow.findByIdAndUpdate(workflowId, updateData, { new: true });
    }

    async deleteWorkflow(workflowId) {
        return await Workflow.findByIdAndDelete(workflowId);
    }

    async addTaskToWorkflow(workflowId, taskId) {
        try {
            const workflow = await Workflow.findById(workflowId);
            workflow.steps.push(taskId);
            return await workflow.save();
        } catch (err) {
            throw new Error('Error adding task to workflow: ' + err.message);
        }
    }
}

module.exports = new WorkflowRepository();
