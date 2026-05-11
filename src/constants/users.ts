export type SortOption = "name-asc" | "name-desc" | "posts-desc" | "pending-desc";
export type FilterOption = "all" | "has-pending" | "no-completed";

export const DEFAULT_SORT: SortOption = "name-asc";
export const DEFAULT_FILTER: FilterOption = "all";

export const VALID_SORTS: SortOption[] = ["name-asc", "name-desc", "posts-desc", "pending-desc"];
export const VALID_FILTERS: FilterOption[] = ["all", "has-pending", "no-completed"];