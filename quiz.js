// data
const myQuestions = [
    {
        question: "What is the tallest mountain in the world?",
        answers: {
            A: "Mount Everest",
            B: "Mount Fuji",
            C: "K2",
            D: "Mount Kilimanjaro"
        },
        correctAnswer: "A"
    },
    {
        question: "What is the capital of New Zealand?",
        answers: {
            A: "Auckland",
            B: "Christchurch",
            C: "Wellington",
            D: "Dunedin"
        },
        correctAnswer: "C"
    },
    {
        question: "What is the native flightless bird to New Zealand?",
        answers: {
            A: "Ostrich",
            B: "Emu",
            C: "Emperor Penguin",
            D: "Kiwi",
        },
        correctAnswer: "D"
    },
    {
        question: "What country has the longest coastline in the world?",
        answers: {
            A: "Indonesia",
            B: "Brazil",
            C: "Canada",
            D: "Australia",
        },
        correctAnswer: "C"
    },
    {
        question: "What is the Capital of Peru?",
        answers: {
            A: "Bogota",
            B: "Lima",
            C: "London",
            D: "Buenos Aires",
        },
        correctAnswer: "B"
    },
    {
        question: "How long is the border between USA and Canada?",
        answers: {
            A: "5,891 km",
            B: "6,891 km",
            C: "7,891 km",
            D: "8,891 km",
        },
        correctAnswer: "D"
    },
    {
        question: "Which river flows through London",
        answers: {
            A: "River Severn",
            B: "River Trent",
            C: "River Thames",
            D: "Danube River",
        },
        correctAnswer: "C"
    },
    {
        question: "On which continent is the Sahara Desert located?",
        answers: {
            A: "Africa",
            B: "South America",
            C: "Asia",
            D: "Europe",
        },
        correctAnswer: "A"
    },
    {
        question: "What is the smallest country in the world?",
        answers: {
            A: "Andorra",
            B: "Luxemburg",
            C: "Vatican City",
            D: "Belgium",
        },
        correctAnswer: "C"
    },
    {
        question: "Which European city is not located on the Danube River",
        answers: {
            A: "Prague",
            B: "Budapest",
            C: "Vienna",
            D: "Belgrade",
        },
        correctAnswer: "A"
    },
];

window.onload = function () {
    // globals
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById("next");
    let answerContainers;
    let slides;


    let currentSlide = 0;
    let questionTimerLimit = 15;
    let count = questionTimerLimit;


    let countdownTimer = setInterval(function () {
        count--;
        document.getElementById('safeTimer').innerHTML = count;
        if (count === 0) {
            showNextSlide();
            count = questionTimerLimit;
            document.getElementById('safeTimer').innerHTML = 'Time is up!';
        }
    }, 1000);



    // event listeners
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);

    // form even listener

    // methods
    function buildQuiz() {

        const output = [];

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                const answers = [];


                for (letter in currentQuestion.answers) {


                    answers.push(
                        `<label>
                    <input type="radio" class="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                  </label>`
                    );
                }


                output.push(
                    `<div class="slide">
                  <div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>
                </div>`
                );
            }
        );

        quizContainer.innerHTML = output.join('');
        slides = document.querySelectorAll(".slide");
        answerContainers = document.querySelectorAll(".answers");
    }

    function finalResults() {
        quizContainer.querySelectorAll(".slide").forEach((slide) => slide.style.display = "none");


        const correctAnswers = [];

        myQuestions.forEach((currentQuestion, questionIndex) => {
            
            const answerContainer = answerContainers[questionIndex];
            const selector = `input[name=question${questionIndex}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;



            if (userAnswer === currentQuestion.correctAnswer) {

                correctAnswers.push({ id: questionIndex, userAnswer, rightAnswer: currentQuestion.correctAnswer, color: `lightgreen` })


            }

            else {

                correctAnswers.push({ id: questionIndex, userAnswer, rightAnswer: currentQuestion.correctAnswer, color: `red` })
            }

        });

        const quizHTML = correctAnswers.map(answer => {
            return `
            <li>
            <p>Question: ${myQuestions.question}: Correct Answer: ${answer.rightAnswer}</p>
            <p>Your Answer: <span style="color: ${answer.color}"> ${answer.userAnswer} </span> </p>
            </li>
            `
        });


        quizContainer.innerHTML = `
        <ol class="correct-answers">
            ${quizHTML.join('')}
            </ol> 
            `;
    }

    function showResults() {

        clearInterval(countdownTimer);
        document.getElementById('safeTimer').style.display = 'none';



        let numCorrect = 0;


        myQuestions.forEach((currentQuestion, questionIndex) => {


            const answerContainer = answerContainers[questionIndex];
            const selector = `input[name=question${questionIndex}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;



            if (userAnswer === currentQuestion.correctAnswer) {

                numCorrect++;

                answerContainers[questionIndex].style.color = 'lightgreen';
            }

            else {

                answerContainers[questionIndex].style.color = 'red';

            }
        });


        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

        finalResults();
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }

        // if current slide is greater than the length of slides
        // then we want to stop the timer
    }

    function showNextSlide() {
        const newCurrentSlide = currentSlide + 1
        if (newCurrentSlide > slides.length - 1) {
            showResults();
        }
        else {
            showSlide(newCurrentSlide);
            count = questionTimerLimit;
        }

    }


    buildQuiz();



    showSlide(currentSlide);
}



// 2. Want to show the answer to each question after the question is answered as well as the final score at the end (which it already has)

// I would then have some functionality where
// 1. to choose an answer/ goto next question, you have to choose an option/ answer.
// 2. You then can submit the answer,
// 3. When you have submitted it shows/ hightlights the correct answer, if you are correct you get 1 point, wrong or took too long you get 0 points
// 4. then after sometime it will take you to the next question, a reset the timer
// 5. There's still a 15sec timer, and if you don't submit an answer after 15 seconds it will do steps 3 and 4


// disable next question button until question is answered - event listenter
// answer div (<div class="answers">) could become a form element instead (<form class="answers">)
// grab all forms and add an eventlistener an onchange event listener to the form
// loop through all the inputs of type radio inside a form (querySelectorAll(input[name=question${questionIndex}]:checked))
// and check to see if one is checked
// if one is checked un-disabled the next button