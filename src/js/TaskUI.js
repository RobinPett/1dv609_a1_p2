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
        
        console.log('All tasks')
        console.log(allTasks)

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

        const textInput = this.#createInputElement('text')
        form.appendChild(textInput)

        const submitButton = this.#createInputElement('submit')
        form.appendChild(submitButton)

        form.addEventListener('submit', (event) => {this.handleSubmit(event, textInput)})
    }

    handleSubmit(event, textInput) {
        event.preventDefault()
        const taskName = textInput.value
        this.#taskManager.addTask(taskName)

        if (this.#taskManager.getTasks()) {
            this.renderTasks()
        }
    }

    #createInputElement(inputType) {
        const element = this.#document.createElement('input')
        element.setAttribute('type', inputType)
        return element
    }
}

export default TaskUI