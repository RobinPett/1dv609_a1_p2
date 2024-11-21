import TodoManager from "../src/js/TodoManager"
import TodoItem from "../src/TodoItem"

jest.mock("../src/TodoItem")

describe('TodoManager class test', () => {
    it('should add a new todo item to manager', () => {
        const task = 'Buy milk'
        const todoItemMock = {
            getTask: jest.fn().mockReturnValue(task)
        }
        TodoItem.mockImplementation(() => todoItemMock)

        const todoManager = new TodoManager()
        todoManager.addTask(task)
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(1)
        expect(actualTasks[0].getTask()).toBe(task)
    })
})