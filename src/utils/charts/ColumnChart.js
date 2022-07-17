import React, { useEffect } from 'react'
import { useAnychart } from '../../hooks/useAnyChart'



const ColumnChart = ({ chartData, chartTitle, xAxisTitle, yAxisTitle, height, cId }) => {
    const { anychart, isAnychartReady } = useAnychart();
    const containerId = 'colChart'+ cId;
    useEffect(() => {
        isAnychartReady && anychart && renderChart();
    }, [isAnychartReady, anychart, chartData]);

    function renderChart() {

        // create a chart
        anychart.onDocumentReady(() => {
            const chartElement = document.getElementById(containerId);
            if (chartElement !== null) chartElement.innerHTML = "";

            const chart = anychart.column()

            const series = chart.column(chartData)
            series.fill({ keys: ["#f9c54f", "#e46858"], angle: 90, opacity: 1 });
            series.stroke({
                keys: ["#f9c54f", "#e46858"],
                angle: 90,
                lineJoin: "round",
                lineCap: "round",
                thickness: 0.5,
            });
            chart.title(chartTitle);

            // set tooltip text template
            var tooltip = chart.getSeries(0).tooltip();
            tooltip.format(yAxisTitle+": {%value}");

            // set the titles of the axes
            chart.xAxis().title(xAxisTitle);
            chart.yAxis().title(yAxisTitle);
            chart.width("99%");
            chart.maxPointWidth("10%");
            chart.minPointLength(5);
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