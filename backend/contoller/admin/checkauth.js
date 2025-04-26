const checkAuth = (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            return res.status(200).json({ message: "User is authenticated" });
        } else {
            return res.status(401).json({ message: "User is not authenticated" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = checkAuth;