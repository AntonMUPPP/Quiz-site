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
        question: "Which planet is known as the Red Planet?",
        answers:`<label><input type="radio" name="answer3" id="jupiter"> Jupiter</label>
        <label><input type="radio" name="answer3" id="mars"> Mars</label>
        <label><input type="radio" name="answer3" id="venus"> Venus</label>
        <label><input type="radio" name="answer3" id="saturn"> Saturn</label>`,
        correctAnswerId: "mars"
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
        question: "What is the powerhouse of the cell?",
        answers:`<label><input type="radio" name="answer6" id="nucleus"> Nucleus</label>
        <label><input type="radio" name="answer6" id="mitochondria"> Mitochondria</label>
        <label><input type="radio" name="answer6" id="endoplasmic-reticulum"> Endoplasmic reticulum</label>
        <label><input type="radio" name="answer6" id="golgi-apparatus"> Golgi apparatus</label>`,
        correctAnswerId: "mitochondria"
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
        question: "What is the largest mammal on Earth?",
        answers:`<label><input type="radio" name="answer8" id="elephant"> Elephant</label>
        <label><input type="radio" name="answer8" id="giraffe"> Giraffe</label>
        <label><input type="radio" name="answer8" id="gorilla"> Gorilla</label>
        <label><input type="radio" name="answer8" id="blue-whale"> Blue Whale</label>`,
        correctAnswerId: "blue-whale"
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
//Array of all the questions

let wrapper = document.querySelector(".wrapper")
let submitBtn = document.createElement("button")

for (let i = 0; i < questions.length; i++){     //For loop to append all of the questions from the array onto the page
    let questionContainer = document.createElement("div")       //Also adding pre-made classes to give them some styling
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

const submitContainer = document.querySelector(".submit-btn")   //Finds the div in the HTML that has the submit-btn class so the actual button goes in the right place
submitBtn.innerText = "Submit"
submitContainer.append(submitBtn)

//Function for the submit button
submitBtn.addEventListener("click", () => {
    window.scrollTo(0,0)    //Scrolls automatically to the top of the page after the button is pressed so you can see what questions you got wrong/right
    
    let selectedAnswers = []
    let correctAnswersCount = 0

    for (let i = 0; i < questions.length; i++) {        //For loop to get all the users answers
        let questionContainer = document.querySelectorAll(".question-container")[i]
        let selectedRadio = questionContainer.querySelector('input[type="radio"]:checked')

        if(selectedRadio){      //Checks if the user answered the question or not
            let userAnswerId = selectedRadio.id
            let isCorrect = userAnswerId === questions[i].correctAnswerId

            selectedAnswers.push({      //Pushes the users inputs to an array as an object per question
                userAnswerId: userAnswerId,
                isCorrect: isCorrect
            })

            if(isCorrect){      //Then checks if they got it right or not
                correctAnswersCount++       //If they did it increases their score and changes the background color of the question they got right to green
                questionContainer.style.backgroundColor = "green"
            }else if(!isCorrect){
                questionContainer.style.backgroundColor = "red"     //If they got it wrong, turns the background color red instead
            }
        }
        else{       //If they didnt, changes the color to gray to show that they missed or skipped a question
            questionContainer.style.backgroundColor = "gray"
        }
    }

    //console.log(selectedAnswers)      debugging stuff
    //console.log("Correct Answers Count:", correctAnswersCount)        debugging stuff

    const allAnswers = document.getElementsByClassName("answer-container")      //Gets all the answer containers
    //Using Array.from() to convert allAnswers into an array from an HTML collection
    Array.from(allAnswers).forEach((answer) => {
        answer.remove()     //Then removes the answer from each question just so you cant change the answer after you have submitted
    })
    submitBtn.remove()

    const score = document.createElement("h3")
    const resultText = document.createElement("p")
    const resultWindow = document.createElement("div")
    resultWindow.classList.add("result-window")
    wrapper.append(resultWindow)

    score.innerText = `${correctAnswersCount}/10`
    //If statement to check the users score in % and then changes the color and text accordingly
    if(correctAnswersCount >= questions.length * 0.75){
        resultText.style.color = "green"
        score.style.color = "green"
        resultText.innerText = "Incredibly well done!"
    }else if(correctAnswersCount >= questions.length * 0.50){
        resultText.style.color = "orange"
        score.style.color = "orange"
        resultText.innerText = "Well done!"
    }else if(correctAnswersCount <= questions.length * 0.50){
        resultText.style.color = "red"
        score.style.color = "red"
        resultText.innerText = "You did not pass!"
    }
    resultWindow.append(score)
    resultWindow.append(resultText)

    const retakeBtn = document.createElement("button")
    retakeBtn.innerText = "Retake Quiz"
    submitContainer.append(retakeBtn)
    //Adds a retake quiz button but its not very advanced, just reloads the page and scrolls all the way up
    retakeBtn.addEventListener("click", () => {
        location.reload()
        window.scrollTo(0,0)
    })
})


function changeTheme(){
    const myh1 = document.querySelector("h1")
    const header = document.querySelector(".header")
    const themeBtn = document.querySelector(".theme-btn")
    //Toggles darkmode classes on the elements that should be affected
    //Also toggles a class on the theme button to create a cool transition and hover effect
    document.body.classList.toggle("darkmode-bg")
    header.classList.toggle("darkmode-header")
    myh1.classList.toggle("darkmode-txt")
    themeBtn.classList.toggle("active")

    let questionContainers = document.querySelectorAll(".question-container")
    //Goes through each container in questionContainers and gets the h2 to change theme
    questionContainers.forEach(container => {
        let questionName = container.querySelector("h2")
        questionName.classList.toggle("darkmode-txt")
    })
}