const checkPasswordStrength = (req, res, next) => {
    try{
        const password = req.body.password
        const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const symbols = '!@#$%^&*()_+-=[]{};\\:"|,.<>/?';

        let hasUpperCase = false;
        let hasSymbol = false;
        // grab the password
        // go over each charachter and find out if it's uppercase/lower/special character
        // coompare against require rules(atleast one upper and one special character)
        // if it passes, let it gro through
        // if it doesnt pass throw an error
        for(let i = 0; i < password.length; ++i){
            // check if character is either uppercase or a symbol
            const currChar = password[i]
            if(uppercaseLetters.includes(currChar)) {
                hasUpperCase = true;
            } else if(symbols.includes(currChar)){
                hasSymbol = true;
            }
        }
        if(hasSymbol && hasUpperCase){
            next();
        }else{
            throw new Error("Password must contain at least one uppercase character and one special character.")
        }

    } catch (error){
        next(error)
    }
}
module.exports = checkPasswordStrength;