import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm component', () => {
  it('submits the form with correct data', () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Solution'), {
      target: { value: '2x + 3' },
    });
    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith('2x + 3');
  });
});

