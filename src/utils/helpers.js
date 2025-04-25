export const fetchMetricsData = async (url) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url }),
        };

        const response = await fetch(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${import.meta.env.VITE_CRUX_API_KEY}`, options)

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const getMetricValue = (metric) => {
    if (metric?.percentiles) return metric.percentiles.p75;
    return "N/A";
};


export const filterData = (data, order, orderBy) => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
        const valA = getMetricValue(a.record.metrics[orderBy]);
        const valB = getMetricValue(b.record.metrics[orderBy]);

        const aValid = typeof valA === 'number';
        const bValid = typeof valB === 'number';

        if (!aValid && !bValid) return 0;
        if (!aValid) return 1;
        if (!bValid) return -1;

        return order === 'asc' ? valA - valB : valB - valA;
    });
}

export const validateUrl = (url) => {
    return (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g).test(url)
}

export const calculateSummary = (data, metrics) => {
    const summary = {};

    metrics.forEach((metric) => {
        const values = data
            .map((row) => row?.record?.metrics?.[metric]?.percentiles?.p75)
            .filter((v) => typeof v === 'number');

        const sum = values.length ? values.reduce((a, b) => a + b, 0) : null
        const average = sum ? (sum / values.length) : null;

        summary[metric] = { 'sum':sum, 'avg':average } 

    });

    return summary;
};