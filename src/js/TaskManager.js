import Task from "./Task"

class TaskManager {
    #tasks = []
    #storage

    constructor(storage) {
        this.#storage = storage
    }

    addTask(task) {
        const newTask = new Task(task)
        this.#tasks.push(newTask)
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

    loadFromStorage() {
        this.#tasks.push(new Task('Buy Milk'))
        this.#storage.load()
    }

    #findTaskIndex(task) {
        return this.#tasks.findIndex(t => t.getId() === task.getId())
    }
}

export default TaskManager