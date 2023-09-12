import {
  sequence,
  trigger,
  animate,
  style,
  group,
  query,
  transition,
  animateChild,
  state,
  animation,
  useAnimation,
  stagger,
} from '@angular/animations';


const reusable = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})',
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*')),
  ],
  {
    params: {
      duration: '500ms',
      delay: '100ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '100px',
      z: '0',
    },
  }
);


const fadeInAnimation = animation(
  [animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '500ms',
      easing: 'ease-out'
    }
  }
);

const fadeOutAnimation = animation(
  [animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '500ms',
      easing: 'ease-in'
    }
  }
);




export const SoraxAnimations = [
  trigger('animate', [transition('void => *', [useAnimation(reusable)])]),
  
  trigger('fade', [
    state('void', style({ opacity: 0 })),
    transition('void => *', useAnimation(fadeInAnimation)),
    transition('* => void', useAnimation(fadeOutAnimation)),
  ]),
];
