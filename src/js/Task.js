class Task {
    #id
    #name
    #completed = false

    constructor(name) {
        this.checkName(name)
        this.#generateId()
        this.#name = name
    }

    setName(name) {
        this.checkName(name)
        this.#name = name
    }

    getName() {
        return this.#name
    }

    checkName(name) {
        if (typeof name !== "string" || name.length < 1) {
            throw new Error("Task name must be a string")
        }
    }

    toggleStatus() {
        this.#completed = !this.#completed
    }

    isCompleted() {
        return this.#completed
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

export default Task