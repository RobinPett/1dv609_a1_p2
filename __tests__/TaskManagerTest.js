import TaskManager from "../src/js/TaskManager.js"
import Task from "../src/js/Task.js"

jest.mock("../src/js/Task")

const buyMilk = 'Buy milk'
const buyBread = 'Buy bread'

let sut

beforeEach(() => {
    sut = new TaskManager(mockStorage)
    jest.resetAllMocks()
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
        const taskManager = new TaskManager(mockStorage)
        taskManager.loadFromStorage()
        expect(mockStorage.load).toHaveBeenCalled()
    })

    it ('should save to storage when new task is created', () => {
        sut.addTask(buyMilk)
        const allTasks = sut.getTasks()
        expect(mockStorage.save).toHaveBeenCalledWith(allTasks)
    })

    it ('should save to storage when a task is removed', () => {
        const task = createMockTask(buyMilk)
        sut.removeTask(task)
        
        expect(mockStorage.save).toHaveBeenCalledWith([])
    })

    it ('should save to storage when toggeling task completed status', () => {
        const task = createAndAddTaskToManager(sut, buyMilk)
        jest.clearAllMocks()
        
        sut.toggleStatus(task)
        
        expect(task.isCompleted()).toBeTruthy()
        expect(mockStorage.save).toHaveBeenCalledWith([task])
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
    expect(task.isCompleted()).toBe(status)
}

assertTaskLoaded = (sut, tasks) => {
    const mockedTasks = tasks.map(task => createMockTask(task))

    const loadedTasks = []
    mockedTasks.forEach(task => {
        loadedTasks.push({
            name: task.getName(),
            id: task.getId(),
            completed: task.isCompleted()
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
    return mockTask
}

createMockTask = (task) => {
    let completed = false

    const taskMock = {
        getName: jest.fn().mockReturnValue(task),
        getId: jest.fn().mockReturnValue(task + 'Id'),
        toggleStatus: jest.fn(() => completed = !completed),
        isCompleted: jest.fn(() => completed)
    }
    Task.mockImplementationOnce(() => taskMock)
    return taskMock
}

const mockStorage = {
    save: jest.fn(),
    load: jest.fn()
}   
