import TsEventDetails from '@/components/tsevent-details';
import {
  act,
  fireEventAsync,
  renderAsync,
  screen,
} from '@testing-library/react-native';

describe('<TsEventDetails />', () => {
  const handleDetailsChange = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('Renders all the default elements', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    screen.getByPlaceholderText('Romanes eunt domus');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');
  });

  it('Renders all the elements when provided text', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        detailsText="Romani ite domum"
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    screen.getByDisplayValue('Romani ite domum');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');
  });

  it('Updates properly when the text changes', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () =>
      fireEventAsync.changeText(
        screen.getByLabelText('detail-text'),
        'Romani ite domum'
      )
    );

    screen.getByDisplayValue('Romani ite domum');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('delete'); // changed from 'close'
  });

  it('Updates properly when the text changes back to the original', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () =>
      fireEventAsync.changeText(
        screen.getByLabelText('detail-text'),
        'Romani ite domum'
      )
    );

    await act(async () =>
      fireEventAsync.changeText(screen.getByLabelText('detail-text'), '')
    );

    screen.getByDisplayValue('');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');
  });

  it('Calls the updater function with correct arguments when text has changed and done is pressed', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () =>
      fireEventAsync.changeText(
        screen.getByLabelText('detail-text'),
        'Romani ite domum'
      )
    );

    await act(async () => fireEventAsync.press(screen.getByLabelText('done')));

    screen.getByDisplayValue('Romani ite domum');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(
      1,
      'details',
      'Romani ite domum'
    );
  });

  it('Calls the updater function with only the id when text has not changed and done is pressed', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () => fireEventAsync.press(screen.getByLabelText('done')));

    screen.getByDisplayValue('');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(1, undefined, undefined);
  });

  it('Calls the updater function with only the id when text has not changed and close is pressed', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () => fireEventAsync.press(screen.getByLabelText('close')));

    screen.getByDisplayValue('');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');

    expect(handleDetailsChange).toHaveBeenCalledTimes(1);
    expect(handleDetailsChange).toHaveBeenCalledWith(1, undefined, undefined);
  });

  it('Calls the updater function with just the id when text has changed and cancel is pressed', async () => {
    await renderAsync(
      <TsEventDetails
        tsEventId={1}
        handleDetailsChange={handleDetailsChange}
      />,
      {}
    );

    await act(async () =>
      fireEventAsync.changeText(
        screen.getByLabelText('detail-text'),
        'Romani ite domum'
      )
    );

    await act(async () =>
      fireEventAsync.press(screen.getByLabelText('delete'))
    );

    screen.getByDisplayValue('');
    screen.getByLabelText('detail-text');
    screen.getByLabelText('done');
    screen.getByLabelText('close');
  });
});
