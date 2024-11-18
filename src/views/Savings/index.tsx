import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from '../../components/ui/button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { get, patch, post, axiosDelete } from '../../helper/axiosHelper'
import { ENDPOINT, INITIAL_SAVING_FORM } from '../../config';
import { generateChartData } from '../../helper/generateChartData';
import { formatToRupiah } from '../../helper/formatToRupiah';
import SavingForm from './components/savingForm';
import { Saving, SavingFormType } from './types';

import EditIcon from '../../icons/edit.png'
import Deletecon from '../../icons/delete.svg'

import './styles.css';

// Register necessary chart components
Chart.register(...registerables);

const Savings: React.FC = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);
    const [savings, setSavings] = useState<Saving[]>([]);
    const [chartData, setChartData] = useState<{ names: string[], amounts: number[], colors: string[] }>({ names: [], amounts: [], colors: [] });
    const [activeSaving, setActiveSaving] = useState("");
    const [details, setDetails] = useState<Saving[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<SavingFormType>(INITIAL_SAVING_FORM);
    const [totalSavings, setTotalSavings] = useState(0);
    const [editId, setEditId] = useState(0);

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
    }, [savings, activeSaving])

    useEffect(() => {
        countTotalSavings()
    }, [savings])

    const countTotalSavings = () => {
        let total = 0;

        savings.forEach(({ amount }) => {
            total += amount
        });

        setTotalSavings(total);
    }

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
        setForm(INITIAL_SAVING_FORM)
        setEditId(0)
        setIsModalOpen(true)
    }

    const onSubmitSavingForm = async () => {
        try {
            const payload = {
                name: form.name,
                amount: Number(form.amount),
                description: form.description
            }

            if (editId) {
                await patch(`${ENDPOINT.SAVINGS}/${editId}`, payload)
            } else {
                await post(ENDPOINT.SAVINGS, payload)
            }

            fetchSavings()
            setActiveSaving(payload.name)
        } catch (err) {
            console.log('error');
            console.log(err);
        }
        setIsModalOpen(false)
    }

    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onEdit = async (detail: Saving) => {
        setIsModalOpen(true)
        setForm({
            name: detail.name,
            description: detail.description,
            amount: detail.amount
        })
        setEditId(detail.ID)
        fetchSavings()
    }

    const onDelete = async (id: number) => {
        await axiosDelete(`${ENDPOINT.SAVINGS}/${id}`)
        fetchSavings()
    }

    return <div>
        <Button onClick={onOpenCreateSavingModal}>
            Create saving
        </Button>
        <Row>
            <Col md={5}>
                <canvas ref={chartContainer} />
                <p>
                    <strong>
                        Total: {formatToRupiah(totalSavings)}
                    </strong>
                </p>
            </Col>
            <Col md={7}>
                <p className='m-0'>
                    <strong>
                        {activeSaving || 'Click the chart to view saving details'}
                    </strong>
                </p>
                <div className='divider' />
                {
                    activeSaving && <Table
                        striped
                        bordered
                        hover
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Amount</th>
                                <th>Note</th>
                                <th style={{ width: '10%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details.map((detail, index) => {
                                    const { ID, amount, description } = detail

                                    return <tr key={index}>
                                        <td>{formatToRupiah(amount)}</td>
                                        <td>{description || '-'}</td>
                                        <td className='d-flex justify-content-around align-items-center'>
                                            <img
                                                alt='edit'
                                                onClick={() => onEdit(detail)}
                                                src={EditIcon}
                                                className='action-style'
                                            />
                                            <img
                                                alt='delete'
                                                onClick={() => onDelete(ID)}
                                                src={Deletecon}
                                                className='action-style'
                                            />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
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
                    <Button variant='outline' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant='default' onClick={onSubmitSavingForm}>Confirm</Button>
                </div>
            </div>
        </Modal>
    </div>;
};

export default Savings;
