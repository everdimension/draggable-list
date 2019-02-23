import 'normalize.css';
import { css } from 'linaria';
import { systemFontStackValue } from './system-font-stack';

/**
 * These styles will just be applied globally as a side effect
 * because they contain global selectors
 */
// eslint-disable-next-line no-unused-expressions
css`
  :global() {
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    body {
      font-family: ${systemFontStackValue};
    }
  }
`;

export const GlobalStyles: React.SFC<{}> = ({ children }: any) => children;
