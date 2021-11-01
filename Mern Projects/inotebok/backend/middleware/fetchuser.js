const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Hrikbanisagoodboy';

const fetchuser = (req, res, next) => {
    // Get the user details using the token and fetch user details 
    const token = req.header('auth-token');
    if (!token) {
        res.send(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.send(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;