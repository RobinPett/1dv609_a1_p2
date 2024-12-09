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
})

const assertTaskRendering = (sut, tasks) => {
    const mockedTasks = tasks.map(task => { return new Task(task)})
    console.log(mockedTasks)

    mockTaskManager.getTasks.mockReturnValueOnce(mockedTasks)

    sut.renderTasks()
    const taskContainer = document.getElementById('task-list')

    tasks.forEach((task) => {
        expect (taskContainer.innerHTML).toContain(task)
    })
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