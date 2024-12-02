class TaskStorage {
    #storage

    constructor(localStorage) {
        this.#storage = localStorage
    }

    save(tasks) {
        this.#storage.setItem('Todo', JSON.stringify(tasks))
    }

    load() {
        if (this.#storage.getItem('Todo')) {
            return JSON.parse(this.#storage.getItem('Todo'))
        } else {
            return []
        }
    }
}

export default TaskStorage