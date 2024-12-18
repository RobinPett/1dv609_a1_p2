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

    it ('should load a task with name, id and completed fields', () => {
        const {loadedTasks, createdTasks} = loadTasks(sut, [task1])
        const firstLoadedTask = loadedTasks[0]
        const firstCreatedTask = createdTasks[0]
        
        expect(firstLoadedTask.name).toBe(firstCreatedTask.getName())
        expect(firstLoadedTask.id).toBe(firstCreatedTask.getId())
        expect(firstLoadedTask.completed).toBe(firstCreatedTask.isCompleted())
    })

    it ('should load two tasks wit name, id and completed', () => {
        const {loadedTasks, createdTasks} = loadTasks(sut, [task1, task2])
        loadedTasks.forEach((task, index) => {
            expect(task.name).toBe(createdTasks[index].getName())
            expect(task.id).toBe(createdTasks[index].getId())
            expect(task.completed).toBe(createdTasks[index].isCompleted())
        })
    })

    it ('should load empty task list', () => {
        expect(sut.load()).toStrictEqual([])
    })

    it ('should throw an error if tasks are not of type Task', () => {
        expect(() => sut.save([{}])).toThrow()
    })

    it ('should save a task with name, id and completed', () => {
        const createdTasks = createTasks(['Buy milk'])
        sut.save(createdTasks)

        const task = createdTasks[0]
        const taskToSave = { name: task.getName(), id: task.getId(), completed: task.isCompleted() }

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('Todo', JSON.stringify([taskToSave]))
    })
})

const assertSavedTask = (sut, tasks) => {
    const createdTasks = createTasks(tasks)
    sut.save(createdTasks)

    const expectedSavedTasks = createdTasks.map((task) => {
        return { name: task.getName(), id: task.getId(), completed: task.isCompleted() }
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('Todo', JSON.stringify(expectedSavedTasks))
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