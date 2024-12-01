import TaskStorage from "../src/js/TaskStorage"

let sut

beforeEach(() => {
    sut = new TaskStorage()
})

describe('TaskStorage Test', () => {
    it ('should save one task', () => {
        const task = {name: 'Buy Milk', id: 'mockId', completed: false}
        sut.save([task])

        const savedTasks = sut.load()
        expect(savedTasks[0]).toEqual(task)
    })
})