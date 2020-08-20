import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../_partials/controls";

export function ItemsLoadingDialog() {
  // Items Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.items.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
