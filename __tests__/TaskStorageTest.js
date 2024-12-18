import TaskStorage from "../src/js/TaskStorage.js"
import Task from "../src/js/Task.js"

jest.mock('../src/js/Task', () => {
    return {
        __esModule: true,
        default: class MockTask {
            #name 
            #id
            #completed 

            constructor(name) {
                this.#name = name
                this.#id = 'mockId'
                this.#completed = false
            }
            getName() { return this.#name }
            getId() { return this.#id }   
            isCompleted() { return this.#completed }
        }
    }
})

const buyMilk = 'Buy Milk'
const buyBread = 'Buy Bread'

let sut
let mockLocalStorage

beforeEach(() => {
    mockLocalStorage = createMockLocalStorage()
    sut = new TaskStorage(mockLocalStorage)
})

describe('TaskStorage Test', () => {
    it ('should save one task with name, id and complete status', () => {
        assertSavedTask(sut, [buyMilk])
    })

    it ('should save two task with name, id and complete status', () => {
        assertSavedTask(sut, [buyMilk, buyBread])
    })

    it ('should load a task with name, id and completed fields', () => {
        assertLoadTasks(sut, [buyMilk])
    })

    it ('should load two tasks wit name, id and completed', () => {
        assertLoadTasks(sut, [buyMilk, buyBread])
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

    const expectedSavedTasks = createdTasks.map((task) => {
        return { name: task.getName(), id: task.getId(), completed: task.isCompleted() }
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(sut.key, JSON.stringify(expectedSavedTasks))
}

const assertLoadTasks = (sut, tasks) => {
    const {loadedTasks, createdTasks} = loadTasks(sut, tasks)
    loadedTasks.forEach((task, index) => {
        expect(task.name).toBe(createdTasks[index].getName())
        expect(task.id).toBe(createdTasks[index].getId())
        expect(task.completed).toBe(createdTasks[index].isCompleted())
    })
}

const loadTasks = (sut, tasks) => {
    const createdTasks = createTasks(tasks)
    const expectedLoadedTasks = createdTasks.map((task) => {
        return { name: task.getName(), id: task.getId(), completed: task.isCompleted() }
    })

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(expectedLoadedTasks))
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