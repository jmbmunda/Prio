"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LiaSortSolid } from "react-icons/lia";

import Divider from "@/components/Divider";
import Dropdown from "@/components/Dropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getDefaultSort } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { PRIORITY_OPTIONS, SORT_OPTIONS } from "./utils/constants";
import { filterSchema } from "./utils/schema";
import { FilterType } from "./utils/types";
import useTaskStatus from "../../hooks/useTaskStatus";

type Props = {
  onChangeFilter?: (filter: FilterType) => void;
  onChangeSort?: (value: string) => void;
};

const SortAndFilter = ({ onChangeFilter, onChangeSort }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { statusOptions } = useTaskStatus();
  // FILTER
  const [isApplyPending, startApplyTransition] = useTransition();
  const [isResetPending, startResetTransition] = useTransition();
  const [isClearPending, startClearTransition] = useTransition();

  // SORT
  const [selectedSort, setSelectedSort] = useState(() => getDefaultSort(searchParams));
  const [isApplySortPending, startApplySortTransition] = useTransition();
  const [isResetSortPending, startResetSortTransition] = useTransition();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty, isSubmitted },
  } = useForm<FilterType>({
    mode: "all",
    defaultValues: {
      status: "",
      priority: "",
    },
    resolver: zodResolver(filterSchema),
  });

  const hasAppliedFilters = Object.values(getValues()).some(
    (val) => val !== "" && val !== undefined && val !== null
  );

  const onClearFilter = (key: string) => {
    startClearTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      router.replace(`?${params.toString()}`);
      setValue(key as keyof FilterType, "");
    });
  };

  const onResetClick = () => {
    startResetTransition(() => {
      reset();
      router.replace(pathname);
    });
  };

  const onApplyFiltersClick = async (data: FilterType) => {
    startApplyTransition(() => {
      const activeParams = Object.fromEntries(
        Object.entries(data).filter(([, value]) => Boolean(value))
      );
      const existingParams = Object.fromEntries(searchParams);
      const params = new URLSearchParams({ ...existingParams, ...activeParams });
      router.push(`?${params.toString()}`);
      onChangeFilter?.(data);
      Object.entries(data).map(([key, value]) => setValue(key as keyof FilterType, value));
    });
  };

  const onSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSort(value);
    onChangeSort?.(value);
  };

  const onApplySortClick = () => {
    startApplySortTransition(() => {
      const params = new URLSearchParams(searchParams);
      const [field, sort] = selectedSort.split(":");
      params.set("field", field);
      params.set("sort", sort);
      router.push(`?${params.toString()}`);
    });
  };

  const onResetSortClick = () => {
    startResetSortTransition(() => {
      setSelectedSort("");
      router.replace(pathname);
    });
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-2 overflow-x-auto px-2">
        {isSubmitted &&
          Object.entries(getValues()).map(([key, value]) => {
            if (!value) return null;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onClearFilter(key)}
                disabled={isClearPending}
                className="px-2 py-1 rounded-full capitalize text-muted-foreground flex items-center gap-1 text-sm cursor-pointer border border-border bg-background hover:bg-muted disabled:bg-muted disabled:text-border dark:disabled:text-muted-foreground"
              >
                {isClearPending ? <CgSpinner className="animate-spin" /> : <IoClose />}
                {value}
              </button>
            );
          })}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                "px-2 py-1 rounded-full cursor-pointer text-muted-foreground flex items-center gap-1 text-sm border border-border bg-muted hover:bg-background",
                hasAppliedFilters && "bg-background border-purple-500 text-purple-500"
              )}
            >
              <FiFilter />
              Filter
            </div>
          </PopoverTrigger>
          <PopoverContent className="min-w-60 p-4">
            <p>Select filters</p>
            <div className="my-4 space-y-2">
              <Dropdown label="Status" name="status" control={control} options={statusOptions} />
              <Dropdown
                label="Priority"
                name="priority"
                control={control}
                options={PRIORITY_OPTIONS}
              />
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetClick}
                disabled={isResetPending || isApplyPending}
                className={cn(
                  "px-2 py-1 rounded-md border text-sm border-border hover:bg-muted disabled:bg-muted disabled:text-border dark:disabled:text-muted-foreground",
                  isResetPending && "disabled:text-muted-foreground"
                )}
              >
                {isResetPending ? (
                  <span className="flex items-center gap-2">
                    <CgSpinner className="animate-spin" /> Resetting...
                  </span>
                ) : (
                  "Reset"
                )}
              </button>

              <button
                type="button"
                onClick={handleSubmit(onApplyFiltersClick)}
                disabled={!isDirty || isApplyPending || isResetPending}
                className={cn(
                  "px-2 py-1 rounded-md text-white text-sm bg-purple-500 hover:bg-purple-600 disabled:bg-muted disabled:text-border dark:disabled:text-muted-foreground",
                  isApplyPending && "disabled:text-muted-foreground"
                )}
              >
                {isApplyPending ? (
                  <span className="flex items-center gap-2">
                    <CgSpinner className="animate-spin" /> Applying...
                  </span>
                ) : (
                  "Apply Filters"
                )}
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover
          onOpenChange={() => {
            const defaultSort = getDefaultSort(searchParams);
            setSelectedSort(defaultSort);
          }}
        >
          <PopoverTrigger
            className={cn(
              "px-2 py-1 rounded-full text-muted-foreground flex items-center gap-1 text-sm cursor-pointer border border-border bg-muted hover:bg-background",
              selectedSort && "bg-background border-purple-500 text-purple-500"
            )}
          >
            <LiaSortSolid />
            Sort By
          </PopoverTrigger>
          <PopoverContent>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-muted-foreground">Sort by</legend>
              {SORT_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name={opt.label}
                    value={opt.value}
                    checked={selectedSort === opt.value}
                    onChange={onSortChange}
                    className="form-radio text-primary accent-purple-500"
                  />
                  {opt.label}
                </label>
              ))}
              <Divider />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onResetSortClick}
                  disabled={isResetSortPending || isApplySortPending}
                  className={cn(
                    "px-2 py-1 rounded-md border text-sm border-border hover:bg-muted disabled:bg-muted disabled:text-border dark:disabled:text-muted-foreground",
                    isResetSortPending && "disabled:text-muted-foreground"
                  )}
                >
                  {isResetSortPending ? (
                    <span className="flex items-center gap-2">
                      <CgSpinner className="animate-spin" /> Resetting...
                    </span>
                  ) : (
                    "Reset"
                  )}
                </button>
                <button
                  type="button"
                  onClick={onApplySortClick}
                  disabled={!selectedSort || isApplySortPending || isResetPending}
                  className={cn(
                    "px-2 py-1 rounded-md text-white text-sm bg-purple-500 hover:bg-purple-600 disabled:bg-muted disabled:text-border dark:disabled:text-muted-foreground",
                    isApplySortPending && "disabled:text-muted-foreground"
                  )}
                >
                  {isApplySortPending ? (
                    <span className="flex items-center gap-2">
                      <CgSpinner className="animate-spin" /> Applying...
                    </span>
                  ) : (
                    "Apply Sort"
                  )}
                </button>
              </div>
            </fieldset>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SortAndFilter;
