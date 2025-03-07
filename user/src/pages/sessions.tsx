import { Stack } from "@mui/material";
import AddFab from "components/buttons/AddFab";
import { SessionStatus } from "constants/enums";
import { Dayjs } from "dayjs";
import { SessionAddForm, SessionFilters, SessionTable } from "features/session";
import useEventSearchParams from "hooks/useEventSearchParams";
import { useState } from "react";

export default function SessionsPage() {
  const { add } = useEventSearchParams();
  const [status, setStatus] = useState<SessionStatus>();
  const [dateFrom, setDateFrom] = useState<Dayjs>();
  const [dateTo, setDateTo] = useState<Dayjs>();

  return (
    <>
      <Stack gap={1} position="relative">
        <SessionFilters
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          setStatus={setStatus}
          status={status}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
        <SessionTable filters={{ dateFrom, dateTo, status }} />
        <SessionAddForm />
        <AddFab hideOnScroll onClick={() => add()} />
      </Stack>
    </>
  );
}
