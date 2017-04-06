var User = require("../db/models").User;
var passport = require("passport");

exports.login = function(req, res){
    
    passport.authenticate("local", function(err, user){
        
        if(err){
            
//            console.log("db authentication error: " err);
            
            res.status(404).json({
                
                message: "authentication failed"
                
            });
            return;
            
        }

        if(user){
            
            var token = user.generateJwt();
            res.status(200).json({
                
                token: token
                
            });
            
        }
        else{
            
            res.status(401).json({
                
                message: "User not found, please register"
                
            });
            return;
            
        }
            
    })(req, res);
    
}

exports.register = function(req, res){
    
    console.log(req.body);
    var user = new User();
    
    user.name = req.body.name;
    user.email = req.body.email;
    
    user.setPassword(req.body.password);
    
    user.save(function(err){
        
        var token;
        token = user.generateJwt();
        
        res.status(200).json({
            
            token : token 
            
        });
        
    });
    
}