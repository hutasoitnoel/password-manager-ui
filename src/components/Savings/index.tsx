import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { get } from '../../helper/axiosHelper'
import { ENDPOINT } from '../../config';
import { generateChartData } from '../../helper/generateChartData';
import './styles.css';

// Register necessary chart components
Chart.register(...registerables);

const Savings: React.FC = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);
    const [savings, setSavings] = useState([]);
    const [chartData, setChartData] = useState<{ names: string[], amounts: number[], colors: string[] }>({ names: [], amounts: [], colors: [] });
    const [activeSaving, setActiveSaving] = useState("");
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchSavings()
    }, [])

    useEffect(() => {
        if (chartContainer.current) {
            renderPieChart()
        }

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    useEffect(() => {
        fetchDetails()
    }, [activeSaving])

    const fetchDetails = () => {
        const data = savings.filter(({ name }) => name === activeSaving)

        setDetails(data)
    }

    const fetchSavings = async () => {
        try {
            const response = await get(ENDPOINT.SAVINGS);
            setSavings(response.data)

            const chartData = generateChartData(response.data)
            setChartData(chartData); // Change this line to setChartData(result)
        } catch (err) {
            console.error(err); // Optional: Add error logging
        }
    };

    const renderPieChart = () => {
        if (chartContainer.current) {
            const data = {
                labels: chartData.names,
                datasets: [
                    {
                        label: "Amount",
                        data: chartData.amounts,
                        backgroundColor: chartData.colors,
                        hoverOffset: 4,
                    },
                ],
            };

            const config: ChartConfiguration<'pie'> = {
                type: 'pie',
                data: data,
                options: {
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const chartElement = elements[0];
                            const datasetIndex = chartElement.datasetIndex;
                            const index = chartElement.index;
                            const name = data.labels[index];
                            const amount = data.datasets[datasetIndex].data[index];
                            setActiveSaving(name)
                        }
                    }
                }
            };

            chartInstance.current = new Chart(chartContainer.current, config);
        }
    }

    return <div>
        <Row>
            <Col md={5}>
                <canvas ref={chartContainer} />
            </Col>
            <Col md={7}>
                <p className='m-0'>Details</p>
                <div className='divider' />
                {
                    details.map(({ name, amount, description }) => {
                        return <>
                            <p>{name}</p>
                            <p>{amount}</p>
                            <p>{description}</p>
                        </>
                    })
                }
            </Col>
        </Row>
    </div>;
};

export default Savings;
