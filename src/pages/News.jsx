import React, {useEffect, useState} from 'react';
import NewsCard from "../components/NewsCard";
import CreateNewsModal from "../components/CreateNewsModal";
import {Button, Col, InputNumber, Row, Typography, Checkbox } from "antd";
import NewsService from "../services/NewsService";
import UpdateNewsModal from "../components/UpdateNewsModal";
import RegistrationModal from "../components/RegistrationModal";
import AuthorizationModal from '../components/AuthorizationModal';
import { DatePicker, Space } from 'antd';
import Column from 'antd/es/table/Column';


const { RangePicker } = DatePicker;

const News = () => {
    const { Title } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUpdateNewsModalOpen, setIsUpdateNewsModalOpen] = useState(false);
    const [validMassage, setValidMassage] = useState('');

    const [news, setNews] = useState([]);

    useEffect(() => {
        NewsService.getAllNews().then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showRegModal = () => {
        setIsRegModalOpen(true);
    };
    const showAuthModal = () => {
        setIsAuthModalOpen(true);
    };
    const showUpdateNewsModal = () => {
        setIsUpdateNewsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleRegCancel = () => {
        setIsRegModalOpen(false);
    };
    const handleAuthCancel = () => {
        setIsAuthModalOpen(false);
    };
    const handleCancelUpdateNewsModal = () => {
        setIsUpdateNewsModalOpen(false);
    };

    const addNews = (news) => {
        NewsService.createNews(news).then((response) => {
            console.log(response.data);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
            }
        });
        setIsModalOpen(false);
    }
    const deleteNews = (id) => {
        NewsService.deleteNews(id).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const updateNews = (news) => {
        NewsService.updateNews(news).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
        setIsUpdateNewsModalOpen(false);
    }

    const [updatableNews, setUpdatableNews] = useState({});
    const getNewsFromNewsCard = (news) => {
        setUpdatableNews(news);
    }
    const onChange = (value) => {
        console.log('changed', value);
    };
    const onChangeCheckbox  = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    const plainOptions = ['Газ', 'Вода', 'Мусор'];

    return (
        <div>
            <Row justify="center" align="top">
                <Col>
                    <Title level={2}>Новости</Title>
                </Col>
            </Row>
            <Row className='sort_news'>
                <Col style={{ display:'flex', flexDirection:'Column'}}>
                    <Checkbox.Group  options={plainOptions} onChange={onChangeCheckbox} />
                    <InputNumber style={{ marginTop: 10 }} min={1} max={10} defaultValue={3} onChange={onChange} />
                    <RangePicker style={{ marginTop: 10 }}/>
                </Col>
                <Col  style={{ display:'flex', flexDirection:'Column'}} offset={15}> 
                    <div >
                        <Button type="default" onClick={showModal}>
                            Добавить новость
                        </Button>
                        <CreateNewsModal
                            isModalOpen={isModalOpen}
                            addNews={addNews}
                            onCansel={handleCancel}
                            validMessage={validMassage}
                        />
                        <UpdateNewsModal
                            isModalOpen={isUpdateNewsModalOpen}
                            updateNews={updateNews}
                            onCansel={handleCancelUpdateNewsModal}
                            news={updatableNews}
                        />
                    </div>
                    <div>
                        <Button style={{ marginTop: 10 }} type="primary" onClick={showRegModal}>
                            Регистрация
                        </Button>
                        <RegistrationModal
                            isModalOpen={isRegModalOpen}
                            // Registration={Registration}
                            onCansel={handleRegCancel}
                            validMessage={validMassage}
                        />
                    </div>
                    <div >
                        <Button style={{ marginTop: 10 }} type="primary" onClick={showAuthModal}>
                            Авторизация
                        </Button>
                        <AuthorizationModal
                            isModalOpen={isAuthModalOpen}
                            onCansel={handleAuthCancel}
                            validMessage={validMassage}
                        />
                    </div>
                </Col>
            </Row>
            {/* <Row align="top" style={{ marginTop: 10 }}>
                
            </Row> 
            <Row align="top" style={{ marginTop: 10 }}>
                
            </Row>
            <Row align="top" style={{ marginTop: 10 }}>
                
            </Row> */}
            <Row justify="center" align="top">
                <Col>
                    <NewsCard
                        news={news}
                        deleteNews={deleteNews}
                        showUpdateNewsModal={showUpdateNewsModal}
                        getNewsFromNewsCard={getNewsFromNewsCard}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default News;