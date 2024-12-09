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

describe('TaskUI Test', () => {
    it ('should render one task', async () => {
        const mockTask = new Task('Buy milk')
        mockTaskManager.getTasks.mockReturnValue([mockTask])
        
        const ui = new TaskUI(document, mockTaskManager)

        ui.renderTasks()

        console.log(document.body.innerHTML)
    
        const taskContainer = document.getElementById('task-list')
        console.log(taskContainer)
        expect(taskContainer.innerHTML).toContain('Buy milk')
    })
})