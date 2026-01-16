import LoadingScreen from '@/components/loading-screen';
import { renderAsync } from '@testing-library/react-native';

describe('<LoadingScreen />', () => {
  it('Renders all the elements', async () => {
    const { getByLabelText, getByText } = await renderAsync(
      <LoadingScreen />,
      {}
    );

    getByLabelText('loading');
    getByText('Loading...');
  });
});
