import { useLocation, useNavigate } from 'react-router-dom';
import './review.css'; // добавили импорт стилей

function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, answers } = location.state || {};

  if (!quizQuestions || !answers) {
    return <div>No review data available.</div>;
  }

  return (
    <div className="app-container column-layout">
      <h2>Review Incorrect Answers</h2>

      <div className="horizontal-scroll">
        {quizQuestions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === q.correctAnswer;

          if (isCorrect) return null;

          return (
            <div key={index} className="review-card">
              <p><strong>{index + 1}. {q.question}</strong></p>
              <p>Your answer: <strong>{userAnswer?.toUpperCase()} {q.options[userAnswer]}</strong></p>
              <p>Correct answer: <strong>{q.correctAnswer.toUpperCase()}. {q.options[q.correctAnswer]}</strong></p>
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate("/")}>Try Again</button>
    </div>
  );
}

export default Review;
