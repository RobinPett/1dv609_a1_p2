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

beforeEach(() => {
    const mockLocalStorage = createMockLocalStorage()
    sut = new TaskStorage(mockLocalStorage)
})

describe('TaskStorage Test', () => {
    it ('should save and load one task', () => {
        assertSavedTask(sut, [task1])
    })

    it ('should save and load two tasks', () => {
        assertSavedTask(sut, [task1, task2])
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
    const loadedTasks = sut.load()

    expect(loadedTasks).toEqual(createdTasks)
}

const createTasks = (tasks) => tasks.map(task => new Task(task))

const createMockLocalStorage = () => {
    let savedItems = {}
    return {
        setItem: (key, value) => {
            savedItems[key] = value
        },

        getItem: (key) => {
            return savedItems[key]
        }
    }
}