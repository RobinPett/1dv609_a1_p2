class TaskStorage {
    save(tasks) {
    }

    load() {
        return [{name: 'Buy Milk', id: 'mockId', completed: false}, {name: 'Buy Bread', id: 'mockId2', completed: false}]
    }
}

export default TaskStorage