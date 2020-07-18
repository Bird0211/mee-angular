import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';

export const iconAnimation = animation([
    style({
      color: '{{ color }}',
      fontSize: '{{fontSize}}'
    }),
    animate('{{ time }}')
]);
