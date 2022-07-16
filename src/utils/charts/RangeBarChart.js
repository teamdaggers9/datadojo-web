import React, { useEffect } from 'react'
import { useAnychart } from '../../hooks/useAnyChart'

const containerId = "rangeBarChart"

const RangeBarChart = ({ chartData, chartTitle, xAxisTitle, yAxisTitle, height = 400 }) => {

    const { anychart, isAnychartReady } = useAnychart();

    useEffect(() => {
        isAnychartReady && anychart && renderChart();
    }, [isAnychartReady, anychart, chartData, chartTitle, height]);

    function renderChart() {

        // create a chart
        anychart.onDocumentReady(() => {
            const chartElement = document.getElementById(containerId);
            if (chartElement !== null) chartElement.innerHTML = "";

            const chart = anychart.bar()

            // create area series with passed data
            const ranges_data = anychart.data.set(chartData)

            const data = ranges_data.mapAs({ 'x': 'model' });
            const series = chart.rangeBar(data);
            chart.title(chartTitle);
            chart.xAxis().title(xAxisTitle);
            chart.yAxis().title(yAxisTitle);
            // set the selection color

            series.fill({ keys: ["#f9c54f", "#e46858"], angle: 90, opacity: 1 });
            series.stroke({
                keys: ["#f9c54f", "#e46858"],
                angle: 90,
                lineJoin: "round",
                lineCap: "round",
                thickness: 0.5,
            });
            series.selected()
            .fill("#e46858")
            .stroke("#f9c54f")

            chart.width("99%");
            chart.maxPointWidth("10%");
            chart.minPointLength(5);
            chart.container(containerId)

            chart.draw(containerId)


            document.getElementsByClassName("anychart-credits")[0].remove();
        })
    }

    return (
        <div
            id={containerId}
            style={{
                height
            }}
        />
    )
}

export default RangeBarChart