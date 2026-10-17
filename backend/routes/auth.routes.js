import express from "express";
import { login, logout, signup, forgot, reset} from "../controllers/auth.controller.js";

const router=express.Router();

/*
router.get("/login",(req,res)=>{
    res.send("Login Route");
});
router.get("/logout",(req,res)=>{
    res.send("Logout Route");
});
router.get("/signup",(req,res)=>{
    res.send("Signup Route");
});
*/

//Call Controllers to handle the requests 


router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/forgot",forgot);

router.post("/reset/:token",reset)



/*
router.post("/resetpassword",reset);

router.get('/resetpassword',async(req,res) => {
    const {id,token} =req.params;
    console.log(req.params);
})
*/


//export the router

export default router;