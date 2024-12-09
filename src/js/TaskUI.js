class TaskUI {
    constructor(document, taskManager) {
        this.document = document
        this.taskManager = taskManager
    }

    renderTasks() {
        const taskList = this.document.createElement('div')
        taskList.setAttribute('id', 'task-list')

        const listedTask = this.document.createElement('li')
        listedTask.innerHTML = 'Buy milk'

        taskList.appendChild(listedTask)
        this.document.body.appendChild(taskList)
    }
}

export default TaskUI