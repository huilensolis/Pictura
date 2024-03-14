"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSearchForm } from "./hooks/useSearchForm";

const formInputs = {
  search: "search",
};

export type formType = typeof formInputs;

interface SearchFormProps {
  defaultSearchValue: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  defaultSearchValue,
}) => {
  const { register } = useForm<formType>();

  const { changeSearchValue } = useSearchForm(defaultSearchValue);

  const handleOnChangeToSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.currentTarget.value;
    changeSearchValue(newValue);
  };

  return (
    <search>
      <Input
        onInput={handleOnChangeToSearch}
        name={formInputs.search}
        register={register}
        validationScheme={{}}
        type="text"
        id="search-input"
        label="Search"
        placeholder="cats, dogs ..."
        error={undefined}
        defaultValue={defaultSearchValue}
      />
    </search>
  );
};
