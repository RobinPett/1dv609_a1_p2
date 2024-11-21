import TodoItem from '../src/TodoItem'

let todoItem

beforeEach(() => {
  todoItem = new TodoItem('Buy milk')
})

describe('TodoItem class test', () => {
  it('should create a new todo task', () => {
    const task = 'Buy milk'
    const actual = todoItem.getTask()
    expect(actual).toBe(task)
  })

  it('should change a task', () => {
    const newTask = 'Buy milk'
    todoItem.setTask(newTask)
    const actual = todoItem.getTask()

    expect(actual).toBe(newTask)
  })

  it('should throw an exception if task is not a string', () => {
    const task = 1
    expect(() => new TodoItem(task)).toThrow()
  })

  it('should set task status to done', () => {
    todoItem.toggleStatus()
    const actual = todoItem.getStatus()
    const expected = 1

    expect(actual).toBe(expected)
  })

  it ('should set task status to not done', () => {
    todoItem.toggleStatus() // Status: Done (1)
    todoItem.toggleStatus() // Status: Not done (0)
    const actual = todoItem.getStatus()
    const expected = 0

    expect(actual).toBe(expected)
  })
})