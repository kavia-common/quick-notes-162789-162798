import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quick Notes title', () => {
  render(<App />);
  const heading = screen.getAllByText(/Quick Notes/i)[0];
  expect(heading).toBeInTheDocument();
});
