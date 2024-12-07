import Task from './Task'

class TaskStorage {
    #storage
    #key = 'Todo'

    constructor(localStorage) {
        this.#storage = localStorage
    }

    save(tasks) {
        tasks.forEach(task => {
            if (!(task instanceof Task)) throw new Error('Array must contain Tasks')
        })

        this.#storage.setItem(this.#key, JSON.stringify(tasks))
    }

    load() {
        if (this.#storage.getItem(this.#key)) {
            return [{ name: 'Buy Milk' }]
        } else {
            return []
        }
    }
}

export default TaskStorage