import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Source } from '../dataSources/statements/Source';
import { items } from '../dataSources/statements/items.sample';
import { StatementsSubscription } from '../dataSources/statements/StatementsSubscription';
import { StatementList } from '../ui/components/StatementList';
import { Layout } from '../ui/components/Layout';

const statementsSource = new Source();
statementsSource.setItems(items);

export function render() {
  ReactDOM.render(
    <Layout>
      <StatementsSubscription source={statementsSource}>
        {({ data, createNewItem, reorder }) => (
          <StatementList
            items={data.items}
            order={data.order}
            onCreateNewItem={createNewItem}
            onReorder={reorder}
          />
        )}
      </StatementsSubscription>
    </Layout>,
    document.getElementById('root'),
  );
}
