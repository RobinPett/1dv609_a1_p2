import TaskUI from "./TaskUI.js"
import TaskManager from './TaskManager.js'
import TaskStorage from './TaskStorage.js'

const start = () => {
    const storage = new TaskStorage(localStorage)
    const manager = new TaskManager(storage)
    const ui = new TaskUI(document, manager)
    ui.renderUI()
}

export default start