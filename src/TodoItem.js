class TodoItem {
    #task

    constructor(task) {
        this.#task = task
    }

    setTask(task) {
        this.#task = task
    }

    getTask() {
        return this.#task
    }
}

export default TodoItem