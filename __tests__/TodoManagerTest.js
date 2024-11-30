import TodoManager from "../src/js/TodoManager"
import TodoItem from "../src/TodoItem"

jest.mock("../src/TodoItem")

let sut

beforeEach(() => {
    sut = new TodoManager();
})

describe('TodoManager class test', () => {
    it('should add a new task to manager', () => {
        assertTasksAdded(sut, ['Buy milk'])
    })

    it('should add two tasks to manager', () => {
        assertTasksAdded(sut, ['Buy milk', 'Buy bread'])
    })

    it('should remove one task from manager', () => {
        assertTaskRemoval(sut, ['Buy milk', 'Buy bread'])
    })

    it ('should set status of task to completed', () => {
        const toggledTask = addTaskAndToggleStatus(sut, 'Buy milk')
        assertTaskStatus(toggledTask, true)
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
        const actualTask = allTasks[index].getTask()
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
        getTask: jest.fn().mockReturnValue(task),
        getId: jest.fn().mockReturnValue(task),
        toggleStatus: jest.fn(() => completed = !completed),
        getStatus: jest.fn(() => completed)
    }
    TodoItem.mockImplementationOnce(() => taskMock)
    return taskMock
}


