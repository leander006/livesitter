const express = require("express");
const { authenticate } = require("../config/authenticate");

const overlayController = require("../controllers/overlayController");
const router = express.Router();

router.post("/", authenticate, overlayController.create);
router.put("/:id", authenticate, overlayController.update);
router.delete("/:id", authenticate, overlayController.deleteOverlay);
router.get("/", overlayController.get);
// router.post("/login", userController.login);

module.exports = router;
