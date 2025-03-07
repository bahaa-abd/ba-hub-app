import { Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { StatisticsChart, StatisticsFilters } from "features/statistics";
import { FC, useState } from "react";

export const StatisticsPage: FC<{}> = ({}) => {
  const [fromDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();

  return (
    <Stack gap={1} position={"relative"}>
      <StatisticsFilters
        setDateFrom={setFromDate}
        setDateTo={setToDate}
        dateFrom={fromDate}
        dateTo={toDate}
      />
      <StatisticsChart fromDate={fromDate} toDate={toDate} />
    </Stack>
  );
};
