let tasks = [];

document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('toggleSwitch').addEventListener('change', toggleMode);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        displayTasks();
        taskInput.value = '';
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
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


