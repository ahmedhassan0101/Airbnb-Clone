"use client";

import { Input } from "../../ui/input";
import { useDebounceSearch } from "@/src/hooks/useDebounceSearch";

function NavSearch() {
  const { search, setSearch, handleSearch } = useDebounceSearch();
  return (
    <Input
      type="search"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted "
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}
export default NavSearch;
