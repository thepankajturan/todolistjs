const mongoose = require('mongoose');

const workItemSchema = new mongoose.Schema({
    name: String
})

const WorkItem = mongoose.model('WorkItem', workItemSchema);

module.exports = WorkItem;