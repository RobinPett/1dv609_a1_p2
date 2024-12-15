class TaskUI {
    #document
    #taskManager

    constructor(document, taskManager) {
        this.#document = document
        this.#taskManager = taskManager
        this.#renderUI()
        this.taskList = this.createTaskList()
        this.#document.body.appendChild(this.taskList)
    }

    renderTasks() {
        this.taskList.innerHTML = '' // Remove all previous children

        const allTasks = this.#taskManager.getTasks()
        allTasks.forEach(task => {
            const { listElement, checkbox } = this.createTaskElements(task)
            checkbox.addEventListener('change', (event) => task.toggleStatus())
            
            if(task.isCompleted()) { 
                checkbox.click() 
            }

            this.taskList.appendChild(listElement)
        })
    }

    createTaskElements(task) {
        const listElement = this.#document.createElement('li')
        listElement.innerHTML = task.getName()
        listElement.setAttribute('id', task.getId())

        const checkbox = this.#createInputElement('checkbox')
        listElement.appendChild(checkbox)

        return {listElement, checkbox}
    }

    #renderUI() {
        const form = this.#document.createElement('form')
        form.setAttribute('id', 'task-form')
        this.#document.body.appendChild(form)

        const textInput = this.#createInputElement('text')
        form.appendChild(textInput)

        const submitButton = this.#createInputElement('submit')
        form.appendChild(submitButton)

        form.addEventListener('submit', (event) => { this.handleSubmit(event, textInput) })
    }

    handleSubmit(event, textInput) {
        event.preventDefault()
        const taskName = textInput.value
        this.#taskManager.addTask(taskName)

        if (this.#taskManager.getTasks()) {
            this.renderTasks()
        }
    }

    createTaskList() {
        const list = document.createElement('div')
        list.setAttribute('id', 'task-list')
        return list
    }

    #createInputElement(inputType) {
        const element = this.#document.createElement('input')
        element.setAttribute('type', inputType)
        return element
    }
}

export default TaskUI