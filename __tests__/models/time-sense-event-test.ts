import { TimeSenseEvent } from '@/models/time-sense-event';
import { DEFAULT_EVENT_GLYPH } from '@/types/icons';
import { UTCDate } from '@date-fns/utc';

describe('TimeSenseEvent class', () => {
  it('when given just a name, returns the default object', () => {
    const tsEvent = new TimeSenseEvent({ name: 'test event' });

    expect(tsEvent.details).toBeUndefined();
    expect(tsEvent.icon).toBe(DEFAULT_EVENT_GLYPH);
    expect(tsEvent.triggerHistory).toBeDefined();
    expect(tsEvent.triggerHistory).toHaveLength(0);
    expect(tsEvent.name).toBe('test event');
    expect(tsEvent.id).toBe(0);
  });

  // Simulates loading an event from the database.
  it('when given optional props, respects them', () => {
    const tsEvent = new TimeSenseEvent({
      id: 4,
      name: 'test event',
      icon: 'gamepad',
      details: 'A long time ago...',
      triggerHistory: [
        {
          timestamp: new UTCDate('2026-01-10T13:00:00Z'),
          tags: ['user'],
        },
      ],
    });

    expect(tsEvent.details).toBe('A long time ago...');
    expect(tsEvent.icon).toBe('gamepad');
    expect(tsEvent.triggerHistory).toBeDefined();
    expect(tsEvent.triggerHistory).toHaveLength(1);
    expect(tsEvent.triggerHistory[0].timestamp).toStrictEqual(
      new UTCDate('2026-01-10T13:00:00Z'),
    );
    expect(tsEvent.triggerHistory[0].tags).toContain('user');
    expect(tsEvent.name).toBe('test event');
    expect(tsEvent.id).toBe(4);
  });
});
