let tasks = [];

document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText, completed: false }); // Store task with completed status
        displayTasks(); // Update the displayed tasks
        taskInput.value = ''; // Clear input field
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked; // Update completed status
            if (task.completed) {
                alert(`Congratulations! You completed: "${task.text}"`);
            }
            displayTasks(); // Refresh the list
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));

        // Optionally, style completed tasks differently
        if (task.completed) {
            li.style.textDecoration = 'line-through'; // Strike-through for visual indication
            li.style.color = 'gray'; // Change color for completed tasks
        }

        taskList.appendChild(li);
    });
}

