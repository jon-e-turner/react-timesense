import { TimeSenseEvent } from '@/models/time-sense-event';
import { DEFAULT_EVENT_GLYPH } from '@/types/icons';

describe('TimeSenseEvent class', () => {
  test('when given just a name, returns the default object', () => {
    const tsEvent = new TimeSenseEvent({ name: 'test-event' });

    expect(tsEvent.details).not.toBeDefined();
    expect(tsEvent.icon).toBe(DEFAULT_EVENT_GLYPH);
    expect(tsEvent.triggerHistory).toBeDefined();
    expect(tsEvent.triggerHistory.length).toBe(0);
    expect(tsEvent.name).toBe('test-event');
    expect(tsEvent.id).toBe(0);
  });
});
