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
        const taskIndex = this.#findTaskIndex(task)
        this.#tasks.splice(taskIndex, 1) // 1 todoItem to remove
    }

    toggleStatus(task) {
        const taskIndex = this.#findTaskIndex(task)
        this.#tasks[taskIndex].toggleStatus()
    }

    #findTaskIndex(task) {
        return this.#tasks.findIndex(t => t.getId() === task.getId())
    }
}

export default TodoManager