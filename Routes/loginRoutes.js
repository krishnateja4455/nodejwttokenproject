const Router=require("router");
const mockUsers=require("../data");
const jwttoken=require("jsonwebtoken");
const secreteKey="R@12#$45";
const router=Router();



function loginMiddleware(req,res,next){
  let token=req.cookies.token;
  jwttoken.verify(token,secreteKey,(err,user)=>{
      if(err){
         next();
      }
       res.redirect("/");
  })
}




router.get("/login",loginMiddleware,(req,res)=>{
    res.render("login");
});


router.post("/login",(req,res)=>{

      const{email,password}=req.body;
      console.log(email,password);
      const filteredEmail=mockUsers.find(each=>each.email===email);

      console.log(filteredEmail);

      if(!filteredEmail){
        return res.status(401).render('login',{error:"User Not Registered"});
      }else{

          if(password!==filteredEmail.password){
             return res.status(401).render('login',{error:"Password Not Matched"});
          }else{

           const token=jwttoken.sign({id:filteredEmail.id,email:filteredEmail.email},secreteKey,{expiresIn:'1m'});
           console.log(token);
           res.cookie('token',token,{httpOnly:true});
           res.redirect("/");
          }


      }

      



});


module.exports=router;

