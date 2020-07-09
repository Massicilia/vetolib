var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'zXfjj5qNRJsyMvApkbopHc0_6o-nmUP04h9q2kxr7JC11spzQ70Va-E48TluMgZtgZtTm381vtJ7cp4y4ePbkw6yTDmKlbDu4MJexgWg8wOGG8Gwn-VWGh9kk1evIahgHNA6yEwdWeOe4mfKHXslqHJkKNbfFJR82A9Md-mAjOs';
module.exports = {
    generateTokenForPetowner: function(userData){
        return jwt.sign({
            idpetowner: userData.idpetowner,
        },
        JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    }
}