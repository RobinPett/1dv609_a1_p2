class TaskUI {
    constructor(document, taskManager) {
        this.document = document
        this.taskManager = taskManager
    }

    renderTasks() {
        const taskList = this.document.createElement('div')
        taskList.setAttribute('id', 'task-list')

        const allTasks = this.taskManager.getTasks()

        allTasks.forEach(task => {
            const listElement = this.document.createElement('li')
            listElement.innerHTML = task.getName()
            taskList.appendChild(listElement)
        })

        this.document.body.appendChild(taskList)
    }
}

export default TaskUI