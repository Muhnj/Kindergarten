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
    const items = await Children.find().sort({ $natural: -1 });
    res.render("children_list", {
      Childrens: items,
    });
  } catch (error) {
    res.status(400).send("unable to find children in the db");
  }
});
router.get("/updatechild/:id", async (req, res) => {
  try {
    const updateChildren= await Children.findOne({ _id: req.params.id });
    res.render("update_child", {
      children: updateChildren,
    });
  } catch (error) {
    res.status(400).send("unable to find this child in the db");
  }
});
router.post("/updatechild", async (req, res) => {
  try {
    await Children.findOneAndUpdate({ _id:req.query.id }, req.body);
    res.redirect("/childrensList");
  } catch (error) {
    res.status(400).send("unable to find this child in the db");
  }
});
router.post("/deletechild", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Children.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("unable to delete this Child in the db");
  }
});
module.exports = router;
