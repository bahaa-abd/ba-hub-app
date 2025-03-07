import { Card, CardContent, Typography, Button } from "@mui/material";
import { FC } from "react";
import { Plan } from "../api/type";
import { Star, StarBorder, Diamond } from "@mui/icons-material"; // Use Star and Diamond icons
import { subscriptionOrderQueries } from "features/subscription-order";
import { storage } from "utils/storage";
import { useTranslation } from "react-i18next";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { transformFiled } from "utils/transforms";

export const PlanCard: FC<{ plan: Plan }> = ({ plan }) => {
  const { t } = useTranslation("subscription-order");
  const { t: tCommon } = useTranslation();
  const successSnackbar = useSuccessSnackbar();

  const add = subscriptionOrderQueries.useAdd();

  const handelPurchase = async (id: string) => {
    add.mutate(
      { planId: id, organizationId: storage.getOrg() },
      {
        onSuccess: () => {
          successSnackbar(t("message.success.add"));
        },
      }
    );
  };

  const renderPlanIcon = (title: string) => {
    title = title.toLowerCase();
    if (title.includes("silver"))
      return <StarBorder sx={{ fontSize: 40, color: "#C0C0C0" }} />;
    if (title.includes("gold"))
      return <Star sx={{ fontSize: 40, color: "#FFD700" }} />;
    if (title.includes("diamond"))
      return <Diamond sx={{ fontSize: 40, color: "#00aaff" }} />;

    return null;
  };

  return (
    <Card
      sx={{
        textAlign: "center",
        p: 2,
        borderRadius: 4,
        boxShadow: 4,
        width: "100%",
        maxWidth: 400, // Proper width for better readability
        minWidth: 280, // Prevents extreme shrinking
        margin: "auto",
      }}
    >
      <CardContent>
        {renderPlanIcon(plan.title.en as string)}
        {/* Render icon based on plan */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, pb: 1 }}>
          {transformFiled(plan.title)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "600" }}
        >
          {transformFiled(plan.description)}
        </Typography>
        <Typography variant="h4" sx={{ p: 2, fontWeight: "bold" }}>
          ${plan.price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "800", fontSize: "15px" }}
        >
          {tCommon(plan.duration)}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            py: 1,
            width: "100%", // Full-width button
            borderRadius: 3,
            fontSize: "1rem",
          }}
          onClick={() => handelPurchase(plan.id)}
          disabled={add.isLoading}
        >
          {tCommon("Purchase")}
        </Button>
      </CardContent>
    </Card>
  );
};
