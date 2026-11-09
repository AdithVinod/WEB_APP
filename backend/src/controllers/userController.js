import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const register = async(req, res) =>{
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if(user){
            res.json(user);
        }

        else{
            res.status(400).json({
                message: 'Invalid user data'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
};

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user,"jhj")
        if(!user){
            return res.status(404).json({error:"User does not exist"});
        }    

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid user"})
        } 
            
            const token = generateToken(user.id);
            return res.json({
                token,
                message:"Login successful",
                user:{
                    id:user._id,
                    name:user.name
                }
            });
        }
    catch (error) {
        return res.status(500).json({error:'An error occurred. Please try again'})
    }
};

export {register, login};