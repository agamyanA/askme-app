export class Auth  {

    static getAuthForm(text, btnText = 'Log in') {
        return `
        <form class="mui-form modal-content" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="auth-email" required>
                <label for="auth-email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="auth-password" required>
                <label for="auth-password">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="signup-btn">${btnText}</button>
            ${text}
        </form>
        `
    }

    static signUpFormHandler(event) {
        event.preventDefault()
    
        const email = event.target.querySelector('#auth-email').value
        const password = event.target.querySelector('#auth-password').value
     
        auth.createUserWithEmailAndPassword(email, password)
            .then(mui.overlay('off'))
    }
  
    static signInFormHandler(event) {
        event.preventDefault()

        const email = event.target.querySelector('#auth-email').value
        const password = event.target.querySelector('#auth-password').value

        auth.signInWithEmailAndPassword(email, password)
            .then(mui.overlay('off'))
            .catch(err => alert('Wrong email or password'))
    }

    static signOut(event) {
        event.preventDefault()

        auth.signOut()
    }

}