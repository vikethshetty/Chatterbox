import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import nodeMailer from "nodemailer";
import randomString from "randomstring";
import jwt1 from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const sendResetPasswordMail = async (name,email,token) => {
    try {
        const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        })[character]);
        const safeName = escapeHtml(name || "there");
        const frontendUrl = (process.env.FRONTEND_URL || "https://chatterbox-theta-inky.vercel.app").replace(/\/$/, "");
        const resetUrl = `${frontendUrl}/reset/${token}`;
        const safeResetUrl = escapeHtml(resetUrl);

        const transporter = nodeMailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS:true,
            auth: {
                user:process.env.USER,
                pass:process.env.PASS
            }
        });

        const mailOptions = {
            from:{
                name:"ChatterBox",
                address:process.env.USER
            },
            to: email,
            subject: "Reset your ChatterBox password",
            text: `Hi ${name || "there"},\n\nWe received a request to reset your ChatterBox password. Use this link to choose a new password:\n${resetUrl}\n\nIf you didn't request a password reset, you can ignore this email. Your password will remain unchanged.`,
            html: `
                <!doctype html>
                <html lang="en">
                  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
                    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
                      Use this secure link to reset your ChatterBox password.
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:32px 12px;">
                      <tr>
                        <td align="center">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
                            <tr>
                              <td style="padding:24px 32px;background-color:#0f172a;color:#ffffff;">
                                <div style="font-size:20px;font-weight:700;letter-spacing:0.2px;">ChatterBox</div>
                                <div style="margin-top:5px;font-size:12px;color:#bae6fd;">ACCOUNT SECURITY</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:32px;">
                                <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:#0f172a;">Reset your password</h1>
                                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeName},</p>
                                <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155;">We received a request to reset the password for your ChatterBox account. Use the button below to choose a new password.</p>
                                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                                  <tr>
                                    <td align="center" style="border-radius:8px;background-color:#0284c7;">
                                      <a href="${safeResetUrl}" style="display:inline-block;padding:13px 22px;border:1px solid #0284c7;border-radius:8px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Reset password</a>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#64748b;">If the button doesn't work, copy and paste this link into your browser:</p>
                                <p style="margin:0 0 24px;font-size:13px;line-height:1.6;word-break:break-all;"><a href="${safeResetUrl}" style="color:#0284c7;">${safeResetUrl}</a></p>
                                <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:18px 32px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.5;color:#94a3b8;">
                                This is an automated message from ChatterBox. Please don't reply to this email.
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>
            `,
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Mail has been sent:-",info.response);
            }

        });
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }

}


export const signup=async(req,res)=>{
    try{
        const {fullName,username,email,password,confirmPassword,gender}=req.body;

        if(password!==confirmPassword){
            return res.status(400).json({message:"Password and Confirm Password does not match"});

        }

        const user=await User.findOne({username});
        
        if(user){
            //return res.status(400).error("User already exists");
            return res.status(800).json({message:"User already exists"});
        }
        
        const emailUser=await User.findOne({email});
        if(emailUser){
            //return res.status(400).error("Email already exists");
            return res.status(800).json({message:"Email already exists"});
        }

        //HASH PASSWORD HERE
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        // https://avatar-placeholder.iran.liara.run/

        const profilePic = gender === "male" ? "/avatars/male.svg" : "/avatars/female.svg";

        const newUser=new User({
            fullName,
            username,
            email,
            password:hashedPassword,
            gender,
            profilePic
        });

        if(newUser){
            //Generate JWT token here
            await generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
        
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            email:newUser.email,
            gender:newUser.gender,
            profilePic:newUser.profilePic,
        });
        }else{
            res.status(400).json({message:"Invalid User Data"});
        }
    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        generateTokenAndSetCookie(user._id,res);
        
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            gender:user.gender,
            profilePic:user.profilePic,
        });

    }
    catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});

    }
    catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const forgot = async(req,res)=>{
    try {
        const email=req.body.email;
        const user=await User.findOne({email:email});
        if(user){
            //const random = randomString.generate();
            const random = jwt1.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '5m'});
            const data = await User.updateOne({email:email},{$set:{token:random}});
            sendResetPasswordMail(user.fullName,user.email,random);
            res.status(200).json({message:"Email sent to your mail inbox and reset you password."});

        }else{
            res.status(200).json({error:"Email not exist"});
        }
        
    } catch (error) {
        console.error("Error in forgot controller: ",error.message);
        res.status(500).json({error:"Internal Server Error"});
        
    }
}

export const reset = async(req,res) =>{
    try {
        const {token} = req.params;
        const {password,confirmPassword} = req.body
        if(password!==confirmPassword){
            return res.status(400).json({message:"Password and Confirm Password does not match"});
        }
        if(!token){
            return res.status(400).json({error:"Token is required"});
        }
        const user = await User.findOne({token:token});
        if(user){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const updatedPassword=await User.findByIdAndUpdate({
                _id : user._id},
                {$set:{password:hashedPassword,token:''}},
                {new:true}
            );
            res.status(200).json({success:true,message:"Password updated successfully",data:updatedPassword});

        }else{
            res.status(200).json({error:"This Link has been expired"});
        }
        
    } catch (error) {
        console.error("Error in reset controller: ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

/*
export const reset= async (req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"User not found"});
        }
        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ email:user.email, id:user._id},secret, {
            expiresIn : '5m',
        });
        const link = `http://localhost:5000/reset/${user._id}/${token}`;
        console.log(link);
    }catch(error){
        console.log("Error in reset controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    
}
*/

