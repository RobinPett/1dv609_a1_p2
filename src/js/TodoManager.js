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

    removeTask(task) {
        const taskIndex = this.#tasks.findIndex(t => t.getId() === task.getId())
        this.#tasks.splice(taskIndex, 1) // 1 todoItem to remove
    }
}

export default TodoManager