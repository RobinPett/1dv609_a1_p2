import TaskManager from "../src/js/TaskManager"
import Task from "../src/js/Task"

jest.mock("../src/js/Task")

let sut
const buyMilk = 'Buy milk'
const buyBread = 'Buy bread'

beforeEach(() => {
    sut = new TaskManager()
})

describe('TaskManager class test', () => {
    it('should add a new task to manager', () => {
        assertTasksAdded(sut, [buyMilk])
    })

    it('should add two tasks to manager', () => {
        assertTasksAdded(sut, [buyMilk, buyBread])
    })

    it('should remove one task from manager', () => {
        assertTaskRemoval(sut, [buyMilk, buyBread])
    })

    it ('should set status of task to completed', () => {
        const toggledTask = addTaskAndToggleStatus(sut, buyMilk)
        assertTaskStatus(toggledTask, true)
    })

    it ('should set status of task to not completed', () => {
        const toggledTask = addTaskAndToggleStatus(sut, buyMilk)
        sut.toggleStatus(toggledTask) // Completed: True
        assertTaskStatus(toggledTask, false)
    })
})

addTaskAndToggleStatus = (sut, task) => {
    createAndAddTaskToManager(sut, task)
    sut.toggleStatus(sut.getTasks()[0])
    return sut.getTasks()[0]
}

assertTasksAdded = (sut, tasks) => {
    tasks.forEach(task => {
        createAndAddTaskToManager(sut, task)   
    })

    const allTasks = sut.getTasks()

    tasks.forEach((task, index) => {
        const expectedTask = task
        const actualTask = allTasks[index].getName()
        expect(expectedTask).toBe(actualTask)
        expect(allTasks.length).toBe(tasks.length)
    })
}

assertTaskRemoval = (sut, tasks) => {
    tasks.forEach(task => {
        createAndAddTaskToManager(sut, task)
    })

    const allTasks = sut.getTasks()
    const taskToRemove = allTasks[0]
    sut.removeTask(taskToRemove)

    const remainingTasks = sut.getTasks()
    expect(remainingTasks.length).toBe(tasks.length - 1)
}

assertTaskStatus = (task, status) => {
    expect(task.getStatus()).toBe(status)
}

createAndAddTaskToManager = (sut, task) => {
    const mockTask = createMockTask(task)
    sut.addTask(mockTask)
}

createMockTask = (task) => {
    let completed = false

    const taskMock = {
        getName: jest.fn().mockReturnValue(task),
        getId: jest.fn().mockReturnValue(task),
        toggleStatus: jest.fn(() => completed = !completed),
        getStatus: jest.fn(() => completed)
    }
    Task.mockImplementationOnce(() => taskMock)
    return taskMock
}
