window.onload = function () {
    (function () {
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
        }

        function showResults() {


            const answerContainers = quizContainer.querySelectorAll('.answers');


            let numCorrect = 0;


            myQuestions.forEach((currentQuestion, questionNumber) => {


                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;


                if (userAnswer === currentQuestion.correctAnswer) {

                    numCorrect++;


                    answerContainers[questionNumber].style.color = 'lightgreen';
                }

                else {

                    answerContainers[questionNumber].style.color = 'red';
                }
            });


            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove('active-slide');
            slides[n].classList.add('active-slide');
            currentSlide = n;
            if (currentSlide === 0) {
                previousButton.style.display = 'none';
            }
            else {
                previousButton.style.display = 'inline-block';
            }
            if (currentSlide === slides.length - 1) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            }
            else {
                nextButton.style.display = 'inline-block';
                submitButton.style.display = 'none';
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }

        const quizContainer = document.getElementById('quiz');
        const resultsContainer = document.getElementById('results');
        const submitButton = document.getElementById('submit');
        const myQuestions = [
            {
                question: "What is the tallest mountain in the world?",
                answers: {
                    a: "Mount Everest",
                    b: "Mount Fuji",
                    c: "K2",
                    d: "Mount Kilimanjaro"
                },
                correctAnswer: "a"
            },
            {
                question: "What is the capital of New Zealand?",
                answers: {
                    a: "Auckland",
                    b: "Christchurch",
                    c: "Wellington",
                    d: "Dunedin"
                },
                correctAnswer: "c"
            },
            {
                question: "What is the native flightless bird to New Zealand?",
                answers: {
                    a: "Ostrich",
                    b: "Emu",
                    c: "Emperor Penguin",
                    d: "Kiwi",
                },
                correctAnswer: "d"
            },
            {
                question: "What country has the longest coastline in the world?",
                answers: {
                    a: "Indonesia",
                    b: "Brazil",
                    c: "Canada",
                    d: "Australia",
                },
                correctAnswer: "c"
            },
            {
                question: "What is the Capital of Peru?",
                answers: {
                    a: "Bogota",
                    b: "Lima",
                    c: "London",
                    d: "Buenos Aires",
                },
                correctAnswer: "b"
            },
            {
                question: "How long is the border between USA and Canada?",
                answers: {
                    a: "5,891 km",
                    b: "6,891 km",
                    c: "7,891 km",
                    d: "8,891 km",
                },
                correctAnswer: "d"
            },
            {
                question: "Which river flows through London",
                answers: {
                    a: "River Severn",
                    b: "River Trent",
                    c: "River Thames",
                    d: "Danube River",
                },
                correctAnswer: "c"
            },
            {
                question: "On which continent is the Sahara Desert located?",
                answers: {
                    a: "Africa",
                    b: "South America",
                    c: "Asia",
                    d: "Europe",
                },
                correctAnswer: "a"
            },
            {
                question: "What is the smallest country in the world?",
                answers: {
                    a: "Andorra",
                    b: "Luxemburg",
                    c: "Vatican City",
                    d: "Belgium",
                },
                correctAnswer: "c"
            },
            {
                question: "Which European city is not located on the Danube River",
                answers: {
                    a: "Prague",
                    b: "Budapest",
                    c: "Vienna",
                    d: "Belgrade",
                },
                correctAnswer: "a"
            },
        ];


        buildQuiz();

        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;


        showSlide(currentSlide);

        submitButton.addEventListener('click', showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);

    })();

}

var count = 15;
var interval = setInterval(function () {
    document.getElementById('safeTimer').innerHTML = count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('safeTimer').innerHTML = 'Done';
    }
}, 1000);


