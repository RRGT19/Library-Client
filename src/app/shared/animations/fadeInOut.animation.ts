import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export const fadeInOutAnimation: AnimationTriggerMetadata =
  trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1000)),
  ]);
