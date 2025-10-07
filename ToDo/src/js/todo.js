import { ToDoController } from './controller.js';
import { TodoRender } from './controller.js';

(function() {
    const form = document.querySelector('#todo_form');
    const input = document.querySelector('#todo_input');
    const list = document.querySelector('#todo_list');

    const todoController = new ToDoController(list);
    const todoRenderer = new TodoRender(todoController);

    todoRenderer.render(todoController);
    todoRenderer.clearCompleted();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const task = input.value;
    
        todoController.addTodo(task);
        // Clear the list and re-render
        todoRenderer.render(todoController);
    });
})();
