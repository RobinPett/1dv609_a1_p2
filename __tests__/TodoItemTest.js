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

  it('should get id', () => {
    const expected = 'string'
    const actual = todoItem.getId()
    expect(typeof actual).toBe(expected)
    expect(actual.length).toBeGreaterThan(0)
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
    const expected = true

    expect(actual).toBe(expected)
  })

  it ('should set task status to not done', () => {
    todoItem.toggleStatus() // Completed: True
    todoItem.toggleStatus() // Completed: False
    const actual = todoItem.getStatus()
    const expected = false

    expect(actual).toBe(expected)
  })
})