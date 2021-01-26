const express = require("express");
const categoryModel = require("../models/GroceryItemsCategoryModel");
const groceryItemsModel = require("../models/GroceryItems.Model");
const { request, response } = require("express");

const router= express.Router();

router.post('/category', (request, response)=>{
    const requestbody = request.body;
    categoryModel.create(requestbody).then((data)=>{
        response.send(data);
    }).catch(()=>{
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

router.get("/allCategory", (request, response) => {
    groceryItemsModel.find()
    .populate('categoryId') //that associate or reference to the data
      .then((itemCategory) => {
        response.send(itemCategory);
      })
      .catch(() => {
        response.status(500).send("unable to find categories");
      });
  });


router.post("/new-item", (request, response)=>{
    const requestbody= request.body;
    groceryItemsModel.create(requestbody).then((data)=>{
        response.send(data);
    });
});

router.patch("/update-item/:id", (request, response)=>{
    groceryItemsModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
      }).then((data)=>{
        response.send(data);
    }).catch(()=>{
        response.status(404).send("Item was not found!");
    });
});


router.patch("/delete-item/:id",(request,response)=>{
    groceryItemsModel.findByIdAndDelete(request.param.id).then((dta)=>{
        response.send("Item deleted scuccessfully!");
    }).catch(()=>{
        response.status(4040).send("Item was not fpund!");
    });
});

module.exports = router;