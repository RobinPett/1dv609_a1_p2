class TaskStorage {
    #storage

    constructor(localStorage) {
        this.#storage = localStorage
    }

    save(tasks) {
        this.#storage.setItem('Todo', JSON.stringify(tasks))
    }

    load() {
        return JSON.parse(this.#storage.getItem('Todo'))
    }
}

export default TaskStorage