const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    tag: {
        type: String, // 'Design', 'Backend', 'Frontend'
        default: 'General',
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    assignee: {
        type: String, // Storing name directly for simplicity as per frontend mock, or could be ObjectId ref
        default: 'Unassigned',
    },
    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // optional for now, allows linking to real users later
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    columnId: {
        type: String, // 'column-1', 'column-2', 'column-3'
        default: 'column-1',
    },
    order: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', taskSchema);
