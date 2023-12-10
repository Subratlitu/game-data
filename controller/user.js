const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const dbPool = require('../model/sqlSchema')
const publishEvent = require('../eventPublisher')
const isValidEmail=function(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
 }
const userRegister=async function(req,res){
    try{
    
    let {name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400).send({status:false,message:"please enter required fields"})
        return
    }
    if(!isValidEmail(email)){
        res.status(400).send({status:false,message:"enter a valid email address"})
        return
    }

    let isalreadyExistEmail = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);
     if(isalreadyExistEmail && isalreadyExistEmail[0].length > 0){
        res.status(400).send({status:false,message:"email is already exist"})
        return
    }
    //password masking
    let saltRounds=10
    let salt=await bcrypt.genSalt(saltRounds)
    let hash=await bcrypt.hash(password,salt)
    password=hash

    const newUser = {   name, email, password };

    let [userData] = await dbPool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [newUser.name, newUser.email, newUser.password]);
     // Publish the user registration event
     publishEvent({ userId: userData.insertId, name, email });
     
    return res.status(201).send({status:true,message:"data created successfully",data:userData})
}
catch (err) {
    
    return res.status(500).send({ status: false, message: err.message })
}

}


//login user
const userLogin=async function(req,res){
    try{
    let requestBody=req.body
    let {email,password}=requestBody

    if( !email || !password){
        res.status(400).send({status:false,message:"please enter required fields"})
        return
    }
    if(!isValidEmail(email)){
        res.status(400).send({status:false,message:"enter a valid email address"})
        return
    }
 

    let user=await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if(!user){
        res.status(404).send({status:false,message:"user does not exist"})
        return
    } 
    //decrypting password
    let isValidPassword= await bcrypt.compare(password,user[0][0].password)
    if(!isValidPassword){
        return res.status(400).send({status:false,message:"wrong password"})
    }


    let userId=user[0][0].id
    const token = jwt.sign({
        userId: userId,
        iat:Math.floor(Date.now()/1000),
        exp:Math.floor(Date.now()/1000)+10*60*60
     },"game-api");
    
    let selectData={
        userId,
        token
    }
    res.status(200).json({status:true,message:"user login succesfully", data:selectData});
    }
    catch(err){
        
        return res.status(500).send({ status: false, message: err.message })
    }
}
    




module.exports={
    userRegister,
    userLogin 
}