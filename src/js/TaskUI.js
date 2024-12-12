class TaskUI {
    #document
    #taskManager

    constructor(document, taskManager) {
        this.#document = document
        this.#taskManager = taskManager
    }

    renderTasks() {
        const taskList = this.#document.createElement('div')
        taskList.setAttribute('id', 'task-list')

        const allTasks = this.#taskManager.getTasks()

        allTasks.forEach(task => {
            const { listElement, checkbox } = this.createTaskElements(task)
            checkbox.addEventListener('change', (event) => task.toggleStatus())
            
            if(task.isCompleted()) { 
                checkbox.click() 
            }

            taskList.appendChild(listElement)
        })

        this.#document.body.appendChild(taskList)
    }

    createTaskElements(task) {
        const listElement = this.#document.createElement('li')
        listElement.innerHTML = task.getName()
        listElement.setAttribute('id', task.getId())

        const checkbox = this.#document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        listElement.appendChild(checkbox)

        return {listElement, checkbox}
    }

    renderUI() {
        const form = this.#document.createElement('form')
        form.setAttribute('id', 'task-form')
        this.#document.body.appendChild(form)

        const textInput = this.#document.createElement('input')
        textInput.setAttribute('type', 'text')
        form.appendChild(textInput)

        const submitButton = this.#document.createElement('input')
        submitButton.setAttribute('type', 'submit')
        form.appendChild(submitButton)

        form.addEventListener('submit', (event) => {this.handleSubmit(event, textInput)})
    }

    handleSubmit(event, textInput) {
        event.preventDefault()
        const taskName = textInput.value
        this.#taskManager.addTask(taskName)
    }
}

export default TaskUI