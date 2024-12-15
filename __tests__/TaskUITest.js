import TaskUI from '../src/js/TaskUI.js'
import Task from '../src/js/Task.js'

let sut

const buyMilk = 'Buy milk'
const buyBread = 'Buy bread'

beforeEach(() => {
    document.body.innerHTML = ''
    
    sut = new TaskUI(document, mockTaskManager)
})

describe('TaskUI Test', () => {
    it ('should render one task', async () => {
        assertTaskRendering(sut, [buyMilk])
    })

    it ('should render two tasks', async () => {
        assertTaskRendering(sut, [buyMilk, buyBread])
    })

    it ('should render a task with id', () => {
        const mockedTasks = mockAndRenderTasks(sut, [buyMilk])
        const mockedBuyMilkTask = mockedTasks[0]
        const taskElement = document.getElementById(mockedBuyMilkTask.getId())

        expect(taskElement.id).toBe(mockedBuyMilkTask.getId())
    })

    it ('should render a task with complete status as a checkbox', () => {
        const mockedTasks = mockAndRenderTasks(sut, [buyMilk])
        const mockedBuyMilkTask = mockedTasks[0]

        const { taskElement, checkbox } = getElements(mockedBuyMilkTask)
        
        expect(taskElement.contains(checkbox)).toBeTruthy()
    })

    it ('should render a checked checkbox when task complete status is true', () => {
        const mockedTasks = createMockTasks([buyMilk])
        const buyMilkTask = mockedTasks[0]

        jest.spyOn(buyMilkTask, 'isCompleted').mockReturnValue(true)
        mockTaskManager.getTasks.mockReturnValueOnce(mockedTasks)
        sut.renderTasks()

        const { taskElement, checkbox } = getElements(buyMilkTask)

        expect(checkbox.checked).toBeTruthy()
    })

    it ('should set a task to complete when checkbox is clicked', () => {
        const mockedTasks = createMockTasks([buyMilk])
        const buyMilkTask = mockedTasks[0]

        mockTaskManager.getTasks.mockReturnValueOnce(mockedTasks)
        sut.renderTasks()

        const { taskElement, checkbox } = getElements(buyMilkTask)
        checkbox.click()

        expect(buyMilkTask.isCompleted()).toBeTruthy()
    })

    it ('should render a form', () => {
        const form = document.getElementById('task-form')
        expect(document.body.contains(form)).toBeTruthy()
    })

    it ('should render a text input inside form', () => {
        const textInput = 'input[type="text"]'
        assertRenderingElementInForm(textInput)
    })

    it ('should render a submit button inside form', () => {
        const submitButton = 'input[type="submit"]'
        assertRenderingElementInForm(submitButton)
    })

    it ('should use text input from form to add new task to manager', () => {
        const input = document.querySelector('input[type="text"]')
        const submitButton = document.querySelector('input[type="submit"]')

        input.value = buyMilk
        submitButton.click()

        expect(mockTaskManager.addTask).toHaveBeenCalledWith(buyMilk)
    })

    it('should render task list with new task after form submit', () => {
        assertRenderingAfterSubmission[buyMilk]
    })

    it('should render two task after form submission', () => {
        assertRenderingAfterSubmission[buyMilk, buyBread]
    })

    it('should render tasklist under form', () => {
        const childElements = document.body.childNodes
        const form = document.getElementById('task-form')
        const taskList = document.getElementById('task-list')

        expect(childElements[0]).toBe(form)
        expect(childElements[1]).toBe(taskList)
    })

    it('should render a delete button on a task', () => {
        const mockedTasks = mockAndRenderTasks(sut, [buyMilk])
        const buyMilkTask = document.getElementById(mockedTasks[0].getId())
        const deleteButton = buyMilkTask.getElementsByClassName('delete')

        expect(buyMilkTask.contains(deleteButton[0])).toBeTruthy() 
    })
})

const assertRenderingAfterSubmission = (tasks) => {
    const mockedTasks = createMockTasks(tasks)
    mockTaskManager.getTasks.mockReturnValue(mockedTasks)

    tasks.forEach(task => {
        const mockSubmitEvent = new Event('submit')
        const textInput = { value: task }    
        sut.handleSubmit(mockSubmitEvent, textInput)  
    })

    const taskList = document.getElementById('task-list')
    const allRenderedTasks = document.querySelectorAll('li')

    tasks.forEach(task => {
        expect(taskList.innerHTML).toContain(task)
    })
    expect(allRenderedTasks.length).toBe(tasks.length)
}

const assertRenderingElementInForm = (childName) => {
    const containerElement = document.getElementById('task-form')
    const childElement = document.querySelector(childName)
    expect(containerElement.contains(childElement)).toBeTruthy()
}

const getElements = (mockedTask) => {
    const taskElement = document.getElementById(mockedTask.getId())
    const checkbox = taskElement.querySelector('input[type="checkbox"]')

    return {taskElement, checkbox}
}

const assertTaskRendering = (sut, tasks) => {
    mockAndRenderTasks(sut, tasks)
    const taskContainer = document.getElementById('task-list')

    tasks.forEach((task) => {
        expect (taskContainer.innerHTML).toContain(task)
    })
}

const mockAndRenderTasks = (sut, tasks) => {
    const mockedTasks = createMockTasks(tasks)
    mockTaskManager.getTasks.mockReturnValueOnce(mockedTasks)
    sut.renderTasks()
    return mockedTasks
}

const createMockTasks = (tasks) => {
    return tasks.map(task => { return new Task(task)})
}

const mockTaskManager = {
    getTasks: jest.fn(),
    addTask: jest.fn()
}

jest.mock('../src/js/Task', () => {
    return {
        __esModule: true,
        default: class MockTask {
            constructor(name) {
                this.name = name
                this.id = 'mockId'
                this.completed = false
            }
            getName() { return this.name }
            getId() { return this.id }   
            isCompleted() { return this.completed }
            toggleStatus() { this.completed = !this.completed }
        }
    }
})