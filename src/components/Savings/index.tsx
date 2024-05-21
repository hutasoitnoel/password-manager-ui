import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { get, post } from '../../helper/axiosHelper'
import { ENDPOINT, INITIAL_SAVING_FORM } from '../../config';
import { generateChartData } from '../../helper/generateChartData';
import { formatToRupiah } from '../../helper/formatToRupiah';
import SavingForm from './components/savingForm';
import './styles.css';
import { SavingFormType } from './types';

// Register necessary chart components
Chart.register(...registerables);

const Savings: React.FC = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);
    const [savings, setSavings] = useState([]);
    const [chartData, setChartData] = useState<{ names: string[], amounts: number[], colors: string[] }>({ names: [], amounts: [], colors: [] });
    const [activeSaving, setActiveSaving] = useState("");
    const [details, setDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<SavingFormType>(INITIAL_SAVING_FORM);

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

    const onOpenCreateSavingModal = () => {
        setIsModalOpen(true)
    }

    const submitCreateSaving = async () => {
        try {
            const payload = {
                name: form.name,
                amount: Number(form.amount),
                description: form.description
            }

            await post(ENDPOINT.SAVINGS, payload)

            fetchSavings()
        } catch (err) {
            console.log('error');
            console.log(err);
        }
        setIsModalOpen(false)
    }

    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return <div>
        <Button onClick={onOpenCreateSavingModal}>
            Create credential
        </Button>
        <Row>
            <Col md={5}>
                <canvas ref={chartContainer} />
            </Col>
            <Col md={7}>
                <p className='m-0'>{activeSaving || 'Details'}</p>
                <div className='divider' />
                {
                    details.map(({ amount, description }) => {
                        return <Row>
                            <Col md={9}>{description}</Col>
                            <Col md={3}>{formatToRupiah(amount)}</Col>
                        </Row>
                    })
                }
            </Col>
        </Row>

        <Modal
            show={isModalOpen}>
            <div className='p-3'>
                <SavingForm
                    form={form}
                    onChange={onChangeInputText}
                />
                <div className='d-flex justify-content-between'>
                    <Button variant='info' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant='primary' onClick={submitCreateSaving}>Confirm</Button>
                </div>
            </div>
        </Modal>
    </div>;
};

export default Savings;
