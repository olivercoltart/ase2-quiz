import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // optional: for centering/styling

const quizzes = {
  animals: [
    {
      question: "Which animal is known as the king of the jungle?",
      options: {
        a: "Elephant",
        b: "Lion",
        c: "Tiger",
        d: "Giraffe",
      },
      correctAnswer: "b",
    },
    {
      question: "What is the fastest land animal?",
      options: {
        a: "Cheetah",
        b: "Horse",
        c: "Kangaroo",
        d: "Leopard",
      },
      correctAnswer: "a",
    },
    {
      question: "Which animal can live both in water and on land?",
      options: {
        a: "Dolphin",
        b: "Frog",
        c: "Penguin",
        d: "Eagle",
      },
      correctAnswer: "b",
    },
    {
      question: "What is a baby goat called?",
      options: {
        a: "Cub",
        b: "Pup",
        c: "Kid",
        d: "Calf",
      },
      correctAnswer: "c",
    },
    {
      question: "Which bird is known for mimicking human speech?",
      options: {
        a: "Eagle",
        b: "Parrot",
        c: "Owl",
        d: "Crow",
      },
      correctAnswer: "b",
    },
  ],
  geography: [
    {
      question: "Which country is the Eiffel Tower located in?",
      options: {
        a: "Germany",
        b: "France",
        c: "Italy",
        d: "Spain",
      },
      correctAnswer: "b",
    },
    {
      question: "What is the capital of Japan?",
      options: {
        a: "Beijing",
        b: "Seoul",
        c: "Tokyo",
        d: "Bangkok",
      },
      correctAnswer: "c",
    },
    {
      question: "Which continent is known as the 'Dark Continent'?",
      options: {
        a: "Asia",
        b: "Africa",
        c: "South America",
        d: "Australia",
      },
      correctAnswer: "b",
    },
    {
      question: "Which river is the longest in the world?",
      options: {
        a: "Amazon River",
        b: "Yangtze River",
        c: "Nile River",
        d: "Mississippi River",
      },
      correctAnswer: "c",
    },
    {
      question: "What is the capital of Australia?",
      options: {
        a: "Sydney",
        b: "Melbourne",
        c: "Canberra",
        d: "Brisbane",
      },
      correctAnswer: "c",
    },
  ],
  food: [
    {
      question: "What is the main ingredient in guacamole?",
      options: {
        a: "Tomato",
        b: "Avocado",
        c: "Onion",
        d: "Lemon",
      },
      correctAnswer: "b",
    },
    {
      question: "Which fruit is known as the 'king of fruits'?",
      options: {
        a: "Mango",
        b: "Durian",
        c: "Papaya",
        d: "Banana",
      },
      correctAnswer: "b",
    },
    {
      question: "What is sushi traditionally made with?",
      options: {
        a: "Rice",
        b: "Chicken",
        c: "Beef",
        d: "Pasta",
      },
      correctAnswer: "a",
    },
    {
      question: "Which country is famous for its dish 'paella'?",
      options: {
        a: "France",
        b: "Italy",
        c: "Spain",
        d: "Greece",
      },
      correctAnswer: "c",
    },
    {
      question: "Which vegetable is known for its use in making pickles?",
      options: {
        a: "Carrot",
        b: "Cucumber",
        c: "Potato",
        d: "Onion",
      },
      correctAnswer: "b",
    },
  ],
};

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [currentQuiz, setCurrentQuiz] = useState('animals'); // Default to 'animals' quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); 

  const handleQuizChange = (event) => {
    setCurrentQuiz(event.target.value);
    setCurrentQuestion(0); // Reset to first question
    setAnswers({});
    setSubmitted(false);
  };

  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < quizzes[currentQuiz].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    quizzes[currentQuiz].forEach((q, index) => {
      if (answers[index] == null) {
        setAnswers((prev) => ({
          ...prev,
          [index]: 'incorrect', 
        }));
      }
    });
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizzes[currentQuiz].forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = quizzes[currentQuiz].length;
  const question = quizzes[currentQuiz][currentQuestion];

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: 'incorrect',
      }));
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: '', // Mark as incorrect if not answered
          }));
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, timeLeft, submitted]);

  return (
    <div className="app-container">
      {user && (
        <div className="user-name">
          👋 Hi, {user.name}
        </div>
      )}

      <div className="quiz-box">
        <div className="quiz-selection">
          <label htmlFor="quiz-select">Choose a quiz:</label>
          <select id="quiz-select" value={currentQuiz} onChange={handleQuizChange}>
            <option value="animals">Animals</option>
            <option value="geography">Geography</option>
            <option value="food">Food</option>
          </select>
        </div>

        {!submitted ? (
          <>
            <p className="font-medium mb-2">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
            <h2 className="mb-4">{question.question}</h2>
            {Object.entries(question.options).map(([key, value]) => (
              <label key={key} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={key}
                  checked={answers[currentQuestion] === key}
                  onChange={() => handleOptionChange(key)}
                  disabled={timeLeft === 0}
                />{" "}
                {key.toUpperCase()}. {value}
              </label>
            ))}

            <div className="mt-4">
              {currentQuestion < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] == null || timeLeft === 0}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answers[currentQuestion] == null || timeLeft === 0}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>

            <div className="timer">
              <p>Time left: {timeLeft}s</p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Score:</h2>
            <p>
              You got {score} out of {totalQuestions} correct (
              {Math.round((score / totalQuestions) * 100)}%)
            </p>
            <button
              onClick={() =>
                navigate("/review", {
                  state: {
                    quizQuestions: quizzes[currentQuiz],
                    answers,
                  },
                })
              }
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
              Review Incorrect Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
