const apiUrl = 'http://localhost:54100/api/workflows';

// Create Workflow
const createWorkflowForm = document.getElementById('createWorkflowForm');
createWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const workflowName = document.getElementById('workflowName').value;
  const workflowDescription = document.getElementById('workflowDescription').value;

  const workflow = {
    name: workflowName,
    description: workflowDescription,
    status: 'IDLE', 
    dependencies: []
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
    const data = await response.json();
    alert('Workflow Created!');
  } catch (error) {
    alert('Error creating workflow');
  }
});

// Get Workflows
const getWorkflowsBtn = document.getElementById('getWorkflowsBtn');
getWorkflowsBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(apiUrl);
    const workflows = await response.json();
    const workflowList = document.getElementById('workflowList');
    workflowList.innerHTML = ''; 

    workflows.forEach(workflow => {
      const listItem = document.createElement('li');
      listItem.textContent = `${workflow.name} - Status: ${workflow.status} - Id : ${workflow._id}`;
      workflowList.appendChild(listItem);
    });
  } catch (error) {
    alert('Error fetching workflows');
  }
});

// Update Workflow
const updateWorkflowForm = document.getElementById('updateWorkflowForm');
updateWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const workflowId = document.getElementById('updateWorkflowId').value;
  const newStatus = document.getElementById('updateWorkflowStatus').value;

  const updatedWorkflow = { status: newStatus };

  try {
    const response = await fetch(`${apiUrl}/${workflowId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWorkflow),
    });
    alert('Workflow Updated!');
  } catch (error) {
    alert('Error updating workflow');
  }
});

// Delete Workflow
const deleteWorkflowForm = document.getElementById('deleteWorkflowForm');
deleteWorkflowForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const workflowId = document.getElementById('deleteWorkflowId').value;

  try {
    await fetch(`${apiUrl}/${workflowId}`, { method: 'DELETE' });
    alert('Workflow Deleted!');
  } catch (error) {
    alert('Error deleting workflow');
  }
});

// Add Task to Workflow
const addTaskForm = document.getElementById('addTaskForm');
addTaskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const taskWorkflowId = document.getElementById('taskWorkflowId').value;
  const taskName = document.getElementById('taskName').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskStatus = document.getElementById('taskStatus').value;
  const taskDependencies = document.getElementById('taskDependencies').value.split(',');

  const task = {
    name: taskName,
    description: taskDescription,
    status: taskStatus,
    dependencies: taskDependencies.map(dep => dep.trim())
  };

  try {
    const response = await fetch(`${apiUrl}/${taskWorkflowId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    alert('Task Added to Workflow!');
  } catch (error) {
    alert('Error adding task');
  }
});
