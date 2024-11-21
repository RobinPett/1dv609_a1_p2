class TodoItem {
    #task = ''

    setTask(task) {
        this.#task = task
    }

    getTask() {
        return this.#task
    }
}

export default TodoItem