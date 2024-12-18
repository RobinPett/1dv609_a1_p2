import Task from './Task.js'

class TaskStorage {
    #storage
    key = 'Todo'

    constructor(localStorage) {
        this.#storage = localStorage
    }

    save(tasks) {
        const tasksToSave = tasks.map(task => {
            if (!(task instanceof Task)) throw new Error('Array must contain Tasks')
            return {name: task.getName(), id: task.getId(), completed: task.isCompleted()}
        })

        this.#storage.setItem(this.key, JSON.stringify(tasksToSave))
    }

    load() {
        const tasks = this.#storage.getItem(this.key)
        return tasks ? JSON.parse(tasks) : []
    }
}

export default TaskStorage