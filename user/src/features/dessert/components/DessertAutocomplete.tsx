import { Autocomplete, AutocompleteProps } from "@mui/material";
import Loading from "components/feedback/Loading";
import AutocompleteControl, {
  AutocompleteControlProps,
} from "components/selects/AutocompleteControl";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { dessertQueries } from "..";
import { DessertSelect } from "../api/type";
import { transformFiled } from "utils/transforms";
type Props = Omit<
  AutocompleteProps<DessertSelect, boolean, boolean, false>,
  "options" | "renderInput"
> &
  Omit<AutocompleteControlProps, "children">;
export const DessertAutocomplete: FC<Props> = ({
  name,
  control,
  label,
  ...props
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = dessertQueries.useSelect();
  return (
    <AutocompleteControl control={control} label={label} name={name}>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        {...props}
        loading={isLoading}
        options={data ?? []}
        getOptionLabel={(option) => transformFiled(option.name)}
        renderInput={() => null}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {transformFiled(option.name)}
          </li>
        )}
        loadingText={<Loading />}
        noOptionsText={t("error.noData")}
      />
    </AutocompleteControl>
  );
};
