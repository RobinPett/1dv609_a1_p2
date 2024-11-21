class TodoItem {
    #task
    #status = 0

    constructor(task) {
        this.checkTaskName(task)
        this.#task = task
    }

    setTask(task) {
        this.checkTaskName(task)
        this.#task = task
    }

    getTask() {
        return this.#task
    }

    checkTaskName(task) {
        if (typeof task !== "string") {
            throw new Error("Task name must be a string")
        }
    }

    toggleStatus() {
        if (this.#status === 0) {
            this.#status = 1
        } else {
            this.#status = 0
        }
    }

    getStatus() {
        return this.#status
    }
}

export default TodoItem