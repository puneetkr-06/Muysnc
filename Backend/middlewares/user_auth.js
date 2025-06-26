const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.user_auth = (req,res,next) => {
  try{
     //extract jwt token
     const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

     if(!token){
      return res.status(401).json({
        success : false,
        message : "Token Missing"
      });
     }

     //Verify Token
     try{
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
     }
     catch(error){
      return res.status(401).json({
        success : false,
        message : "Token is Invalid"
      })
     }
     next();

  } catch(error){
        return res.status(401).json({
          success : false,
          message : "Something Went Wrong while verifying the Token"
        })
  }
} 