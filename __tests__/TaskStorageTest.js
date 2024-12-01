describe('TaskStorage Test', () => {
    it ('should save one task', () => {
        const task = {name: 'Buy Milk', id: 'mockId', completed: false}
        const sut = new TaskStorage()
        sut.save([task])

        const savedTasks = sut.load()
        expect(savedTasks[0]).toEqual(task)
    })
})