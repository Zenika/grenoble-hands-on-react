import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title on navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zenika Cities weather/i);
  expect(linkElement).toBeInTheDocument();
});
