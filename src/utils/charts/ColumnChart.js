import React, { useEffect } from 'react'
import { useAnychart } from '../../hooks/useAnyChart'

const containerId = 'colChart'

const ColumnChart = ({ chartData, chartTitle, xTitle, yTitle, height }) => {
    const { anychart, isAnychartReady } = useAnychart();

    useEffect(() => {
        isAnychartReady && anychart && renderChart();
    }, [isAnychartReady, anychart, chartData, chartTitle, height]);

    function renderChart() {

        // create a chart
        anychart.onDocumentReady(() => {
            const chartElement = document.getElementById(containerId);
            if (chartElement !== null) chartElement.innerHTML = "";

            const chart = anychart.column()

            var series = chart.column(chartData)

            chart.title(chartTitle);

            // set the titles of the axes
            chart.xAxis().title(xTitle);
            chart.yAxis().title(yTitle);

            chart.container(containerId)

            chart.draw(containerId)


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

export default ColumnChart