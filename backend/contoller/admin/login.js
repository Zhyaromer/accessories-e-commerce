require("dotenv").config();

const login = async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        if (username == process.env.USER && password == process.env.PASSWORD) {
            req.session.isAuthenticated = true;
            return res.status(200).json({ message: "Login successful" });
        } 

        return res.status(401).json({ message: "Invalid username or password" });
    } catch (err) {
        console.error("Error during login: ", err);
        return res.status(500).json({ message: "Internal server error" });
    } 
}

module.exports = login;