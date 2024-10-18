let tasks = [];


fetchTasks();

document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('toggleSwitch').addEventListener('change', toggleMode);

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks'); // Adjust this URL as needed
        tasks = await response.json();
        displayTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = { text: taskText, completed: false };
        
        
        tasks.push(newTask);
        displayTasks();
        
        
        saveTask(newTask);

        taskInput.value = '';
    }
}

async function saveTask(newTask) {
    try {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked;
            if (task.completed) {
                alert(`Congratulations! You completed: "${task.text}"`);
            }
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));

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


displayTasks();
