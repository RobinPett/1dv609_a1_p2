
describe('TodoItem class test', () => {
  it('should set a new todo task', () => {
    const todoItem = new TodoItem()
    todoItem.setTask('Buy milk')
    const actual = todoItem.getTask()
    const expected = 'Buy milk'
    expect(actual).toBe(expected)
  })
})