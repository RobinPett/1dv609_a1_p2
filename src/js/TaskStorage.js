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
        return this.#storage.getItem(this.#key) ? [{ name: 'Buy Milk', id: 'mockId', completed: false }] : []
    }
}

export default TaskStorage