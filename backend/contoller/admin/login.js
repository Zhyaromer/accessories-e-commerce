require("dotenv").config();

const login = async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
            req.session.isAuthenticated = true;
            req.session.user = { username: username }; 
            return res.status(200).json({ 
                message: "Login successful",
                authenticated: true
            });
        } 

        return res.status(401).json({ 
            message: "Invalid username or password",
            authenticated: false
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    } 
}

module.exports = login;