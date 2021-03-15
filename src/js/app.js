import '../styles.css'
import { createModal, isValid, modalOptions, createButton, addQuestionToList } from './utils'
import { Question } from './question'
import { Auth } from './auth'

getSingInBtn()

const form = document.querySelector('#question-form')
const input = form.querySelector('#question-input')
const submit = form.querySelector('#question-submit')
const list = document.querySelector('#list')

auth.onAuthStateChanged(user => {
    if (user) {

        input.disabled = false
        const uid = user.uid

        window.addEventListener('load', Question.get(uid))
        form.addEventListener('submit', submitHandler)
        input.addEventListener('input', () => {
            submit.disabled = !isValid(input.value)
        })

        document.querySelector('#signin-btn').remove()
        getLogOutBtn()

    } else {

        input.disabled = true
        submit.disabled = true

        list.innerHTML = `<div class="mui--text-headline">Sign in to ask a question</div>`
        
        document.querySelector('#logout-btn').remove()
        getSingInBtn()
    }
})

function submitHandler(event) {
    event.preventDefault()
    if (document.querySelector('#info')) {
        document.querySelector('#info').remove()
    }

    const user = auth.currentUser
    const uid = user.uid

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submit.disabled = true

        Question.post(uid, question)
            .then(addQuestionToList(question))
            .then(() => {
                input.value = ''
                input.className = ''
                submit.disabled = false
            })
    }
}

function openModal() {
    createModal('Sign in', Auth.getAuthForm(modalOptions.text))
    document.querySelector('#auth-form')
        .addEventListener('submit', Auth.signInFormHandler, {once: true})
    document.querySelector('#signup-opt')
        .addEventListener('click', openModalSignUp)
}

function openModalSignUp(event) {
    event.preventDefault()

    createModal('Sign up', Auth.getAuthForm('', modalOptions.btnSignup))
    document.querySelector('#auth-form')
        .addEventListener('submit', Auth.signUpFormHandler, {once: true})
}

function getLogOutBtn() {
    createButton('logout-btn', 'log out')
    document.querySelector('#logout-btn')
        .addEventListener('click', Auth.signOut)
}

function getSingInBtn() {
    createButton('signin-btn', 'sign in')
    document.querySelector('#signin-btn')
        .addEventListener('click', openModal)
}