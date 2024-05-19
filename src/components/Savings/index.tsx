import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { get } from '../../helper/axiosHelper'
import { ENDPOINT } from '../../config';
import './styles.css';

// Register necessary chart components
Chart.register(...registerables);

const Savings: React.FC = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);
    const [savings, setSavings] = useState([]);
    const [chartData, setChartData] = useState<{ names: string[], amounts: number[] }>({ names: [], amounts: [] });
    const [activeSaving, setActiveSaving] = useState("");

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

    const fetchSavings = async () => {
        interface DataItem {
            name: string;
            amount: number;
        }
    
        try {
            const response = await get(ENDPOINT.SAVINGS);
    
            let result: {
                names: string[];
                amounts: number[];
            } = {
                names: [],
                amounts: []
            };
    
            (response.data as DataItem[]).forEach(({ name, amount }) => {
                result.names.push(name);
                result.amounts.push(amount);
            });
    
            setChartData(result); // Change this line to setChartData(result)
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
                        backgroundColor: [
                            '#1164B2',
                            '#1cae70',
                            '#4B44FE',
                            '#A1333B',
                        ],
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
                            alert(`You clicked on ${name}: ${amount}`);
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
                {JSON.stringify(savings)}
            </Col>
        </Row>
    </div>;
};

export default Savings;
