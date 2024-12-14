import Task from '../src/js/Task.js'

let task

beforeEach(() => {
  task = new Task('Buy milk')
})

describe('Task class test', () => {
  it('should create a new todo task', () => {
    const taskName = 'Buy milk'
    const actual = task.getName()
    expect(actual).toBe(taskName)
  })

  it('should get id', () => {
    const expected = 'string'
    const actual = task.getId()
    expect(typeof actual).toBe(expected)
    expect(actual.length).toBeGreaterThan(0)
  })

  it('should change task name', () => {
    const newTask = 'Buy milk'
    task.setName(newTask)
    const actual = task.getName()

    expect(actual).toBe(newTask)
  })

  it('should throw an exception if task is not a string', () => {
    const task = 1
    expect(() => new Task(task)).toThrow()
  })

  it('should set task status to done', () => {
    task.toggleStatus()
    const actual = task.isCompleted()
    const expected = true

    expect(actual).toBe(expected)
  })

  it ('should set task status to not done', () => {
    task.toggleStatus() // Completed: True
    task.toggleStatus() // Completed: False
    const actual = task.isCompleted()
    const expected = false

    expect(actual).toBe(expected)
  })
})