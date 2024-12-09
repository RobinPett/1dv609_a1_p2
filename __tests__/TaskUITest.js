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
    it ('should render one task', () => {
        const mockTask = new Task('Buy milk')
        mockTaskManager.getTasks.mockReturnValue([mockTask])
        
        const ui = new TaskUI(document, mockTaskManager)

        ui.renderTasks()

        const taskContainer = document.querySelector('task-list')
        expect(taskContainer.innerHTML).toContain('Buy milk')
    })
})