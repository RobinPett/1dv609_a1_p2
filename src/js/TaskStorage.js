class TaskStorage {
    #storage
    #key

    constructor(localStorage) {
        this.#storage = localStorage
    }

    save(tasks) {
        this.#storage.setItem(this.#key, JSON.stringify(tasks))
    }

    load() {
        return this.#getItem() ? JSON.parse(this.#getItem()) : []
    }

    #getItem() {
        return this.#storage.getItem(this.#key)
    }
}

export default TaskStorage