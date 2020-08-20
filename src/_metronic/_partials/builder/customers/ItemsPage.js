import React from "react";
import { Route } from "react-router-dom";
import { ItemsLoadingDialog } from "./items-loading-dialog/ItemsLoadingDialog";
import { ItemEditDialog } from "./item-edit-dialog/ItemEditDialog";
import { ItemDeleteDialog } from "./item-delete-dialog/ItemDeleteDialog";
import { ItemsDeleteDialog } from "./items-delete-dialog/ItemsDeleteDialog";
import { ItemsFetchDialog } from "./items-fetch-dialog/ItemsFetchDialog";
import { ItemsUpdateStateDialog } from "./items-update-status-dialog/ItemsUpdateStateDialog";
import { ItemsUIProvider } from "./ItemsUIContext";
import { ItemsCard } from "./ItemsCard";

export function ItemsPage({ history }) {
  const itemsUIEvents = {
    newItemButtonClick: () => {
      history.push("/e-commerce/items/new");
    },
    openEditItemDialog: (id) => {
      history.push(`/e-commerce/items/${id}/edit`);
    },
    openDeleteItemDialog: (id) => {
      history.push(`/e-commerce/items/${id}/delete`);
    },
    openDeleteItemsDialog: () => {
      history.push(`/e-commerce/items/deleteItems`);
    },
    openFetchItemsDialog: () => {
      history.push(`/e-commerce/items/fetch`);
    },
    openUpdateItemsStatusDialog: () => {
      history.push("/e-commerce/items/updateStatus");
    }
  }

  return (
    <ItemsUIProvider itemsUIEvents={itemsUIEvents}>
      <ItemsLoadingDialog />
      <Route path="/e-commerce/items/new">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/items/:id/edit">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/items/deleteItems">
        {({ history, match }) => (
          <ItemsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/items/:id/delete">
        {({ history, match }) => (
          <ItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/items/fetch">
        {({ history, match }) => (
          <ItemsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/items/updateStatus">
        {({ history, match }) => (
          <ItemsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/items");
            }}
          />
        )}
      </Route>
      <ItemsCard />
    </ItemsUIProvider>
  );
}
