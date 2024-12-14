const mockTaskUIInstance = {
    renderUI: jest.fn()
}

jest.mock('../src/js/TaskUI', () => {
    return jest.fn().mockImplementation(() => mockTaskUIInstance)
})

let start

beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
})

describe('Index.js test', () => {
    beforeEach(async () => {
        const module = await import('../src/js/index.js')
        start = module.default
    })

    it('should have a start function', () => {
        expect(start).toBeDefined()
        expect(typeof(start)).toBe('function')
    })

    it('should render ui when running start function', () => {
        start()
        expect(mockTaskUIInstance.renderUI).toHaveBeenCalled()
    })

    it('should render ui directly when index.js is loaded', async () => {
        expect(mockTaskUIInstance.renderUI).toHaveBeenCalled()
    })
})
