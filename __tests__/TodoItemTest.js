import TodoItem from '../src/TodoItem'

describe('TodoItem class test', () => {
  it('should set a new todo task', () => {
    const task = 'Buy milk'
    const todoItem = new TodoItem(task)
    const actual = todoItem.getTask()
    expect(actual).toBe(task)
  })

  it('should throw an exception if task is not a string', () => {
    const task = 1
    expect(() => new TodoItem(task)).toThrow()
  })
})