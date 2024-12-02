import TaskStorage from "../src/js/TaskStorage"

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

    it ('should save and load multiple tasks', () => {
        assertSavedTask(sut, [task1, task2])
    })

    it ('should load empty task list', () => {
        expect(sut.load()).toStrictEqual([])
    })

    it ('should throw an error if tasks are not of type Task', () => {
        expect(() => sut.save()).toThrow()
    })
})

const assertSavedTask = (sut, tasks) => {
    const mockedTasks = mockTasks(tasks)
    sut.save(mockedTasks)
    const loadedTasks = sut.load()
    
    expect(loadedTasks).toEqual(mockedTasks)
}

const mockTasks = (tasks) => {
    return tasks.map((task, index) => {
        return {name: task, id: `mockId${index}`, completed: false}
    })
}

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