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
        const tasks = this.#storage.getItem(this.#key)
        return tasks ? tasks : []
    }
}

export default TaskStorage