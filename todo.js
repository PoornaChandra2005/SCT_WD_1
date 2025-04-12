document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('newTodo');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos') || '[]');

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.dataset.id = todo.id;

        const checkbox = document.createElement('button');
        checkbox.className = `todo-checkbox ${todo.completed ? 'completed' : ''}`;
        checkbox.innerHTML = todo.completed ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : '';

        const text = document.createElement('span');
        text.className = `todo-text ${todo.completed ? 'completed' : ''}`;
        text.textContent = todo.text;

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'todo-button edit';
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-button delete';
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>';

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(text);
        todoItem.appendChild(actions);

        // Event Listeners
        checkbox.addEventListener('click', () => toggleTodo(todo.id));
        editBtn.addEventListener('click', () => startEditing(todo.id));
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        return todoItem;
    }

    function addTodo() {
        const text = newTodoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text,
            completed: false
        };

        todos.push(todo);
        saveTodos();
        todoList.appendChild(createTodoElement(todo));
        newTodoInput.value = '';
    }

    function toggleTodo(id) {
        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) return;

        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function startEditing(id) {
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const text = todoItem.querySelector('.todo-text');
        const currentText = text.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'todo-input';

        function saveEdit() {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                const index = todos.findIndex(todo => todo.id === id);
                if (index !== -1) {
                    todos[index].text = newText;
                    saveTodos();
                    renderTodos();
                }
            } else {
                text.textContent = currentText;
            }
            todoItem.replaceChild(text, input);
        }

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });

        todoItem.replaceChild(input, text);
        input.focus();
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            todoList.appendChild(createTodoElement(todo));
        });
    }

    // Event Listeners
    addTodoBtn.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});
