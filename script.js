let tasks = [];


fetchTasks();

document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('toggleSwitch').addEventListener('change', toggleMode);

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks'); 
        tasks = await response.json();
        console.log('Fetched tasks:', tasks); 
        displayTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = { text: taskText, completed: false };

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });
            const addedTask = await response.json();
            console.log('Added task:', addedTask); // 
            tasks.push(addedTask);
            displayTasks();
            taskInput.value = '';
        } catch (error) {
            console.error('Error adding task:', error);
        }
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

