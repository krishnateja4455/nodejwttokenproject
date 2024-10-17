const Router=require("router");
const router=Router();

router.get("/signup",(req,res)=>{
    res.render("signup");
})


module.exports=router;