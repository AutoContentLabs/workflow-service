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
}

module.exports = new WorkflowRepository();
