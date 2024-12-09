class TaskUI {
    constructor(document, taskManager) {
        this.document = document
        this.taskManager = taskManager
    }

    renderTasks() {
        const renderTask = this.document.createElement('li')
        renderTask.innerHTML = 'Buy Milk'
    }
}

export default TaskUI