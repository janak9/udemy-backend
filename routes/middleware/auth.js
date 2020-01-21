const jwtHelper = require("../../helper/jwtHelper");

module.exports = async function(req, res, next){
    const token = req.headers.auth_token;
    if(token){
        var decoded_data = await jwtHelper.verify(token);
        if(decoded_data.error){
            return res.status(401).send('Invalid Token!');
        }

        console.log(decoded_data);
        req.user = decoded_data.data;
        return next();
    }
    return res.status(400).send("please pass required token");
}