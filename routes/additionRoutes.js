const express = require("express");
const router = express.Router();
const connectEnsureLogin =require("connect-ensure-login")
//import models
const Children = require("../models/Children");

router.get("/addition", (req, res) => {
  res.render("register_child");
});
router.post("/addition", async (req, res) => {
  try {
    const children = new Children(req.body);

    console.log(children);
    await children.save();

    res.redirect("/addition");
  } catch (error) {
    res.status(400).render("register_child");
    console.log(error);
  }
});
router.get("/childrenslist", async (req, res) => {
  try {
    const childrens = await Children.find().sort({ $natural: -1 });
    res.render("children_list", {
      childrens: childrens  // or just { childrens } using ES6 shorthand
    });
  } catch (error) {
    console.error(error);  // Always log the error for debugging
    res.status(400).send("unable to find children in the db");
  }
});
router.get("/updatechild/:id", async (req, res) => {
  try {
    const updateChildren = await Children.findOne({ _id: req.params.id });
    if (!updateChildren) {
      return res.status(404).send("Child not found");
    }
    res.render("update_child", {
      children: updateChildren  // Keep using 'children' to match your template
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send("Unable to find this child in the db");
  }
});
router.post("/updatechild/:id", async (req, res) => {
  try {
    await Children.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/childrenslist");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send("Unable to update child");
  }
});
router.post("/deletechild", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Children.deleteOne({ _id: req.body.id });
    res.redirect("children_list");
  } catch (error) {
    res.status(400).send("unable to delete this Child in the db");
  }
});
module.exports = router;
