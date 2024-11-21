import TodoManager from "../src/js/TodoManager"
import TodoItem from "../src/TodoItem"

jest.mock("../src/TodoItem")

const createMockTodoItem = (task) => {
    const todoItemMock = {
        getTask: jest.fn().mockReturnValue(task)
    }
    TodoItem.mockImplementationOnce(() => todoItemMock)
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

    it('should add two todo items to manager', () => {
        const task1 = 'Buy milk'
        const task2 = 'Buy bread'
        createMockTodoItem(task1)
        createMockTodoItem(task2)

        const todoManager = new TodoManager()
        todoManager.addTask(task1)
        todoManager.addTask(task2)
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(2)
        expect(actualTasks[0].getTask()).toBe(task1)
        expect(actualTasks[1].getTask()).toBe(task2)
    })
})