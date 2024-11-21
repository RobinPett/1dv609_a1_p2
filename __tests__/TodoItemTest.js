import TodoItem from '../src/TodoItem'

describe('TodoItem class test', () => {
  it('should create a new todo task', () => {
    const task = 'Buy milk'
    const todoItem = new TodoItem(task)
    const actual = todoItem.getTask()
    expect(actual).toBe(task)
  })

  it('should change a task', () => {
    const todoItem = new TodoItem('Buy milk')
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
    const todoItem = new TodoItem('Buy milk')
    todoItem.toggleStatus()
    const actual = todoItem.getStatus()
    const expected = 1
    expect(actual).toBe(expected)
  })
})