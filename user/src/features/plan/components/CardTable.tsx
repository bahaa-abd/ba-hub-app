import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import { planQueries } from "..";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { Stack, Typography, Grid, Box } from "@mui/material";
import { PlanCard } from "./Card";
import { useTranslation } from "react-i18next";

type Props = {};

export const PlanCardTable: FC<Props> = () => {
  const { t: tCommon } = useTranslation();
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const query = planQueries.useAll({ search, page });
  const { data } = query;
  const currentPage = getPage(data, page);

  return (
    <Stack spacing={4} alignItems="center" sx={{ width: "100%", py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {tCommon("Subscription Plans")}
      </Typography>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ maxWidth: 1200 }}
        >
          {currentPage?.map((plan) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={plan.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PlanCard plan={plan} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default PlanCardTable;
