const express = require("express");
const categoryModel = require("../models/GroceryItemsCategoryModel");
const groceryItemsModel = require("../models/GroceryItems.Model");
const { request, response } = require("express");

const router = express.Router();

router.post('/category', (request, response) => {
    const requestbody = request.body;
    categoryModel.create(requestbody).then((data) => {
        response.send(data);
    }).catch(() => {
        response.status(500).send("unable to create category");
    });
});

router.get("/category/all", (request, response) => {
    categoryModel.find()
        .then((categories) => {
            response.send(categories);
        })
        .catch((error) => {
            console.log("error:", error);
            response.status(500).send("cannot load categories");
        });
});

router.get("/allGroceryItems", (request, response) => {
    groceryItemsModel.find()
        .populate('categoryId') //that associate or reference to the data
        .then((itemCategory) => {
            response.send(itemCategory);
        })
        .catch(() => {
            response.status(500).send("unable to find categories");
        });
});

router.post("/new-item", (request, response) => {
    const requestbody = request.body;
    groceryItemsModel.create(requestbody).then((data) => {
        response.send(data);
    });
});

router.patch("/update-item/:id", (request, response) => {
    groceryItemsModel.findByIdAndUpdate(request.params.id, request.body).then((data) => {

        if (data) {
            response.send("updated successfully");

        } else {
            response.send("Please enter valid Id, seems like item id doesn't exist");
        }
    }).catch(() => {
        response.status(404).send("Item was not found!");
    });
});


router.delete("/delete-item/:id", (request, response) => {
    groceryItemsModel.findByIdAndDelete(request.params.id).then((dta) => {
        response.send("Item deleted scuccessfully!");
    }).catch(() => {
        response.status(4040).send("Item was not found!");
    });
});


router.get("/category/:id", (request, response) => {
    groceryItemsModel.
        find({ categoryId: request.params.id }).then((data) => {
            response.send(data);
        }).catch((error) => {
            response.status(500).send("unable to find items of category");
        });
});

module.exports = router;