const jwt = require("jsonwebtoken");
const chalk = require("chalk");

module.exports = {
    sign: function(data){
        return jwt.sign(data, process.env['SECRET_KEY'], { expiresIn: "2d" });
    },
    verify: async function(token){
        try{
            var data = await jwt.verify(token, process.env['SECRET_KEY']);
            return { data };
        }catch(error){
            console.log(chalk.red("error occurred while verifing token "), error);
            return { error }
        }
    }
}