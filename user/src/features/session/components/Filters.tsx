import { Button, Grid, IconButton, MenuItem, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchFilter from "components/inputs/SearchFilter";
import TextField from "components/inputs/TextField";
import { SessionStatus } from "constants/enums";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

export type Props = {
  dateFrom?: Dayjs;
  setDateFrom: Dispatch<SetStateAction<Dayjs | undefined>>;
  dateTo?: Dayjs;
  setDateTo: Dispatch<SetStateAction<Dayjs | undefined>>;
  status?: string;
  setStatus: Dispatch<SetStateAction<SessionStatus | undefined>>;
};

export const Filters: FC<Props> = ({
  setDateFrom,
  setDateTo,
  setStatus,
  status,
  dateFrom,
  dateTo,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const { t: tCommon } = useTranslation();
  const clearFilters = () => {
    setStatus("" as SessionStatus);
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={() => setShowFilters((prev) => !prev)}>
          <FilterListIcon />
        </IconButton>
      </Stack>

      {showFilters && (
        <Stack
          sx={{
            position: "absolute",
            top: 40,
            width: { xs: "90%", sm: "80%", md: "60%", lg: "20%" },
            padding: 2,
            backgroundColor: "white",
            zIndex: 10,
            boxShadow: 3,
          }}
        >
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SearchFilter />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label={tCommon("Status")}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SessionStatus)}
                >
                  <MenuItem value={""}>{tCommon("all")}</MenuItem>
                  <MenuItem value={SessionStatus.started}>
                    {tCommon("started")}
                  </MenuItem>
                  <MenuItem value={SessionStatus.ended}>
                    {tCommon("ended")}
                  </MenuItem>
                  <MenuItem value={SessionStatus.cancelled}>
                    {tCommon("cancelled")}
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <DatePicker
                  label={tCommon("Date From")}
                  value={dateFrom || null}
                  onChange={(newValue) => setDateFrom(newValue || undefined)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid item xs={12}>
                <DatePicker
                  label={tCommon("Date To")}
                  value={dateTo || null}
                  onChange={(newValue) => setDateTo(newValue || undefined)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </Grid>
            <Button onClick={clearFilters}>{tCommon("Clear filters")}</Button>
          </Stack>
        </Stack>
      )}
    </LocalizationProvider>
  );
};
