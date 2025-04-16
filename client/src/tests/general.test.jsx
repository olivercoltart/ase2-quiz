import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom';

describe('Quiz App', () => {
  test('renders first quiz question', () => {
    render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    );
    expect(screen.getByText(/question 1/i)).toBeInTheDocument();
  });

  test('allows selecting an answer', () => {
    render(
      <BrowserRouter>
      <App />
      </BrowserRouter>
      );
    const answerBtn = screen.getByLabelText(/^A\./i);
    fireEvent.click(answerBtn);
    expect(answerBtn).toBeChecked(); // could be green/red if styled
  });

  test('shows final grade after finishing quiz', async () => {
    render(
      <BrowserRouter>
      <App />
      </BrowserRouter>
      );
    
    // Simulate answering 5 questions
    for (let i = 0; i < 5; i++) {
      const answerBtn = screen.getByLabelText(/^A\./i); // or choose correct answer text
      fireEvent.click(answerBtn);

      if (i <4) {
      const nextBtn = await screen.getByText(/next/i);
      fireEvent.click(nextBtn);
      } else {
      const submitBtn = await screen.getByText(/submit/i);
      fireEvent.click(submitBtn);
      }
    }

    expect(await screen.getByText(/your score/i)).toBeInTheDocument();
  });
});
