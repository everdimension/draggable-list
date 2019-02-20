import * as React from 'react';

export const DragHandle: React.SFC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="1em" viewBox="0 0 7 11" {...props}>
    <g fill="currentColor">
      <rect x="0" y="0" width="3" height="3" />
      <rect x="4" y="0" width="3" height="3" />
      <rect x="0" y="4" width="3" height="3" />
      <rect x="4" y="4" width="3" height="3" />
      <rect x="0" y="8" width="3" height="3" />
      <rect x="4" y="8" width="3" height="3" />
    </g>
  </svg>
);
