import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register necessary chart components
Chart.register(...registerables);

const Savings: React.FC = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);

    useEffect(() => {
        if (chartContainer.current) {
            const data = {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                        ],
                        hoverOffset: 4,
                    },
                ],
            };

            const config: ChartConfiguration<'pie'> = {
                type: 'pie',
                data: data,
                options: {}, // You can add specific options here if needed
            };

            chartInstance.current = new Chart(chartContainer.current, config);
        }

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartContainer} />;
};

export default Savings;
