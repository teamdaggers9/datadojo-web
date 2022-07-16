import React, { useEffect } from 'react'
import { useAnychart } from '../../hooks/useAnyChart'



const PieChart = ( { chartData, chartTitle, cId, height } ) => {

    const { anychart, isAnychartReady } = useAnychart();
    const containerId = `container${cId}`

    useEffect(() => {
        isAnychartReady && anychart && renderChart();
    }, [anychart, isAnychartReady, chartData, chartTitle]);

    function renderChart() {

        anychart.onDocumentReady(() => {
            const chartElement = document.getElementById(containerId);
            if (chartElement !== null) chartElement.innerHTML = "";
            const chart = anychart.pie(chartData);

            chart.title(chartTitle);
            // set the container id
            chart.container(containerId);
    
            // initiate drawing the chart
            chart.draw(containerId);

            document.getElementsByClassName("anychart-credits")[0].remove();
        })

    }

    return (
        <React.Fragment>
            <div
                id={containerId}
                style={{
                    height
                }}
            />
        </React.Fragment>
    )
}

export default PieChart