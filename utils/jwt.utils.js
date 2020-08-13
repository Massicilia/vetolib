var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'zXfjj5qNRJsyMvApkbopHc0_6o-nmUP04h9q2kxr7JC11spzQ70Va-E48TluMgZtgZtTm381vtJ7cp4y4ePbkw6yTDmKlbDu4MJexgWg8wOGG8Gwn-VWGh9kk1evIahgHNA6yEwdWeOe4mfKHXslqHJkKNbfFJR82A9Md-mAjOs';
module.exports = {
    /**
     *
     * @param userData
     * @returns {undefined|*}
     */
    generateTokenForPetowner: function(userData){
        return jwt.sign({
            idpetowner: userData.idpetowner,
        },
        JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    },
    /**
     *
     * @param userData
     * @returns {undefined|*}
     */
    generateTokenForVeterinary: function(userData){
        return jwt.sign({
                nsiret: userData.nsiret,
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    }
}