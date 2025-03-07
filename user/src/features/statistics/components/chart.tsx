import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { statisticsQueries } from "..";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { formatDessertsForChart, getColorForDesserts } from "../utils";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

export const StatisticsChart: FC<{ fromDate?: Dayjs; toDate?: Dayjs }> = ({
  fromDate,
  toDate,
}) => {
  const { t: tCommon } = useTranslation();

  const query = statisticsQueries.useStatistics({
    fromDate,
    toDate,
  });

  const { data } = query;

  // Format the data for the chart
  const formattedDessertsByDay = formatDessertsForChart(data?.dessertsByDay);
  const colorsDessertsByDay = getColorForDesserts(data?.dessertsByDay);

  const formattedDessertsByMonth = formatDessertsForChart(
    data?.dessertsByMonth
  );
  const colorsDessertsByMonth = getColorForDesserts(data?.dessertsByMonth);

  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
      spacing={4}
    >
      <Grid sx={{ textAlign: "center" }} item width={"fit-content"}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Total Sessions and Revenue")}
            </Typography>
            <Typography variant="body1">
              {tCommon("Total Sessions")}: {data?.totalSessions}
            </Typography>
            <Typography variant="body1">
              {tCommon("Total Revenue")}: {data?.totalRevenue}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Revenue by Day")}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.revenueByDay}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#ffc658"
                  name={tCommon("Revenue")}
                />
                <Bar
                  dataKey="sessionsRevenue"
                  fill="#8884d8"
                  name={tCommon("Sessions Revenue")}
                />
                <Bar
                  dataKey="dessertsRevenue"
                  fill="#82ca9d"
                  name={tCommon("Desserts Revenue")}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Month */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Revenue by Month")}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.revenueByMonth}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#ffc658"
                  name={tCommon("Revenue")}
                />
                <Bar
                  dataKey="sessionsRevenue"
                  fill="#8884d8"
                  name={tCommon("Sessions Revenue")}
                />
                <Bar
                  dataKey="dessertsRevenue"
                  fill="#82ca9d"
                  name={tCommon("Desserts Revenue")}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions by Status */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Sessions by Status")}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.sessionsByStatus}
                  dataKey="count"
                  nameKey={({ _id }) => tCommon(_id)}
                  outerRadius={120}
                  fill="#8884d8"
                  label={({ cx, cy, midAngle, outerRadius, name, index }) => {
                    const RADIAN = Math.PI / 180;
                    const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
                    const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

                    const x2 =
                      cx + (outerRadius + 40) * Math.cos(-midAngle * RADIAN);
                    const y2 =
                      cy + (outerRadius + 40) * Math.sin(-midAngle * RADIAN);
                    const xText =
                      cx + (outerRadius + 60) * Math.cos(-midAngle * RADIAN);
                    const yText =
                      cy + (outerRadius + 60) * Math.sin(-midAngle * RADIAN);

                    return (
                      <>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                        />
                        <text
                          x={xText}
                          y={yText}
                          fill={colors[index % colors.length]}
                          fontSize={14}
                          fontWeight="bold"
                          textAnchor={xText > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {`${tCommon(name)}`}
                        </text>
                        console.log(dayData);
                      </>
                    );
                  }}
                >
                  {data?.sessionsByStatus.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Desserts By Month*/}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Desserts Sales")}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={formattedDessertsByMonth}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(colorsDessertsByMonth).map((dessertName) => (
                  <Bar
                    key={dessertName}
                    dataKey={dessertName}
                    stackId="a"
                    fill={colorsDessertsByMonth[dessertName]} // Use the random color for each dessert
                    name={dessertName}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Desserts by Day (Similar to Desserts by Month) */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tCommon("Desserts By Day")}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={formattedDessertsByDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(colorsDessertsByDay).map((dessertName) => (
                  <Bar
                    key={dessertName}
                    dataKey={dessertName}
                    stackId="a"
                    fill={colorsDessertsByDay[dessertName]} // Use the random color for each dessert
                    name={dessertName}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
};
