import TaskUI from '../src/js/TaskUI'
import Task from '../src/js/Task'

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

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('TaskUI Test', () => {
    it ('should render one task', async () => {
        const mockTask = new Task('Buy milk')
        mockTaskManager.getTasks.mockReturnValueOnce([mockTask])
        
        const ui = new TaskUI(document, mockTaskManager)

        ui.renderTasks()
    
        const taskContainer = document.getElementById('task-list')
        expect(taskContainer.innerHTML).toContain('Buy milk')
    })

    it ('should render two tasks', async () => {
        const mockTask1 = new Task('Buy milk')
        const mockTask2 = new Task('Buy bread')
        
        const ui = new TaskUI(document, mockTaskManager)
        mockTaskManager.getTasks.mockReturnValueOnce([mockTask1, mockTask2])

        ui.renderTasks()
    
        const taskContainer = document.getElementById('task-list')
        expect(taskContainer.innerHTML).toContain('Buy milk')
        expect(taskContainer.innerHTML).toContain('Buy bread')
    })
})