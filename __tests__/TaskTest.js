import Task from '../src/js/Task.js'

let task

const buyMilk = 'Buy milk'

beforeEach(() => {
  task = new Task(buyMilk)
})

describe('Task class test', () => {
  it('should create a new todo task', () => {
    const actual = task.getName()
    expect(actual).toBe(buyMilk)
  })

  it('should get id', () => {
    const expected = 'string'
    const actual = task.getId()
    expect(typeof actual).toBe(expected)
    expect(actual.length).toBeGreaterThan(0)
  })

  it('should change task name', () => {
    task.setName(buyMilk)
    const actual = task.getName()

    expect(actual).toBe(buyMilk)
  })

  it('should throw an exception if task is not a string', () => {
    expect(() => new Task(1)).toThrow()
  })

  it('should throw an error if task name is less than 1 character', () => {
    expect(() => new Task('')).toThrow()
  })

  it('should throw an error if task name is over 120 characters', () => {
    let fiftyChars = '.'.repeat(121)
    expect(() => new Task(fiftyChars)).toThrow()
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