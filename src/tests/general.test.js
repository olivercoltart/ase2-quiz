import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('Quiz App', () => {
  test('renders first quiz question', () => {
    render(<App />);
    expect(screen.getByText(/question 1/i)).toBeInTheDocument();
  });

  test('allows selecting an answer', () => {
    render(<App />);
    const answerBtn = screen.getByText(/a/i);
    fireEvent.click(answerBtn);
    expect(answerBtn).toHaveStyle('background-color:'); // could be green/red if styled
  });

  test('shows final grade after finishing quiz', () => {
    render(<App />);
    
    // Simulate answering 5 questions
    for (let i = 0; i < 5; i++) {
      const answerBtn = screen.getByText(/a/i); // or choose correct answer text
      fireEvent.click(answerBtn);
      const nextBtn = screen.getByText(/next/i);
      fireEvent.click(nextBtn);
    }

    expect(screen.getByText(/your score/i)).toBeInTheDocument();
  });
});
