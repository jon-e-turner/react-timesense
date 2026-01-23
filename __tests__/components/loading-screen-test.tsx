import LoadingScreen from '@/components/loading-screen';
import { renderAsync, screen } from '@testing-library/react-native';

describe('<LoadingScreen />', () => {
  it('Renders all the elements', async () => {
    await renderAsync(<LoadingScreen />, {});

    screen.getByLabelText('loading');
    screen.getByText('Loading...');
  });
});
