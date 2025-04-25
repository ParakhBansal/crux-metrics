import React, { useState } from "react";
import {
    Button,
    Popover,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box,
} from "@mui/material";

import { allMetrics } from "../../utils/constants";

const MetricsFilter = ({ selectedMetrics, setSelectedMetrics }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMetric = (metric) => {
        setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]));
    };

    const open = Boolean(anchorEl);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Filter Metrics ({selectedMetrics.length})
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Box sx={{ padding:2 }}>
                    <FormGroup>
                        {allMetrics.map((metric) => (
                            <FormControlLabel
                                key={metric}
                                control={
                                    <Checkbox
                                        checked={selectedMetrics.includes(metric)}
                                        onChange={() => toggleMetric(metric)}
                                    />
                                }
                                label={metric.replaceAll("_", " ")}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </Popover>
        </>
    );
};

export default MetricsFilter;
