import React, { useRef } from 'react';
import { type ModalProps, Modal } from 'react-native';
import Animated, {
  Easing,
  StretchInY,
  StretchOutY,
} from 'react-native-reanimated';
import type { EventDetailsProps } from './event-details';
import EventDetails from './event-details';

export type AnimatedDetailsModalProps = {} & EventDetailsProps;

const EventDetailsModal = React.forwardRef(function eventDetailsModal(
  props: EventDetailsProps & ModalProps,
  ref: React.Ref<Modal>
) {
  // some additional logic
  return (
    <Modal
      ref={ref}
      visible={props.visible}
      transparent={true}
      onRequestClose={() => props.handleModalClose()}
    >
      <EventDetails {...props} />
    </Modal>
  );
});

const AnimatedModal = Animated.createAnimatedComponent(EventDetailsModal);

export default function AnimatedDetailsModal({
  timeSinceEvent,
  handleModalClose,
}: AnimatedDetailsModalProps) {
  const ref = useRef<Modal | null>(null);

  return (
    <AnimatedModal
      entering={StretchInY.duration(300).easing(Easing.linear)}
      exiting={StretchOutY.delay(100).duration(300).easing(Easing.linear)}
      ref={ref}
      style={{ justifyContent: 'center' }}
      visible={true}
      timeSinceEvent={timeSinceEvent}
      handleModalClose={handleModalClose}
    />
  );
}
