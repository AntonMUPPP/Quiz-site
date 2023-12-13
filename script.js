let questions = [
    {
        type: "checkbox",
        question: "Which cities are capitals in Europe?",
        answers:`<label><input type="checkbox" name="answer1" id="stockholm">Stockholm</label>
        <label><input type="checkbox" name="answer1" id="cologne">Cologne</label>
        <label><input type="checkbox" name="answer1" id="paris">Paris</label>
        <label><input type="checkbox" name="answer1" id="helsinki">Helsinki</label>`,
        correctAnswerId: ["stockholm","paris","helsinki"]
    },
    {
        type: "torf",
        question: "The Earth is flat.",
        answers: `<label><input type="radio" name="answer2" id="true"> True</label>
        <label><input type="radio" name="answer2" id="false"> False</label>`,
        correctAnswerId: "false"
    },
    {
        type: "multiple",
        question: "Which planet is known as the Red Planet?",
        answers:`<label><input type="radio" name="answer3" id="jupiter"> Jupiter</label>
        <label><input type="radio" name="answer3" id="mars"> Mars</label>
        <label><input type="radio" name="answer3" id="venus"> Venus</label>
        <label><input type="radio" name="answer3" id="saturn"> Saturn</label>`,
        correctAnswerId: "mars"
    },
    {
        type: "checkbox",
        question: "Which of theses animals are mammals?",
        answers:`<label><input type="checkbox" name="answer4" id="crocodile">Crocodile</label>
        <label><input type="checkbox" name="answer4" id="elephant">Elephant</label>
        <label><input type="checkbox" name="answer4" id="kangaroo">Kangaroo</label>
        <label><input type="checkbox" name="answer4" id="lion">Lion</label>`,
        correctAnswerId: ["elephant","kangaroo","lion"]
    }, 
    {
        type: "torf",
        question: "Mount Everest is the tallest mountain in the world.",
        answers:`<label><input type="radio" name="answer5" id="true"> True</label>
        <label><input type="radio" name="answer5" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        type: "multiple",
        question: "What is the powerhouse of the cell?",
        answers:`<label><input type="radio" name="answer6" id="nucleus"> Nucleus</label>
        <label><input type="radio" name="answer6" id="mitochondria"> Mitochondria</label>
        <label><input type="radio" name="answer6" id="endoplasmic-reticulum"> Endoplasmic reticulum</label>
        <label><input type="radio" name="answer6" id="golgi-apparatus"> Golgi apparatus</label>`,
        correctAnswerId: "mitochondria"
    },
    {
        type: "torf",
        question: "The Great Barrier Reef is the largest living structure on Earth.",
        answers:`<label><input type="radio" name="answer7" id="true"> True</label>
        <label><input type="radio" name="answer7" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        type: "multiple",
        question: "What is the largest mammal on Earth?",
        answers:`<label><input type="radio" name="answer8" id="elephant"> Elephant</label>
        <label><input type="radio" name="answer8" id="giraffe"> Giraffe</label>
        <label><input type="radio" name="answer8" id="gorilla"> Gorilla</label>
        <label><input type="radio" name="answer8" id="blue-whale"> Blue Whale</label>`,
        correctAnswerId: "blue-whale"
    }, 
    {
        type: "torf",
        question: "The Sahara Desert is the largest desert in the world.",
        answers:`<label><input type="radio" name="answer9" id="true"> True</label>
        <label><input type="radio" name="answer9" id="false"> False</label>`,
        correctAnswerId: "true"
    },
    {
        type: "checkbox",
        question: "What are the primary colors in the RGB color model?",
        answers:`<label><input type="checkbox" name="answer10" id="red">Red</label>
        <label><input type="checkbox" name="answer10" id="green">Green</label>
        <label><input type="checkbox" name="answer10" id="blue">Blue</label>
        <label><input type="checkbox" name="answer10" id="yellow">Yellow</label>`,
        correctAnswerId: ["red","green","blue"]
    },  
]
//Array of all the questions
//Honestly i dont know if this way is optimal or not it was just what came to my head at 3am :D

let wrapper = document.querySelector(".wrapper")

for (let i = 0; i < questions.length; i++){     //For loop to append all of the questions from the array onto the page
    let questionContainer = document.createElement("div")       //Also adding pre-made classes to give them some styling
    questionContainer.classList.add("question-container")

    let answerContainer = document.createElement("div")
    answerContainer.classList.add("answer-container")
    answerContainer.innerHTML = questions[i].answers

    let questionName = document.createElement("h2")
    questionName.innerText = questions[i].question
    questionContainer.append(questionName)

    wrapper.append(questionContainer)
    questionContainer.append(answerContainer)
}

const submitBtn = document.createElement("button")
const submitContainer = document.querySelector(".submit-btn")   //Finds the div in the HTML that has the submit-btn class so the actual button goes in the right place
submitBtn.innerText = "Submit"
submitContainer.append(submitBtn)

//Function for the submit button
submitBtn.addEventListener("click", () => {
    window.scrollTo(0,0)    //Scrolls automatically to the top of the page after the button is pressed so you can see what questions you got wrong/right
    
    let correctAnswersCount = 0

    for (let i = 0; i < questions.length; i++) {        //For loop to get all the users answers
        let questionContainer = document.querySelectorAll(".question-container")[i]
        let selectedRadio = questionContainer.querySelector('input[type="radio"]:checked')
        let checkedBox = questionContainer.querySelectorAll('input[type="checkbox"]:checked')
        let newBoxes = Array.from(checkedBox).map(checkbox => checkbox.id)      //Converts the "checkedBox" into an array instead of a nodelist
        let currentCorrectAnswer = questions[i].correctAnswerId

        if(questions[i].type === "checkbox"){       //Firstly checks if it is a checkbox question or not
            if(newBoxes.length > 0){        //Then also checked if the question is answered
                if(compareArrays(newBoxes, currentCorrectAnswer)){      //If they are add 1 to the score and turn it green
                    correctAnswersCount++
                    questionContainer.style.backgroundColor = "green"
                }else{
                    questionContainer.style.backgroundColor = "red"     //Otherwise just turn it red
                }
            }else{
                questionContainer.style.backgroundColor = "gray"        //And then if they didnt check any boxes it turns gray
            }
        }else{      //Handles all other questiontypes (this only works because both the true or false and multiple choice questions are made up of radio buttons)
            if(selectedRadio){      //Checks if the user answered the question or not
                let userAnswerId = selectedRadio.id
                let isCorrect = userAnswerId === questions[i].correctAnswerId

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
    }

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
    wrapper.append(resultWindow)    //Code to append the result window

    score.innerText = `${correctAnswersCount}/${questions.length}`
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
    //Adds a retake quiz button but its not very advanced, just reloads the page and scrolls all the way up :D
    retakeBtn.addEventListener("click", () => {
        location.reload()
        window.scrollTo(0,0)
    })
}) 

function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false  //Immediately returns false if they arent even the same length
    }
    array1.sort()
    array2.sort()       //Sorts them so no weird shenanigans can happen
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false        //Returns false if the current items are not the same
      }
    }
    return true     //Returns true when both arrays passes all the checks
}

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