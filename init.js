const mongoose=require("mongoose");
const chat=require("./model/chat.js");
main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
let chatall=[
    {
        from:"parul",
        to:"akshita",
        msg:"hii akshui",
        created_at:new Date()
    },
    {
        from:"akshita",
        to:"parul",
        msg:"hii parul",
        created_at:new Date()
    },

    {
        from:"parul",
        to:"akshita",
        msg:"teri laptop wali video par bhut comments ha instagram par",
        created_at:new Date()
    },
    {
        from:"akshita",
        to:"parul",
        msg:"kya comments kiya ha log na",
        created_at:new Date()
    },
    {
        from:"parul",
        to:"akshita",
        msg:"nikali collector@",
        created_at:new Date()
    }
]
  chat.insertMany(chatall).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});
