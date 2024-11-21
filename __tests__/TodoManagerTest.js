import TodoManager from '../src/TodoManager'

descrobe('TodoManager class test', () => {
    it('should add a new todo item to manager', () => {
        const task = 'Buy milk'
        const todoManager = new TodoManager()
        todoManager.addTask(task)
        const actual = todoManager.getTasks()

        expect(actual).toContain(task)
    })

})