import TaskStorage from "../src/js/TaskStorage"

let sut

beforeEach(() => {
    const mockLocalStorage = createMockLocalStorage()
    sut = new TaskStorage(mockLocalStorage)
})

describe('TaskStorage Test', () => {
    it ('should save one task', () => {
        const task = {name: 'Buy Milk', id: 'mockId', completed: false}
        sut.save([task])

        const savedTasks = sut.load()
        expect(savedTasks[0]).toEqual(task)
    })

    it ('should load a task', () => {
        const task1 = {name: 'Buy Milk', id: 'mockId', completed: false}
        const task2 = {name: 'Buy Bread', id: 'mockId2', completed: false}
        sut.save([task1, task2])

        const savedTasks = sut.load()
        console.log(savedTasks)
        expect(savedTasks[1]).toEqual(task2)
    })

    it ('should load empty task list', () => {
        expect(sut.load()).toStrictEqual([])
    })
})

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