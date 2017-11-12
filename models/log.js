const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    id: String,
    logs: [Date],
});

module.exports = mongoose.model('log', logSchema);