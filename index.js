const express=require("express");
const app=express();
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const mongoose=require("mongoose");
const chat=require("./model/chat.js");
main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

app.get("/chat",async(req,res)=>{
   let chating= await chat.find();
   res.render("index.ejs",{chating});
})
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chat",(req,res)=>{
    const{form,masg,to}=req.body;
    let newchat=new chat({
        from : form,
        msg: masg,
        to: to,
        created_at:new Date()
    })
    newchat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chat");
});
app.get("/chat/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let Chatt=await chat.findById(id);
    res.render("edit.ejs",{Chatt})
   
});
app.put("/chat/:id",async(req,res)=>{
    let{id}=req.params;
    const {edit}=req.body;

    let updated=await chat.findByIdAndUpdate(id,{msg:edit});
    console.log(updated);
    res.redirect("/chat");


})
app.get("/chat/:id/delete",(req,res)=>{
    let{id}=req.params;
    res.render("delete.ejs",{id});
})
app.delete("/chat/:id",async(req,res)=>{
   let {id}=req.params;
   let count =await chat.findByIdAndDelete(id);
   console.log(count);
   res.redirect("/chat");
})
app.get("/",(req,res)=>{
    res.send("root working");
})
app.listen(8080,()=>{
    console.log("servser is working");
})
