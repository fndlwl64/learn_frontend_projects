export class ToDoController {
    constructor(list) {
        this.todos = this.getTodos();
        this.list = list;
    }   
    addTodo(task) {
        const todo = { id: Date.now(), task, completed: false };
        if(this.todos.find(t => t.task === task)) {
            alert('Task already exists!');
            return null;
        }
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        return todo;
    }
    getTodos() {
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    }
    checkTodo(id, completed) {
        this.todos = this.getTodos().map(t => t.id === id ? { ...t, completed } : t);        
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    deleteTodo(id) {
        this.todos = this.getTodos().filter(t => t.id !== id);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

export class TodoRender{
    constructor(controller){
        this.controller = controller;
    }
    render(){
        const todoController = this.controller;  
        if(todoController instanceof ToDoController){
            if(todoController.getTodos().length >= 10){
                alert('최대 10개 까지 할 일을 추가할 수 있습니다.');               
                return;
            }

            todoController.list.innerHTML = '';
            todoController.getTodos().forEach(function(todo) {
                const listItem = document.createElement('li');
                const listCheckbox = document.createElement('input');
                
                // checkbox
                listCheckbox.type = 'checkbox';
                listCheckbox.checked = todo.completed;
                listCheckbox.addEventListener('change', function() {
                    todoController.checkTodo(todo.id, listCheckbox.checked);
                });

                // text
                const listText = document.createElement('span');
                listText.textContent = todo.task;
            
                // delete button
                const listButton = document.createElement('button');
                listButton.addEventListener('click', function() {
                    todoController.deleteTodo(todo.id);
                    todoController.list.removeChild(listItem);
                });
            
                listItem.appendChild(listCheckbox);
                listItem.appendChild(listText);
                listItem.appendChild(listButton);
                todoController.list.appendChild(listItem);
            });
        }else{
            console.error('Invalid controller instance');
        }
            
    }
    clearCompleted(){
        const deleteButton = document.querySelector('#todo_clear_completed');
        const todoController = this.controller;

        deleteButton.addEventListener('click', function(){
            if(todoController instanceof ToDoController){
                todoController.todos = todoController.getTodos().filter(t => !t.completed);
                localStorage.setItem('todos', JSON.stringify(todoController.todos));
                this.render();
            }
        }.bind(this));
        
    }
}