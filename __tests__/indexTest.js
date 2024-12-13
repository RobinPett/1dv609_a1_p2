import start from "../src/js"
import TaskUI from "../src/js/TaskUI"

jest.mock('../src/js/TaskUI', () => {
    return {
        renderUI: jest.fn()
    }
})

describe('Task class test', () => {
    it('should have a start function', () => {
        expect(start).toBeDefined()
        expect(typeof(start)).toBe('function')
    })

    it('should render ui when running start function', () => {
        start()
        expect(TaskUI.renderUI).toHaveBeenCalled()
    })

})