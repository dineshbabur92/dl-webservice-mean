var User = require("../db/models").User;

exports.profile = function(req, res){
    
    if(!req.payload){
        res.status(401).json({
            
            "message": "unauthorizedError: Private Profile"
            
        });
    }
    
    else{
        
        User.findById(req.payload._id)
        .exec(function(err, user){
            
            if(err){
                res.status(401).json({
                    "message": "unauthorizedError: Private Profile"
                });
            }
            else{
                
                res.status(200).json(user);
                
            }
        });
        
    }
    
}