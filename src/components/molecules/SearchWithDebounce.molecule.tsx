"use client"
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InputWithIcon from "./InputWithIcon.molecule";
import { cn } from "@/utils/cn";
import Loader from "./Loader.molecule";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  setSearchText: (text: string) => void;
  setPage?: (page: number) => void;
  className?: string;
  isLoading?: boolean;
}

const SearchWithDebounce = ({setSearchText , setPage, className = '', isLoading, ...props}: Props) => {
  // We are using useRef to prevent function recreated on every render
  const debouncedSearch = useRef(
    debounce((value: string) => {
      if (setPage) setPage(1);
      setSearchText(value);
    }, 1000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // we are using debounce for auto search
  const handleSearchText = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <InputWithIcon 
      headingIcon={
        isLoading ? <Loader /> : <HiMagnifyingGlass className={cn("text-neutral-800 dark:text-neutral-200", className)} />
      }
      onChange={handleSearchText}
      {...props}
    />
  )
}

export default SearchWithDebounce;