export const modalOptions = {
    text: `<div class="modal-option">First time here? <a href="#" id="signup-opt">Sign up</a> for Askme</div>`,
    btnSignup: `Sign up`
}

export function isValid(value) {
    return value.length >= 10
}

export function createModal(title, content) {
    const modal = document.createElement('div')
    modal.classList.add('modal')

    modal.innerHTML = `
        <h1>${title}</h1>
        <div calss="modal-content">${content}</div>
    `

    mui.overlay('on', modal)
}

export function createButton(id, text) {
    const button = document.createElement('button')
    button.classList.add('mui-btn')
    button.classList.add('mui-btn--raised')
    button.classList.add('mui-btn--accent')
    button.id = id
    button.textContent = text

    document.body.appendChild(button)
}

export function addQuestionToList(question) {
    const list = document.querySelector('#list')

    list.insertAdjacentHTML('afterbegin',  `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `)
}