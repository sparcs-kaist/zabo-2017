const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: String,
    orgs: [String],
    favoriteZabos: [String],
    favoriteOrgs: [String],
});

module.exports = mongoose.model('user', userSchema);