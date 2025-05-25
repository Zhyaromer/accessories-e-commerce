const checkAuth = (req, res, next) => {
    try {
        if (req.session.isAuthenticated) {
            next(); 
        } else {
            return res.status(401).json({ message: "Unauthorized: Please login first" });
        }
    } catch (err) {
        console.error("Auth check error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = checkAuth;