const express=require("express")
const multer=require("multer")
const fs=require("fs")

const app=express()
const upload=multer({dest:"uploads/"})

app.use(express.json())
app.use(express.static("public"))

let users={}

app.post("/register",(req,res)=>{
 const{username,password}=req.body
 if(users[username]) return res.json({success:false})
 users[username]={password,servers:[]}
 fs.mkdirSync(`servers/${username}`,{recursive:true})
 res.json({success:true})
})

app.post("/login",(req,res)=>{
 const{username,password}=req.body
 if(users[username]&&users[username].password===password)
  res.json({success:true})
 else res.json({success:false})
})

app.post("/create-server",(req,res)=>{
 const{username,name}=req.body
 const dir=`servers/${username}/${name}`
 fs.mkdirSync(dir+"/files",{recursive:true})
 users[username].servers.push(name)
 res.json({success:true})
})

app.post("/upload",upload.single("file"),(req,res)=>{
 const{username,server}=req.body
 const target=`servers/${username}/${server}/files/${req.file.originalname}`
 fs.renameSync(req.file.path,target)
 res.json({success:true})
})

const PORT=process.env.PORT||3000
app.listen(PORT,()=>console.log("Server läuft"))
