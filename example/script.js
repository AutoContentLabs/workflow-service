// script.js

const apiUrl = 'http://localhost:50000/api/workflows';  // Write your API URL here

// Create Workflow
const createWorkflowForm = document.getElementById('createWorkflowForm');
createWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const workflowName = document.getElementById('workflowName').value;
  const workflowDescription = document.getElementById('workflowDescription').value;

  const workflow = {
    name: workflowName,
    description: workflowDescription,
    status: 'IDLE',  // Default status
    dependencies: []
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflow),
    });

    const data = await response.json();
    console.log('Workflow Created:', data);
    alert('Workflow Created!');
  } catch (error) {
    console.error('Error creating workflow:', error);
    alert('Error creating workflow');
  }
});

// Get all workflows
const getWorkflowsBtn = document.getElementById('getWorkflowsBtn');
getWorkflowsBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(apiUrl);
    const workflows = await response.json();
    const workflowList = document.getElementById('workflowList');
    workflowList.innerHTML = ''; // Clear

    workflows.forEach(workflow => {
      const listItem = document.createElement('li');
      listItem.textContent = `${workflow.name} - Status: ${workflow.status}`;
      workflowList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    alert('Error fetching workflows');
  }
});

// Update Workflow
const updateWorkflowForm = document.getElementById('updateWorkflowForm');
updateWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const workflowId = document.getElementById('updateWorkflowId').value;
  const newStatus = document.getElementById('updateWorkflowStatus').value;

  const updatedWorkflow = {
    status: newStatus
  };

  try {
    const response = await fetch(`${apiUrl}/${workflowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWorkflow),
    });

    const data = await response.json();
    console.log('Workflow Updated:', data);
    alert('Workflow Updated!');
  } catch (error) {
    console.error('Error updating workflow:', error);
    alert('Error updating workflow');
  }
});

// Delete Workflow
const deleteWorkflowForm = document.getElementById('deleteWorkflowForm');
deleteWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const workflowId = document.getElementById('deleteWorkflowId').value;

  try {
    const response = await fetch(`${apiUrl}/${workflowId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Workflow Deleted!');
    } else {
      alert('Failed to delete workflow');
    }
  } catch (error) {
    console.error('Error deleting workflow:', error);
    alert('Error deleting workflow');
  }
});
