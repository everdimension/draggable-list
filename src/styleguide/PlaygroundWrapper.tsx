import * as React from 'react';
import { GlobalStyles } from '../ui/components/GlobalStyles';

export const PlaygroundWrapper: React.SFC<{}> = ({ children }) => (
  <GlobalStyles>{children}</GlobalStyles>
);

/** docz relies on a default export */
export default PlaygroundWrapper;
