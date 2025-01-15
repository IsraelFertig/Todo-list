import User from "../models/user.model.js";
import { hash } from "bcrypt";

export const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            msg: "Users retrieved successfully.",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failed to retrieve users.",
            error: error.message || error
            ,});
    }
};

export const signUp = async (req , res)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            msg: "User created successfully.",
            data: user,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            msg: "Failed to create user.",
            error: error.message || error
            ,});

    }

};
export const signIn = async (req , res)=>{
    try{
        const {userEmail, userPassword} = req.body;
        const user = await User .findOne({  userEmail }); 
        if(!user) throw new Error("Invalid email or password.");
    }
    catch(error){
        
    }
};