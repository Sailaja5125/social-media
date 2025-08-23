import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async(req, res, next)=>{
      try {
        const decision = await aj.protect(req, {
          requested: 1, // Indicates one unit of usage (e.g., one request)
        });
    
        if (decision.isDenied()) {
          // Handle Rate Limiting
          if (decision.reason.isRateLimit()) {
            return res.status(429).json({
              error: "Too Many Requests",
              message: "You have exceeded the allowed request rate. Please try again later.",
            });
          }
    
          // Handle Bot Detection
          else if (decision.reason.isBot()) {
            return res.status(403).json({
              error: "Access Denied",
              message: "Automated traffic is not allowed.",
            });
          }
    
          if(decision.results.some((results)=>results.reason.isBot() && results.reason.isSpoofed())){
            return res.status(403).json({
                error:"Spoofed bot detected",
                message:"Malicios bot activity detected"
            })
          }
    
          // Handle Other Denial Reasons (e.g., Shield rule violations)
          else {
            return res.status(403).json({
              error: "Access Denied",
              message: "Your request was blocked due to security rules.",
            });
          }
        }
    
        // If not denied, continue to next middleware or route
        next();
      } catch (error) {
        console.error("Arcjet middleware error:", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while processing your request.",
        });
      }
    };

    