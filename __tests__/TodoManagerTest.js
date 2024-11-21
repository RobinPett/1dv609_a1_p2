import TodoManager from "../src/js/TodoManager"
import TodoItem from "../src/TodoItem"

jest.mock("../src/TodoItem")

const createMockTodoItem = (task) => {
    const todoItemMock = {
        getTask: jest.fn().mockReturnValue(task)
    }
    TodoItem.mockImplementation(() => todoItemMock)
    return todoItemMock
}

describe('TodoManager class test', () => {
    it('should add a new todo item to manager', () => {
        const task = 'Buy milk'
        createMockTodoItem(task)

        const todoManager = new TodoManager()
        todoManager.addTask(task)
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(1)
        expect(actualTasks[0].getTask()).toBe(task)
    })
})