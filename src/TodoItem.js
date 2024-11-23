class TodoItem {
    #task
    #id
    #status = 0

    constructor(task) {
        this.checkTaskName(task)
        this.#generateId()
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

    /**
     * Generate a unique id.
     * Taken from: https://stackoverflow.com/a/53116778
     * 
     * @returns 
     */
    #generateId() {
        this.#id = Date.now().toString(36) + Math.random().toString(36).substring(2)
    }

    getId() {
        return this.#id
    }
}

export default TodoItem