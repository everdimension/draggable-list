import * as React from 'react';
import { css } from 'linaria';
import { GlobalStyles } from '../GlobalStyles';

const styles = css`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 100px;
`;

export const Layout: React.SFC<{}> = props => (
  <GlobalStyles>
    <div className={styles} {...props} />
  </GlobalStyles>
);
