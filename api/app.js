require('dotenv').config();
const express =require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const app =express()
const mongourl =process.env.mongoUrl;
const Todo =require('./modules/todo')

app.use(express.json())
app.use(cors())

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>console.log('connnection is a success'))
.catch(console.error)

app.get('/todos',async (req,res)=>{
    const todo = await Todo.find()
    res.json(todo)

})
app.post('/todos/new',async(req,res)=>{
    const text = req.body.text
    const newtodo= new Todo({
        text,
    })
     await newtodo.save()
    res.json(newtodo)
})

app.delete('/todos/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})
app.get('/todos/complete/:id',async(req,res)=>{
    const todo =await Todo.findById(req.params.id)
    if(todo){
        todo.complete =!todo.complete
        await todo.save()
        res.json(todo)
    }
    else{
        res.send('nothing')
    }
    
})

app.listen(3001, console.log('connection established'))