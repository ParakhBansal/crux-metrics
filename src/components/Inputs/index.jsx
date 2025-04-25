import React, { useState, useMemo } from "react";
import { TextField, Chip, Box, Button, Typography, Alert } from "@mui/material";
import { validateUrl } from "../../utils/helpers";

const Inputs = ({ onSearch, loading }) => {
    const [value, setValue] = useState("");
    const [urlList, seturlList] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            if (!urlList.includes(value.trim())) {
                seturlList(prev => [ ...prev, value.trim() ]);
            }
            setValue("");
        }
    };

    const handleSearch = () => {
        onSearch(urlList);
        seturlList([]);
    };

    const handleDelete = (urlToDelete) => {
        seturlList(urlList.filter((url) => (url !== urlToDelete)));
    };

    const isUrlListValid = useMemo(() => urlList.every(url => validateUrl(url)), [urlList])

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    mt: 4,
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <Typography variant="subtitle1" fontWeight={500}>URL :</Typography>
                <Box
                    sx={{
                        width: "50%",
                        padding: 1,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        ml: 1,
                    }}
                >
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {urlList.map((url, index) => (
                            <Chip
                                key={index}
                                sx={{ m: "3px" }}
                                label={url}
                                onDelete={() => handleDelete(url)}
                                color="primary"
                            />
                        ))}
                    </Box>
                    <TextField
                        variant="standard"
                        placeholder="Enter URL"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{ disableUnderline: true }}
                        sx={{ minWidth: "100%" }}
                    />
                </Box>
                <Button
                    variant="outlined"
                    sx={{ height: "40px", ml: 2 }}
                    onClick={handleSearch}
                    disabled={!(isUrlListValid && urlList?.length) || loading}
                >
                    {loading ? 'Loading...' : 'Search'}
                </Button>
            </Box>
            {urlList?.length && !isUrlListValid ? (
                <Alert
                    severity="error"
                    sx={{ width: "fit-content", margin: "0 auto", mb: 1 }}
                >
                    Some of the URLs you entered are invalid. Please review and correct them.
                </Alert>
            ) : null}
        </Box>
    );
};

export default Inputs;
