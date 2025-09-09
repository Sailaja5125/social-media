import { getAuth } from "@clerk/express"; // or "@clerk/nextjs/server" if you're using Next.js

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, please login first",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};