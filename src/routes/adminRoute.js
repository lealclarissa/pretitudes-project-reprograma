const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

router.get("/",controller.allAdmin);
router.post("/", controller.registerNewAdmin);
router.post("/login", controller.login);
router.put("/:id", controller.updateAdministrator);
router.delete("/:id", controller.deleteAdministrator);

module.exports = router;