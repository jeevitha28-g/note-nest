const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String },
    content: { type: String },
}, {
    timestamps: true  //Automatically adds createdAt and updatedAt
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
