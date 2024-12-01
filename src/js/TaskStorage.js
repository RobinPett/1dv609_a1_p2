class TaskStorage {
    storedTasks = []

    save(tasks) {
        tasks.forEach(task => {
            this.storedTasks.push(task)
        })
    }

    load() {
        return this.storedTasks
    }
}

export default TaskStorage