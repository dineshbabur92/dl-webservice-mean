var User = require("../db/models").User;
var passport = require("passport");

exports.login = function(req, res){
    
    passport.authenticate("local", function(err, user, info){
        
        if(err){
            
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
            
            res.status(401).json(info);
            return;
            
        }
            
    })(req, res);
}

exports.register = function(req, res){
    
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