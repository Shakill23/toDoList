let todoList = [];

document.getElementById('addButton').addEventListener('click', addItem);
document.getElementById('sortButton').addEventListener('click', sortItems);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

function addItem() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName.length < 3 || taskName[0] !== taskName[0].toUpperCase()) {
        alert('Task must be at least 3 characters long and start with an uppercase letter.');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        createdDate: new Date(),
        completed: false
    };

    todoList.push(newTask);
    taskInput.value = '';
    renderList();
}

function renderList() {
    const ul = document.getElementById('todoList');
    ul.innerHTML = '';

    todoList.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                <button class="close" onclick="removeItem(${task.id})">x</button>
            </div>
        `;
        ul.appendChild(li);
    });
}

function toggleComplete(id) {
    const task = todoList.find(task => task.id === id);
    task.completed = !task.completed;
    renderList();
}

function removeItem(id) {
    todoList = todoList.filter(task => task.id !== id);
    renderList();
}

function sortItems() {
    todoList.sort((a, b) => a.name.localeCompare(b.name));
    renderList();
}

