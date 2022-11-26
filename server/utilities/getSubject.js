module.exports = (template) => {
    switch (template) {
        case ('register'):
            return 'Welcome to Festival CMS'
        case ('forgotpassword'):
            return 'Forgot password - set new password'
        default:
            return
    }
}