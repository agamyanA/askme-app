export class Question {

    static post(uid, question) {
        return fetch(`https://askme-app-2070b-default-rtdb.firebaseio.com/${uid}.json`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    static async get(uid) {
        const data = await fetch(`https://askme-app-2070b-default-rtdb.firebaseio.com/${uid}.json`)
        const questionList = await data.json()

        if (questionList !== null) {

            const question = Object.keys(questionList).map(key => ({...questionList[key]}))
            question.reverse()
            this.renderList(question)

        } else {
            
            document.querySelector('#list').innerHTML = `
                <div class="mui--text-headline" id="info">You haven't asked any questions yet</div>
                `
        }
    }
   
    static toCard(question) {
        return `
            <div class="mui--text-black-54">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div>${question.text}</div>
            <br>
        `
    }
    
    static renderList(question) {    
        document.querySelector('#list')
            .innerHTML = question.map(this.toCard).join('')
    }
}