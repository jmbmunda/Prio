import { Status } from "@prisma/client";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

import { getStatuses } from "@/actions/status";

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
    (value: string, key: keyof Status) => {
      if (!key) return;
      const status = statuses?.find((status) => status?.[key] === value);
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
