import TaskStorage from "../src/js/TaskStorage"
import Task from "../src/js/Task"

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

const task1 = 'Buy Milk'
const task2 = 'Buy Bread'

let sut
let mockLocalStorage

beforeEach(() => {
    mockLocalStorage = createMockLocalStorage()
    sut = new TaskStorage(mockLocalStorage)
})

describe('TaskStorage Test', () => {
    it ('should save one task', () => {
        assertSavedTask(sut, [task1])
    })

    it ('should save two tasks', () => {
        assertSavedTask(sut, [task1, task2])
    })

    it ('should load one task', () => {
        const {loadedTasks, createdTasks} = loadTasks(sut, [task1])
        expect(loadedTasks).toEqual(createdTasks)
    })

    it ('should load a task with name, id and completed fields', () => {
        const {loadedTasks, createdTasks} = loadTasks(sut, [task1])
        const firstLoadedTask = loadedTasks[0]
        const firstCreatedTask = createdTasks[0]
        
        expect(firstLoadedTask.name).toBe(firstCreatedTask.getName())
        expect(firstLoadedTask.id).toBe(firstCreatedTask.getId())
        expect(firstLoadedTask.completed).toBe(firstCreatedTask.isCompleted())
    })

    it ('should load two tasks', () => {
        const {loadedTasks, createdTasks} = loadTasks(sut, [task1, task2])
        expect(loadedTasks).toEqual(createdTasks)
    })

    it ('should load empty task list', () => {
        expect(sut.load()).toStrictEqual([])
    })

    it ('should throw an error if tasks are not of type Task', () => {
        expect(() => sut.save([{}])).toThrow()
    })
})

const assertSavedTask = (sut, tasks) => {
    const createdTasks = createTasks(tasks)
    sut.save(createdTasks)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('Todo', JSON.stringify(createdTasks))
}

const loadTasks = (sut, tasks) => {
    const createdTasks = createTasks(tasks)
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(createdTasks))
    const loadedTasks = sut.load()
    return {loadedTasks, createdTasks}
}

const createTasks = (tasks) => tasks.map(task => new Task(task))

const createMockLocalStorage = () => {
    let savedItems = {}
    return {
        setItem: jest.fn((key, value) => {
            savedItems[key] = value
        }),

        getItem: jest.fn()
    }
}