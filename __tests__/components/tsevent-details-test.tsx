import TsEventDetails from '@/components/tsevent-details';
import {
  act,
  fireEventAsync,
  render,
  waitFor,
} from '@testing-library/react-native';

describe('<TsEventDetails />', () => {
  const handleDetailsChange = (
    id: number,
    prop?: string,
    newValue?: string
  ) => {};
  it('Renders all the default elements', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await waitFor(() => {
      getByPlaceholderText('Romanes eunt domus');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });
  });

  it('Renders all the elements when provided text', async () => {
    const { getByDisplayValue, getByLabelText } = render(
      <TsEventDetails
        tsEventId={1}
        detailsText="Romani ite domum"
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await waitFor(() => {
      getByDisplayValue('Romani ite domum');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });
  });

  it('Updates properly when the text changes', async () => {
    const { getByDisplayValue, getByLabelText } = render(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () =>
      fireEventAsync.changeText(
        getByLabelText('detail-text'),
        'Romani ite domum'
      )
    );

    await waitFor(() => {
      getByDisplayValue('Romani ite domum');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('delete'); // changed from 'close'
    });
  });
});
