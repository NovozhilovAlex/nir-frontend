import React, {useEffect, useState} from 'react';
import NewsCard from "../components/NewsCard";
import CreateNewsModal from "../components/CreateNewsModal";
import {Button, Col, Row, Typography} from "antd";
import NewsService from "../services/NewsService";
import UpdateNewsModal from "../components/UpdateNewsModal";

const News = () => {
    const { Title } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const showUpdateNewsModal = () => {
        setIsUpdateNewsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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

    return (
        <div>
            <Row justify="center" align="top">
                <Col>
                    <Title level={2}>Новости</Title>
                </Col>
            </Row>
            <Row align="top">
                <Col span={4} offset={20}>
                    <Button type="primary" onClick={showModal}>
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
                </Col>
            </Row>
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