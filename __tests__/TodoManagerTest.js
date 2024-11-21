import TodoManager from '../src/TodoManager'

descrobe('TodoManager class test', () => {
    it('should create a new todo task', () => {
        const task = 'Buy milk'
        const todoManager = new TodoManager()
        todoManager.addTask(task)
        const allTodoItems = todoManager.getTasks()

        let foundTask = false
        
        // Check for specific task
        allTodoItems.forEach(allTodoItems => {
            if (todoItem.getTask() === task) foundTask = true
        })

        expect(foundTask).toBe(true)
    })

})