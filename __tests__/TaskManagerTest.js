import TaskManager from "../src/js/TaskManager"
import Task from "../src/js/Task"

jest.mock("../src/js/Task")

const buyMilk = 'Buy milk'
const buyBread = 'Buy bread'

let sut

beforeEach(() => {
    sut = new TaskManager(mockStorage)
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

    it ('should load a task from storage', () => {
        assertTaskLoaded(sut, [buyMilk])
    })

    it ('should load two tasks from storage', () => {
        assertTaskLoaded(sut, [buyMilk, buyBread])
    })

    it ('should inject storage into TaskManager', () => {
        const mockStorage = {
            save: jest.fn(),
            load: jest.fn()
        }
        const taskManager = new TaskManager(mockStorage)
        taskManager.loadFromStorage()
        expect(mockStorage.load).toHaveBeenCalled()
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
    expect(task.isComplete()).toBe(status)
}

assertTaskLoaded = (sut, tasks) => {
    const mockedTasks = tasks.map(task => createMockTask(task))

    const loadedTasks = []
    mockedTasks.forEach(task => {
        loadedTasks.push({
            name: task.getName(),
            id: task.getId(),
            completed: task.isComplete()
        })
    })

    mockStorage.load.mockReturnValueOnce(loadedTasks)

    sut.loadFromStorage()
    const tasksFromStorage = sut.getTasks()

    loadedTasks.forEach((task, index) => {
        expect(task.name).toBe(tasksFromStorage[index].getName())
    })
}

createAndAddTaskToManager = (sut, task) => {
    const mockTask = createMockTask(task)
    sut.addTask(mockTask)
}

createMockTask = (task) => {
    let completed = false

    const taskMock = {
        getName: jest.fn().mockReturnValue(task),
        getId: jest.fn().mockReturnValue(task + 'Id'),
        toggleStatus: jest.fn(() => completed = !completed),
        isComplete: jest.fn(() => completed)
    }
    Task.mockImplementationOnce(() => taskMock)
    return taskMock
}

const mockStorage = {
    save: jest.fn(),
    load: jest.fn()
}   
