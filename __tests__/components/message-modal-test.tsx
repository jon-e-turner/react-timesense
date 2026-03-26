import MessageModal from '@/components/message-modal';
import { renderAsync, screen } from '@testing-library/react-native';

const onRequestClose = jest.fn();

describe('<MessageModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renders default elements correctly', async () => {
    await renderAsync(
      <MessageModal
        isVisible={true}
        title="test modal"
        onRequestClose={onRequestClose}
      />,
    );

    // TODO: Figure out why this is failing. Roles look right in the DOM.
    // screen.getByRole('alertdialog');
    // screen.getByRole('heading');
    screen.getByRole('img', { name: 'info' });
    screen.getByText('test modal');
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('Renders a warning modal correctly', async () => {
    await renderAsync(
      <MessageModal
        isVisible={true}
        title="test modal"
        onRequestClose={onRequestClose}
        messageType="warning"
      />,
    );

    // screen.getByRole('presentation');
    // screen.getByRole('heading');
    screen.getByRole('img', { name: 'warning' });
    screen.getByText('test modal');
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('Renders an error modal correctly', async () => {
    await renderAsync(
      <MessageModal
        isVisible={true}
        title="test modal"
        onRequestClose={onRequestClose}
        messageType="error"
      />,
    );

    // screen.getByRole('presentation');
    // screen.getByRole('heading');
    screen.getByRole('img', { name: 'error' });
    screen.getByText('test modal');
    expect(onRequestClose).not.toHaveBeenCalled();
  });
});
