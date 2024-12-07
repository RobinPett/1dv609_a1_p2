import TaskStorage from "../src/js/TaskStorage"
import Task from "../src/js/Task"

jest.mock('../src/js/Task', () => {
    return {
        __esModule: true,
        default: class MockTask {
            constructor(name) {
                this.name = name
            }
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
        const createdTasks = createTasks([task1])
        mockLocalStorage.getItem.mockReturnValueOnce(createdTasks)

        const loadedTasks = sut.load()
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
    const createdTasks = createTasks([task1])
    sut.save(createdTasks)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('Todo', JSON.stringify(createdTasks))
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