let tasks = [];

// Fetch tasks from the API when the page loads
fetchTasks();

document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('toggleSwitch').addEventListener('change', toggleMode);

// Function to fetch tasks from the server
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        
        tasks = data || [];
        console.log('Tasks:', tasks);
        displayTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = { 
            title: taskText, 
            description: '', 
            completed: false 
        };

        tasks.push(newTask);
        displayTasks();
        saveTask(newTask);
        taskInput.value = ''; 
    }
}

// Function to save a new task to the server
async function saveTask(newTask) {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const savedTask = await response.json();
        console.log('Saved task:', savedTask);
        
        newTask.id = savedTask.id;
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

// Function to update a task's completion status on the server
async function updateTask(task) {
    try {
        await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

// Function to display tasks on the webpage
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked;
            displayTasks(); 
            updateTask(task);
            if (task.completed) {
                alert(`Congratulations! You completed: "${task.title}"`);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.title));

        if (task.completed) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }

        taskList.appendChild(li);
    });
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}
