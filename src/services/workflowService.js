const workflowRepository = require('../repositories/workflowRepository');

const axios = require('axios');
const taskServiceUrl = process.env.TASK_SERVICE_URL

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

    async addTaskToWorkflow(workflowId, taskId) {
        return await workflowRepository.addTaskToWorkflow(workflowId, taskId)
    }

    async startWorkflow(workflowId) {
        try {
            const workflow = await workflowRepository.getWorkflowById(workflowId);

            if (!workflow) {
                throw new Error('Workflow not found');
            }

            for (const task of workflow.steps) {
                await axios.put(`${taskServiceUrl}/${task._id}`, { status: 'RUNNING' });
                console.log(`Task ${task.name} is now RUNNING`);


                await checkTaskDependencies(task._id);

                await axios.put(`${taskServiceUrl}/${task._id}`, { status: 'COMPLETED' });
                console.log(`Task ${task.name} is now COMPLETED`);
            }

            console.log('Workflow completed successfully');
        } catch (err) {
            console.error('Error during workflow execution:', err.message);
            throw err;
        }
    };

    async checkTaskDependencies(taskId) {
        try {
            const task = await axios.get(`${taskServiceUrl}/${taskId}`);

            if (task.data.dependencies && task.data.dependencies.length > 0) {
                for (const depId of task.data.dependencies) {
                    await this.checkTaskDependencies(depId);
                }
            }
        } catch (err) {
            console.error(`Error checking dependencies for task ${taskId}:`, err.message);
            throw err;
        }
    };
}

module.exports = new WorkflowService();
