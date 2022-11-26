module.exports = (template, token) => {
    switch (template) {
        case ('register'):
            return `<b>Welcome to Festival CMS</b>
            <p>Please click <a href='http://localhost:3000/email-confirm/${token}'>here</a> to verify your email</p>
        `
        case ('forgotpassword'):
            return `
            <!DOCTYPE html>
            <html>
              <body>
                <b>Forgot your password</b>
                <p>Please click <a href='http://localhost:3000/change-password/${token}'>here</a> to set a new password</p>     
              </body>
            </html>
            `
        default:
            return
    }
}
