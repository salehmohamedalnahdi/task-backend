const express= require('express')
const router = express.Router();
const controller=require('../controller/controllers.js')

router.get("/tasks",controller.showTask)
router.post('/create',controller.createTask);
router.delete("/delete/:taskId",controller.deleteTask)
router.patch("/update/:taskId",controller.updateTask)

module.exports = router;

