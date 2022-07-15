import React, { useEffect } from 'react'
import { useAnychart } from '../../hooks/useAnyChart'

const containerId = 'pieChart'

const PieChart = ( { chartData, chartTitle, height } ) => {

    const { anychart, isAnychartReady } = useAnychart();

    useEffect(() => {
        isAnychartReady && anychart && renderChart();
    }, [anychart, isAnychartReady, chartData, chartTitle]);

    function renderChart() {

        anychart.onDocumentReady(() => {

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