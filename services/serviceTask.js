const {PrismaClient}=require ('@prisma/client');
const prisma=new PrismaClient();

async function getTask() {
    const task = await prisma.tasks.findMany()
    return task;  
}

async function addTask(requestBody){
  const newTask = await prisma.tasks.create({
    data: {
      title:requestBody.title,
    },
  });
  return(newTask);
}

async function Check(taskId) {
  const checkTask=await prisma.tasks.findUnique({
    where: { id: parseInt(taskId) }
  })
  return checkTask;
}

async function deleteTask(taskId){
   const task=await prisma.tasks.delete({ 
    where: { id: parseInt(taskId)}
  });
  return task;
}

async function updateTask(requestBody,taskId) {
  const task= await prisma.tasks.updateMany({
    where: { id: parseInt(taskId)},
    data:{
      title: requestBody.title,
      isDone: requestBody.isDone,
    }
  })
  return task;
}

module.exports = {
  getTask,addTask,Check,deleteTask,updateTask
};



/* async function getUsersWithAchievements(userId) {
  try {
    const users = await prisma.user.findMany({
      where: { id: userId },
      include: { achievements: true }
    });
    return users;
  } catch (error) {
    console.error('Error displaying portfolio:', error);
    throw new Error('Failed to display portfolio.');
  }
}*/

/*async function deletePortfolio(req,res) {
 try {
  const {email}=req.body
  try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
    })
  } catch (error) {
    console.error('Error in checkUser controller:', error);
     res.json({ error: 'email is not exsisted' });
  }
  const deleteaAhievement=await prisma.achievement.deleteMany({
    where: { userEmail: email }
   });
  const deleteUser=await prisma.user.delete({ 
    where: { email: email }
  });
  res.json(deleteUser)
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.json({ error: 'Failed to delete portfolio.' });
 }
}*/

/*async function updatePortfolio(req,res) {
  try {
   const {name, email, age ,title,content}=req.body
   try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
     })
   } catch (error) {
    console.error('Error in checkUser controller:', error);
    res.json({ error: 'email is not exsisted' });
   }
   const updateUser=await prisma.user.updateMany({
    where: { email: email },
    data:{
      name,
      age,
    },
  });
  const updateachievement=await prisma.achievement.updateMany({
   where: { userEmail: email },
   data:{
     title,
     content,
   }
 })
 res.json({message:"updateed is done"})
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.status(500).json({ error: 'Failed to Update portfolio.' });
 }
}*/