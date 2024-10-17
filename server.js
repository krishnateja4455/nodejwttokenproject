const express=require("express");
const loginRouter=require("./Routes/loginRoutes");
const signupRouter=require("./Routes/signupRoutes");
const path=require("path");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const app=express();
const jwttoken=require("jsonwebtoken");
const secreteKey="R@12#$45";

app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.use(loginRouter);
app.use(signupRouter);





function authenticationToken(req,res,next){

    let token=req.cookies.token;
    console.log(token);

    if(!token){
        return res.redirect("/login");
    }

    jwttoken.verify(token,secreteKey,(err,user)=>{
        if(err){
         res.clearCookie("token");
         return  res.status(403).render("login",{error:"Token expired please login again"});
        }
        req.user=user;
        next();
    })


}



app.get("/",authenticationToken,(req,res)=>{
   
     console.log(req.user);

     res.render("home");
});

app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
})



const port=8000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
