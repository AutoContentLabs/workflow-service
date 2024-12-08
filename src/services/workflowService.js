const workflowRepository = require('../repositories/workflowRepository');

class WorkflowService {
    async createWorkflow(workflowData) {
        return await workflowRepository.createWorkflow(workflowData);
    }

    async getWorkflowById(workflowId) {
        return await workflowRepository.getWorkflowById(workflowId);
    }

    async getAllWorkflows() {
        return await workflowRepository.getAllWorkflows();
    }

    async updateWorkflow(workflowId, updateData) {
        return await workflowRepository.updateWorkflow(workflowId, updateData);
    }

    async deleteWorkflow(workflowId) {
        return await workflowRepository.deleteWorkflow(workflowId);
    }
}

module.exports = new WorkflowService();
