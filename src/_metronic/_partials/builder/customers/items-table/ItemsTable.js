// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/items/itemsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../_helpers";
import * as uiHelpers from "../ItemsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../_partials/controls";
import { useItemsUIContext } from "../ItemsUIContext";

export function ItemsTable() {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      ids: itemsUIContext.ids,
      setIds: itemsUIContext.setIds,
      queryParams: itemsUIContext.queryParams,
      setQueryParams: itemsUIContext.setQueryParams,
      openEditItemDialog: itemsUIContext.openEditItemDialog,
      openDeleteItemDialog: itemsUIContext.openDeleteItemDialog,
    };
  }, [itemsUIContext]);

  // Getting curret state of items list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.items }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Items Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    itemsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchItems(itemsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "Firstname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Lastname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditItemDialog: itemsUIProps.openEditItemDialog,
        openDeleteItemDialog: itemsUIProps.openDeleteItemDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: itemsUIProps.queryParams.pageSize,
    page: itemsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  itemsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: itemsUIProps.ids,
                  setIds: itemsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
