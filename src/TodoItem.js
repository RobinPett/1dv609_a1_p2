class TodoItem {
    #task

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
}

export default TodoItem