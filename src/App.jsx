import { useState, useEffect } from 'react';
import './App.css'; // optional: for centering/styling

const quizQuestions = [
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
];

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = quizQuestions.length;
  const question = quizQuestions[currentQuestion];

  return (

    <div className="app-container">
      {user && (
        <div className="user-name">
          👋 Hi, {user.name}
        </div>
      )}

      <div className="quiz-box">
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
                />{" "}
                {key.toUpperCase()}. {value}
              </label>
            ))}

            <div className="mt-4">
              {currentQuestion < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] == null}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={answers[currentQuestion] == null}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                )}
            </div>
          </>
        ) : (
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Score:</h2>
              <p>
                You got {score} out of {totalQuestions} correct (
              {Math.round((score / totalQuestions) * 100)}%)
            </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
