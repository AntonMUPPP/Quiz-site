let questions = [
    {
        id: "q1",
        question: "ratatatatatat",
        answers: `<label><input type="radio" name="answer1" id="true"> True</label>
        <label><input type="radio" name="answer1" id="false"> False</label>`
    },
    {
        id: "q2",
        question: "How many moons does Jupiter have",
        answers: `<label><input type="radio" name="answer2" id="true"> True</label>
        <label><input type="radio" name="answer2" id="false"> False</label>`
    },
    {
        id: "q3",
        question: "hur många bollar finns",
        answers:`<label><input type="radio" name="answer3" id="5"> 5</label>
        <label><input type="radio" name="answer3" id="50"> 50</label>
        <label><input type="radio" name="answer3" id="500"> 500</label>
        <label><input type="radio" name="answer3" id="5000"> 5000</label>`
    },
]

let wrapper = document.querySelector(".wrapper")

function startQuiz(){
    const tempElement = document.querySelector(".temp-element")
    tempElement.remove()

    for (let i = 0; i < questions.length; i++){
        let questionContainer = document.createElement("div")
        questionContainer.classList.add("question-container")
    
        let temp = document.createElement("div")
        temp.classList.add("answer-container")
        temp.innerHTML = questions[i].answers
    
        let questionName = document.createElement("h2")
        questionName.innerText = questions[i].question
        questionContainer.append(questionName)
    
        wrapper.append(questionContainer)
        questionContainer.append(temp)
    }

    let submitBtn = document.createElement("button")
    const submitContainer = document.querySelector(".submit-btn")
    submitBtn.innerText = "Submit"
    submitContainer.append(submitBtn)
}