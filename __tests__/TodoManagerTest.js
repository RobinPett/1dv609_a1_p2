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

const createAndAddTasksToManager = (tasks) => {
    const todoManager = new TodoManager()

    tasks.forEach(task => {
        createMockTodoItem(task)
        todoManager.addTask(task)
    })

    return todoManager
}

describe('TodoManager class test', () => {
    it('should add a new todo item to manager', () => {
        const task = 'Buy milk'

        const todoManager = createAndAddTasksToManager([task])
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(1)
        expect(actualTasks[0].getTask()).toBe(task)
    })

    it('should add two todo items to manager', () => {
        const task1 = 'Buy milk'
        const task2 = 'Buy bread'

        const todoManager = createAndAddTasksToManager([task1, task2])
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(2)
        expect(actualTasks[0].getTask()).toBe(task1)
        expect(actualTasks[1].getTask()).toBe(task2)
    })

    it('should remove one todo item from manager', () => {
        const task1 = 'Buy milk'
        const task2 = 'Buy bread'

        const todoManager = createAndAddTasksToManager([task1, task2])
        todoManager.removeTask(task1)
        const actualTasks = todoManager.getTasks()

        expect(actualTasks.length).toBe(1)
        expect(actualTasks[0].getTask()).toBe(task2)
    })
})


