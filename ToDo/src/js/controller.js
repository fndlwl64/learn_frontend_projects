export class ToDoController {
    constructor() {
        this.todos = [];
    }   
    addTodo(task) {
        const todo = { id: Date.now(), task, completed: false };
        this.todos.push(todo);
        return todo;
    }
    getTodos() {
        return this.todos;
    }   
    toggleComplete(id) {

        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            return todo;
        }
        return null;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }
}
