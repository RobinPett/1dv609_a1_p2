import start from "../src/js"
import TaskUI from "../src/js/TaskUI"

const mockTaskUIInstance = {
    renderUI: jest.fn()
}

jest.mock('../src/js/TaskUI', () => {
    return jest.fn().mockImplementation(() => mockTaskUIInstance)
})

describe('Task class test', () => {
    it('should have a start function', () => {
        expect(start).toBeDefined()
        expect(typeof(start)).toBe('function')
    })

    it('should render ui when running start function', () => {
        start()
        expect(mockTaskUIInstance.renderUI).toHaveBeenCalled()
    })
})
