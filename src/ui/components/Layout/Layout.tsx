import * as React from 'react';
import 'normalize.css';
import { css } from 'linaria';
import { systemFontStackValue } from './system-font-stack';

const styles = css`
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

  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 100px;
`;

const Layout: React.SFC<{}> = props => <div className={styles} {...props} />;

export { Layout };
