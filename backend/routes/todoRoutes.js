const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.get("/", todoController.getAllLists);
router.get("/:id", todoController.getOneList);
router.post("/", todoController.createList);
router.put("/:id", todoController.updateList);
router.delete("/:id", todoController.deleteList);

module.exports = router;
