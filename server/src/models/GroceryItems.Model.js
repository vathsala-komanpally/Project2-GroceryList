const mongoose = require("mongoose");

const groceryItemsSchema = mongoose.Schema({
    itemname: String,
    price: Number,
    noOfItems: Number,
    readyToEat: Boolean,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
});

module.exports = mongoose.model("groceryItems", groceryItemsSchema);