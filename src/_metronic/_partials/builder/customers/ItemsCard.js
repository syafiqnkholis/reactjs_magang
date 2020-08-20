import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_partials/controls";
import { ItemsFilter } from "./items-filter/ItemsFilter";
import { ItemsTable } from "./items-table/ItemsTable";
import { ItemsGrouping } from "./items-grouping/ItemsGrouping";
import { useItemsUIContext } from "./ItemsUIContext";

export function ItemsCard() {
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      ids: itemsUIContext.ids,
      newItemButtonClick: itemsUIContext.newItemButtonClick,
    };
  }, [itemsUIContext]);

  return (
    <Card>
      <CardHeader title="Items list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={itemsUIProps.newItemButtonClick}
          >
            New Item
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ItemsFilter />
          {itemsUIProps.ids.length > 0 && <ItemsGrouping />}
          <ItemsTable />
      </CardBody>
    </Card>
  );
}
