export const protectRoute = async(req , res , next)=>{
    try{
        if(!req.auth().isAuthenticated()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access, please login first"
            });
        }

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}