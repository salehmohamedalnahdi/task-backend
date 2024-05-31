const service = require('../services/serviceTask');
const schema=require('../validation/validationSchema')


async function showTask(req, res) {
  try {
    const task = await service.getTask();
    res.json(task);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display task.' });
  }
}

async function createTask(req,res){

  const { error, value } =schema.createSchema(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const newTask=await service.addTask(value)
    res.json(newTask);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create Task.' });
  }
}

async function deleteTask(req,res) {
 try {
  const taskId=req.params.taskId
  const checkTask= await service.Check(taskId)
  if(!checkTask){
    return res.json({ error: 'Task is not exsisted' });
  }
 const deleteTask=await service.deleteTask(taskId)
  res.json(deleteTask)
}
  catch (error) {
  console.error('Error in controller:', error);
    res.json({ error: 'Failed to delete Task.' });
 }
}

async function updateTask(req,res) {
  //the body must be as {title:"",isDone:""}

  const { error, value } =schema.updateSchema(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
   const taskId=req.params.taskId
   const checkTask= await service.Check(taskId)
   if(!checkTask){
     return res.json({ error: 'Task is not exsisted' });
    }
   await service.updateTask(value,taskId)
   console.log("updateed is done")
   res.json(value)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Update Task.' });
  }
 }

module.exports = {
  showTask,createTask,deleteTask,updateTask
};

