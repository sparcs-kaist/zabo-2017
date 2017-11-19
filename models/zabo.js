const mongoose = require('mongoose');
const zaboSchema = new mongoose.Schema({
    id: String,
    img: String,
    eventName: String,
    writer: String,
    category: String,
    applyStart: Date,
    applyEnd: Date,
    eventStart: Date,
    eventEnd: Date,
    description: String,
    report: [String],
    toAra: Boolean,
    isMain: Boolean,
});

module.exports = mongoose.model('zabo', zaboSchema);