const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser')
const path=require('path');
const multer=require('multer');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads',express.static('uploads'));
app.use(express.static(__dirname))

app.get('/users',(req,res)=>{
    db.getUser()
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json({error:err})
    })
})

app.post('/users',(req,res)=>{
    var data={
        email:req.body.email,
        password:req.body.password
    }
    db.enterUsers(data).then((data)=>{
        res.json({message:'success'})
    }).catch(err=>res.json({error:err}))
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
       cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage});

app.post('/ideas',upload.single('image'),(req,res)=>{
    const  {email,password,name,problemstatement,domain} = req.body;
    const image_url = req.file.path;
    db.addIdeas(email,password,name,problemstatement,image_url,domain).then(()=>{
        res.json({message:'success'})
    }).catch(err=>res.json({error:err.message}))
})
app.put('/ideas/:id',upload.single('image'),(req,res)=>{ 
    const  {name,problemstatement,domain} = req.body;
    const image_url = req.file.path;
    var id=req.params.id;
    db.editIdeas(id,name,problemstatement,image_url,domain).then(()=>{
        res.json({message:'row with id edited successfully'});
    })
    .catch((err)=>{
        res.json({error:err});
    })
})

app.get('/ideas',(req,res)=>{
    db.getIdeas().then(data=>res.json(data))
    .catch(err=>res.json({error:err}))
})

app.delete('/ideas/:id',(req,res)=>{
    db.deleteIdeas(req.params.id).then(()=>{
        res.json({message:'deleted successfully'})
    }).catch(err=>res.json({error:err}))
})

app.post('/idea',upload.single('image'),(req,res)=>{
    const  {email,password,name,problemstatement,domain} = req.body;
    const image_url = req.file.path;
    db.addIdea(email,password,name,problemstatement,image_url,domain).then(()=>{
        res.json({message:'success'})
    }).catch(err=>res.json({error:err.message}))
})
app.put('/idea/:id',upload.single('image'),(req,res)=>{ 
    const  {name,problemstatement,domain} = req.body;
    const image_url = req.file.path;
    var id=req.params.id;
    db.editIdea(id,name,problemstatement,image_url,domain).then(()=>{
        res.json({message:'row with id edited successfully'});
    })
    .catch((err)=>{
        res.json({error:err});
    })
})

app.get('/idea',(req,res)=>{
    db.getIdea().then(data=>res.json(data))
    .catch(err=>res.json({error:err}))
})

app.delete('/idea/:id',(req,res)=>{
    db.deleteIdea(req.params.id).then(()=>{
        res.json({message:'deleted successfully'})
    }).catch(err=>res.json({error:err}))
})


app.listen(5000,()=>{
    console.log(`server was running at http://localhost:5000`);
})