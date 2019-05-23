const jwt = require('jsonwebtoken');
const appData = require("../appData").appData;
module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    }
    catch( error ) {
        return res.send({status:401, message: "Unauthorized"});
    }
}