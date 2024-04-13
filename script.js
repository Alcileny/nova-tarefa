document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDateInput = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;
        if (taskText !== '' && taskDate !== '') {
            addTask(taskText, taskDate);
            taskInput.value = '';
            taskDateInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    function addTask(text, date) {
        const li = document.createElement('li');
        li.textContent = text + ' - ' + formatDate(date);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Concluir';
        completeButton.addEventListener('click', function() {
            li.remove();
            removeTask(text, date);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            li.remove();
            removeTask(text, date);
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        saveTask({text: text, date: date});
    }

    function saveTask(task) {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    function removeTask(text, date) {
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks = savedTasks.filter(task => !(task.text === text && task.date === date));
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            addTask(task.text, task.date);
        });
    }

    loadTasks();
});