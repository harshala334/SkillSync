const Task = require('../models/Task');
const Project = require('../models/Project');

/*
  Frontend expects data structure:
  {
    tasks: { 'task-1': { id, content... }, ... },
    columns: {
      'column-1': { id: 'column-1', title: 'To Do', taskIds: [...] },
      ...
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  }
*/

exports.getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId }).sort('order');

        const tasksMap = {};
        const columns = {
            'column-1': { id: 'column-1', title: 'To Do', taskIds: [] },
            'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
            'column-3': { id: 'column-3', title: 'Done', taskIds: [] },
        };

        tasks.forEach(task => {
            // Create frontend-friendly task object
            const taskId = task._id.toString();
            tasksMap[taskId] = {
                id: taskId,
                content: task.content,
                tag: task.tag,
                priority: task.priority,
                assignee: task.assignee, // sending name string
                columnId: task.columnId,
            };

            // Add to appropriate column
            if (columns[task.columnId]) {
                columns[task.columnId].taskIds.push(taskId);
            }
        });

        const response = {
            tasks: tasksMap,
            columns: columns,
            columnOrder: ['column-1', 'column-2', 'column-3'],
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { content, tag, priority, assignee, projectId } = req.body;

        // Find highest order in column-1 to append
        const lastTask = await Task.findOne({ project: projectId, columnId: 'column-1' }).sort('-order');
        const newOrder = lastTask ? lastTask.order + 1 : 0;

        const newTask = new Task({
            content,
            tag,
            priority,
            assignee,
            project: projectId, // Ensure project ID is passed
            columnId: 'column-1',
            order: newOrder
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { columnId } = req.body;

        const task = await Task.findByIdAndUpdate(id, { columnId }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Batch reorder for DnD
exports.reorderTasks = async (req, res) => {
    try {
        const { projectId, sourceColumnId, destinationColumnId, sourceTaskIds, destinationTaskIds } = req.body;

        // Use Promise.all to update tasks in parallel
        const updateOps = [];

        // 1. Update source column tasks orders (if it's different from dest, or same)
        // If moving within same column, we just need to update the one list (destinationTaskIds which represents the *new* state)

        if (sourceColumnId === destinationColumnId) {
            destinationTaskIds.forEach((taskId, index) => {
                updateOps.push(Task.findByIdAndUpdate(taskId, { order: index }));
            });
        } else {
            // Moving between columns
            // Update destination tasks (order + columnId)
            destinationTaskIds.forEach((taskId, index) => {
                updateOps.push(Task.findByIdAndUpdate(taskId, { columnId: destinationColumnId, order: index }));
            });

            // Update source tasks (just order for remaining) - technically the DND library handles the list state, 
            // but we need to ensure the DB reflects the new order of remaining items in source to be safe
            sourceTaskIds.forEach((taskId, index) => {
                updateOps.push(Task.findByIdAndUpdate(taskId, { order: index }));
            });
        }

        await Promise.all(updateOps);
        res.json({ message: 'Tasks reordered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
