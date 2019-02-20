import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StatementList } from '../ui/components/StatementList';
import { Layout } from '../ui/components/Layout';

export function render() {
  ReactDOM.render(
    <Layout>
      <StatementList />
    </Layout>,
    document.getElementById('root'),
  );
}
