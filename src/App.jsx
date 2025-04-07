import { useState } from 'react';

function App() {
  const quizQuestions = [
    {
      question: "Which animal is known as the king of the jungle?",
      options: {
        a: "Elephant",
        b: "Lion",
        c: "Tiger",
        d: "Giraffe",
      },
    },
    {
      question: "What is the fastest land animal?",
      options: {
        a: "Cheetah",
        b: "Horse",
        c: "Kangaroo",
        d: "Leopard",
      },
    },
    {
      question: "Which animal can live both in water and on land?",
      options: {
        a: "Dolphin",
        b: "Frog",
        c: "Penguin",
        d: "Eagle",
      },
    },
    {
      question: "What is a baby goat called?",
      options: {
        a: "Cub",
        b: "Pup",
        c: "Kid",
        d: "Calf",
      },
    },
    {
      question: "Which bird is known for mimicking human speech?",
      options: {
        a: "Eagle",
        b: "Parrot",
        c: "Owl",
        d: "Crow",
      },
    },
  ];

  function App() {
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
  }

  
  return (
    <div className="app-container">
      <div className="quiz-box">
        <h1>🐾 Animal Quiz</h1>
        {quizQuestions.map((q, index) => (
          <div key={index} className="mb-6">
            <p>
              <strong>{index + 1}. {q.question}</strong>
            </p>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {Object.entries(q.options).map(([key, value]) => (
                <li key={key}>
                  {key.toUpperCase()}. {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


