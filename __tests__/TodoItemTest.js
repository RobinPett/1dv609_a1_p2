import TodoItem from '../src/TodoItem'

describe('TodoItem class test', () => {
  it('should set a new todo task', () => {
    const todoItem = new TodoItem()
    const task = 'Buy milk'
    todoItem.setTask(task)
    const actual = todoItem.getTask()
    expect(actual).toBe(task)
  })
})