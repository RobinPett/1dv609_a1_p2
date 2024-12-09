import TaskUI from '../src/js/TaskUI'
import Task from '../src/js/Task'

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
        const taskElement = document.getElementById(mockedBuyMilkTask.getId())
        const checkbox = taskElement.querySelector('input[type="checkbox"]')
        
        expect(taskElement.contains(checkbox)).toBeTruthy()
    })
})

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
    getTasks: jest.fn()
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
        }
    }
})