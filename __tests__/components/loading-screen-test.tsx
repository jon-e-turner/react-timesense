import LoadingScreen from '@/components/loading-screen';
import { render, waitFor } from '@testing-library/react-native';

describe('<LoadingScreen />', () => {
  it('Renders all the elements', async () => {
    const { getByLabelText, getByText } = render(<LoadingScreen />, {});

    await waitFor(() => {
      getByLabelText('loading');
      getByText('Loading...');
    });
  });
});
