import TsEventDetails from '@/components/tsevent-details';
import {
  act,
  fireEventAsync,
  render,
  waitFor,
} from '@testing-library/react-native';

describe('<TsEventDetails />', () => {
  const handleDetailsChange = jest.fn();

  beforeEach(() => jest.clearAllMocks());

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

  it('Updates properly when the text changes back to the original', async () => {
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

    await act(async () =>
      fireEventAsync.changeText(getByLabelText('detail-text'), '')
    );

    await waitFor(() => {
      getByDisplayValue('');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });
  });

  it('Calls the updater function with correct arguments when text has changed and done is pressed', async () => {
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

    await act(async () => fireEventAsync.press(getByLabelText('done')));

    await waitFor(() => {
      getByDisplayValue('Romani ite domum');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(
      1,
      'details',
      'Romani ite domum'
    );
  });

  it('Calls the updater function with only the id when text has not changed and done is pressed', async () => {
    const { getByDisplayValue, getByLabelText } = render(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () => fireEventAsync.press(getByLabelText('done')));

    await waitFor(() => {
      getByDisplayValue('');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(1, undefined, undefined);
  });

  it('Calls the updater function with only the id when text has not changed and close is pressed', async () => {
    const { getByDisplayValue, getByLabelText } = render(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () => fireEventAsync.press(getByLabelText('close')));

    await waitFor(() => {
      getByDisplayValue('');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(1, undefined, undefined);
  });

  it('Calls the updater function with just the id when text has changed and cancel is pressed', async () => {
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

    await act(async () => fireEventAsync.press(getByLabelText('delete')));

    await waitFor(() => {
      getByDisplayValue('');
      getByLabelText('detail-text');
      getByLabelText('done');
      getByLabelText('close');
    });
  });
});
