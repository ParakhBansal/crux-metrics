import React, { useState } from "react";
import { 
    Container, 
    Typography, 
    Alert,
    Snackbar,
    CircularProgress
} from "@mui/material";

import Inputs from "./components/Inputs";
import MetricsTable from "./components/MetricsTable";

import { fetchMetricsData } from "./utils/helpers";

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const fetchData = async (urlList) => {
        setLoading(true);
        try {
            const promiseArr = urlList.map((url) => fetchMetricsData(url));
            const results = await Promise.all(promiseArr);

            setData(results.filter((data) => data.record?.key?.url));

        } catch (err) {
            setError(err.message);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const onSearch = (urlList = []) => {
        fetchData(urlList);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h3" fontWeight={600} color="primary">CRUX Metrics</Typography>
            <Inputs onSearch={onSearch} loading={loading} />
            <Alert severity="info">
                Multiple URLs are supported, to add url type in url and press Enter.<br />
                Enter a valid URL starting with http:// or https://  <br />
                Example: https://www.example.com
            </Alert>
            {loading ? <CircularProgress size={40} sx={{ mt:4 }} color="primary" /> : null}
            {data?.length ? <MetricsTable data={data} /> : null}

            {error && (
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
}

export default App;
