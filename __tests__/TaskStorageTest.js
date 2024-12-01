import TaskStorage from "../src/js/TaskStorage"

let sut

beforeEach(() => {
    sut = new TaskStorage()
})

describe('TaskStorage Test', () => {
    it ('should save one task', () => {
        const task = {name: 'Buy Milk', id: 'mockId', completed: false}
        sut.save(task)

        const savedTasks = sut.load()
        expect(savedTasks[0]).toEqual(task)
    })

    it ('should load a task', () => {
        const task1 = {name: 'Buy Milk', id: 'mockId', completed: false}
        const task2 = {name: 'Buy Bread', id: 'mockId2', completed: false}
        sut.save([task1, task2])

        const savedTasks = sut.load()
        expect(savedTasks[1]).toEqual(task2)
    })
})