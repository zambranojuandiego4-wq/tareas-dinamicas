
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');


let tasks = [];

function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

      
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        li.appendChild(span);

        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

       
        if (!task.completed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn-complete';
            completeBtn.textContent = 'Completar';
            completeBtn.addEventListener('click', () => toggleCompleteTask(task.id));
            actionsDiv.appendChild(completeBtn);
        }

        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });

    updateCounters();
}


function addTask(text) {
    const newTask = {
        id: Date.now(), 
        text: text.trim(),
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
}


function toggleCompleteTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: true };
        }
        return task;
    });
    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}


todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const taskText = taskInput.value;
    
  
    if (taskText.trim() === '') return;

    addTask(taskText);
    taskInput.value = ''; 
});
