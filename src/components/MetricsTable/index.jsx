import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Box,
} from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import MetricsFilter from "./MetricsFilter";

import { allMetrics, typesArray } from "../../utils/constants";
import { getMetricValue, filterData, calculateSummary } from "../../utils/helpers";

const MetricsTable = (props) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);
    const [selectedMetrics, setSelectedMetrics] = useState([...allMetrics]);

    const { data } = props;

    const handleRequestSort = (metric) => {
        if (orderBy === metric) {
            if (order === "desc") setOrderBy(null);
            setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            return;
        }
        setOrder("asc");
        setOrderBy(metric);
    };

    const summary = useMemo(() => calculateSummary(data, allMetrics), [data])

    const filteredData = useMemo(() => filterData(data, order, orderBy), [data, order, orderBy]) || [];

    return (
        <Box sx={{ width: "100%" }}>
            <MetricsFilter
                selectedMetrics={selectedMetrics}
                setSelectedMetrics={setSelectedMetrics}
            />
            <TableContainer
                component={Paper}
                sx={{
                    margin: "5px 0 auto",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell
                                sx={{ whiteSpace: "nowrap", fontWeight: 600 }}
                            >
                                URL address
                            </TableCell>
                            {selectedMetrics.map((metric) => (
                                <TableCell
                                    key={metric}
                                    sx={{
                                        whiteSpace: "nowrap",
                                        fontWeight: 600,
                                    }}
                                    align="right"
                                >
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleRequestSort(metric)
                                            }
                                        >
                                            {orderBy === metric ? (
                                                order === "asc" ? (
                                                    <NorthIcon fontSize="small" />
                                                ) : (
                                                    <SouthIcon fontSize="small" />
                                                )
                                            ) : (
                                                <NorthIcon
                                                    fontSize="small"
                                                    sx={{ opacity: 0.3 }}
                                                />
                                            )}
                                        </IconButton>
                                        {metric.replaceAll("_", " ")}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row?.record?.key?.url}</TableCell>
                                {selectedMetrics.map((metric) => {
                                    const metricData =
                                        row?.record?.metrics?.[metric];
                                    return (
                                        <TableCell key={metric} align="right">
                                            {getMetricValue(metricData)}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {typesArray.map((typ) => (
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: 600 }}>
                                    {typ === "avg" ? "Average" : "Sum"}
                                </TableCell>
                                {selectedMetrics.map((metric) => (
                                    <TableCell key={metric} align="right">
                                        {summary?.[metric]?.[typ]
                                            ? summary[metric][typ]
                                            : "NA"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MetricsTable;
