import { getStatuses } from "@/actions/status";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

const useTaskStatus = () => {
  const { data: statuses, isLoading, isValidating } = useSWR("task-status", getStatuses);

  const statusOptions = useMemo(
    () =>
      statuses?.map((status) => ({
        ...status,
        label: status.name,
        value: status.name,
        className: "py-1",
      })) ?? [],
    [statuses]
  );

  const getAttributes = useCallback(
    (name: string) => {
      if (!name) return;
      const status = statuses?.find((status) => status?.name === name);
      return status;
    },
    [statuses]
  );

  return {
    statuses,
    isLoading,
    isValidating,
    statusOptions,
    getAttributes,
  };
};

export default useTaskStatus;
