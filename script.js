let questions = [
    {
        id: "q1",
        question: "The Great Wall of China is visible from the moon.",
        answers: `<label><input type="radio" name="answer1" id="true"> True</label>
        <label><input type="radio" name="answer1" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        id: "q2",
        question: "The Earth is flat.",
        answers: `<label><input type="radio" name="answer2" id="true"> True</label>
        <label><input type="radio" name="answer2" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        id: "q3",
        question: "The sun is a planet.",
        answers:`<label><input type="radio" name="answer3" id="true"> True</label>
        <label><input type="radio" name="answer3" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        id: "q4",
        question: "Bananas are berries.",
        answers:`<label><input type="radio" name="answer4" id="true"> True</label>
        <label><input type="radio" name="answer4" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        id: "q5",
        question: "Mount Everest is the tallest mountain in the world.",
        answers:`<label><input type="radio" name="answer5" id="true"> True</label>
        <label><input type="radio" name="answer5" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        id: "q6",
        question: "The Eiffel Tower is made entirely of iron.",
        answers:`<label><input type="radio" name="answer6" id="true"> True</label>
        <label><input type="radio" name="answer6" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        id: "q7",
        question: "The Great Barrier Reef is the largest living structure on Earth.",
        answers:`<label><input type="radio" name="answer7" id="true"> True</label>
        <label><input type="radio" name="answer7" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        id: "q8",
        question: "The moon has its own light source.",
        answers:`<label><input type="radio" name="answer8" id="true"> True</label>
        <label><input type="radio" name="answer8" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        id: "q9",
        question: "The Sahara Desert is the largest desert in the world.",
        answers:`<label><input type="radio" name="answer9" id="true"> True</label>
        <label><input type="radio" name="answer9" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        id: "q10",
        question: "The currency of Japan is the yuan.",
        answers:`<label><input type="radio" name="answer10" id="true"> True</label>
        <label><input type="radio" name="answer10" id="false"> False</label>`,
        correctAnswerId: "false"
    },
]

let wrapper = document.querySelector(".wrapper")
let submitBtn = document.createElement("button")
let allText = document.getElementsByTagName("h2")
const header = document.querySelector(".header")
const myh1 = document.querySelector("h1")
const themeBtn = document.querySelector(".theme-btn")
const resultWindow = document.createElement("div")
resultWindow.classList.add("result-window")

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

const submitContainer = document.querySelector(".submit-btn")
    submitBtn.innerText = "Submit"
    submitContainer.append(submitBtn)

submitBtn.addEventListener("click", () => {
    let selectedAnswers = []
    let correctAnswersCount = 0

    for (let i = 0; i < questions.length; i++) {
        let questionContainer = document.querySelectorAll(".question-container")[i]
        let selectedRadio = questionContainer.querySelector('input[type="radio"]:checked')

        if (selectedRadio) {
            let userAnswerId = selectedRadio.id
            let isCorrect = userAnswerId === questions[i].correctAnswerId

            selectedAnswers.push({
                userAnswerId: userAnswerId,
                isCorrect: isCorrect
            })

            if (isCorrect) {
                correctAnswersCount++
            }
        }
    }

    console.log(selectedAnswers)
    console.log("Correct Answers Count:", correctAnswersCount)

    const allQuestions = document.getElementsByClassName("question-container")
    Array.from(allQuestions).forEach((question) => {
        question.remove()
    })
    submitBtn.remove()

    const score = document.createElement("h3")
    const resultText = document.createElement("p")

    wrapper.append(resultWindow)
    score.innerText = `${correctAnswersCount}/10`
    if(correctAnswersCount >= questions.length * 0.75){
        resultText.style.color = "green"
        score.style.color = "green"
        resultText.innerText = "Riktigt bra jobbat!"
    }else if(correctAnswersCount >= questions.length * 0.50){
        resultText.style.color = "orange"
        score.style.color = "orange"
        resultText.innerText = "Bra jobbat!"
    }else if(correctAnswersCount <= questions.length * 0.50){
        resultText.style.color = "red"
        score.style.color = "red"
        resultText.innerText = "Underkänd!"
    }
    resultWindow.append(score)
    resultWindow.append(resultText)
})

function changeTheme(){
    document.body.classList.toggle("darkmode-bg")
    header.classList.toggle("darkmode-header")
    myh1.classList.toggle("darkmode-txt")
    themeBtn.classList.toggle("active")

    let questionContainers = document.querySelectorAll(".question-container")
    questionContainers.forEach(container => {
        let questionName = container.querySelector("h2")
        questionName.classList.toggle("darkmode-txt")
    })
}