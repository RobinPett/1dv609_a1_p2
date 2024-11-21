import TodoItem from "../TodoItem"

class TodoManager {
    #tasks = []

    addTask(task) {
        const todoItem = new TodoItem(task)
        this.#tasks.push(todoItem)
    }

    getTasks() {
        return this.#tasks
    }
}

export default TodoManager