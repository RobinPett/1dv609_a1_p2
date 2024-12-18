import Task from "./Task.js"

class TaskManager {
    #tasks = []
    #storage

    constructor(storage) {
        this.#storage = storage
    }

    addTask(task) {
        const newTask = new Task(task)
        this.#tasks.push(newTask)
        this.#updateStorage()
    }

    getTasks() {
        return this.#tasks
    }

    removeTask(task) {
        const taskIndex = this.#findTaskIndex(task)
        this.#tasks.splice(taskIndex, 1) // 1 todoItem to remove
        this.#updateStorage()
    }

    toggleStatus(task) {
        const taskIndex = this.#findTaskIndex(task)
        this.#tasks[taskIndex].toggleStatus()
    }

    loadFromStorage() {
        const tasksFromStorage = this.#storage.load()

        if (!tasksFromStorage) return

        tasksFromStorage.forEach(task => {
            this.#tasks.push(new Task(task.name))
        })
    }

    #findTaskIndex(task) {
        return this.#tasks.findIndex(t => t.getId() === task.getId())
    }

    #updateStorage() {
        this.#storage.save(this.#tasks)
    }
}

export default TaskManager