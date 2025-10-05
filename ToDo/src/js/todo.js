import { ToDoController } from './controller.js';

(function() {
    const form = document.querySelector('#todo_form');
    const input = document.querySelector('#todo_input');
    const list = document.querySelector('#todo_list');

    const todoController = new ToDoController();
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const task = input.value;
        console.log(task);


        todoController.addTodo(task);
        
        // Clear the list and re-render
        list.innerHTML = '';
        todoController.getTodos().forEach(todo => {
            const listItem = document.createElement('li');
            const listCheckbox = document.createElement('input');
            listCheckbox.type = 'checkbox';
            listCheckbox.checked = todo.completed;

            const listText = document.createElement('span');
            listText.textContent = todo.task;

            const listButton = document.createElement('button');
            listButton.addEventListener('click', function() {
                todoController.deleteTodo(todo.id);
                list.removeChild(listItem);
                console.log(todoController.getTodos());
            });

            listItem.appendChild(listCheckbox);
            listItem.appendChild(listText);
            listItem.appendChild(listButton);
            list.appendChild(listItem);
        });
        
    });
})();
