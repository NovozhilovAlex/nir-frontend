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
import Cookies from 'universal-cookie';
import {render} from "react-dom";
import OkModal from "../components/OkModal";


const { RangePicker } = DatePicker;

const News = () => {
    const { Title } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUpdateNewsModalOpen, setIsUpdateNewsModalOpen] = useState(false);
    const [validMassage, setValidMassage] = useState('');
    const [isOkModalOpen, setIsOkModalOpen] = useState(false);

    const [news, setNews] = useState([]);
    const [tags, setTags] = useState([]);
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [limit, setLimit] = useState([]);
    const [roles, setRoles] = useState([]);
    const [textMsg, setTextMsg] = useState('');

    useEffect(() => {
        NewsService.getAllNews().then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const showNews = () => {
        NewsService.getAllNews().then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

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
    const handleOkCancel = () => {
        setIsOkModalOpen(false);
    };

    const addNews = (news) => {
        NewsService.createNews(news).then((response) => {
            console.log(response.data);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
                setTextMsg(error.response.data)
                setIsOkModalOpen(true)
            }
        });
        setIsModalOpen(false);
        showNews()
        const domNode = document.getElementById('root');
        render(<News />, domNode);
    }
    const deleteNews = (id) => {
        NewsService.deleteNews(id).then((response) => {
            console.log(response.data);
            setTextMsg("Новость удалена")
            setIsOkModalOpen(true)
        }).catch(error => {
            console.log(error);
            setTextMsg(error.response.data)
            setIsOkModalOpen(true)
        });
        showNews()
        const domNode = document.getElementById('root');
        render(<News />, domNode);
    }
    const updateNews = (news) => {
        NewsService.updateNews(news).then((response) => {
            console.log(response.data);
            setTextMsg("Новость изменена")
            setIsOkModalOpen(true)
        }).catch(error => {
            console.log(error);
            setTextMsg(error.response.data)
            setIsOkModalOpen(true)
        });
        setIsUpdateNewsModalOpen(false);
        showNews()
        const domNode = document.getElementById('root');
        render(<News />, domNode);
    }

    const getNewsByTags = () => {
        NewsService.getAllNewsByTags(tags).then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const getNewsByDateBetween = () => {
        NewsService.getAllNewsByDateBetween(start, end).then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const getNewsByTagDateLimit = () => {
        NewsService.getAllNewsByTagDateLimit(tags, limit).then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const cookies = new Cookies();
    const generateReport = () => {
        NewsService.generateReport(tags, start, end, limit, cookies.get('jwt')).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const [updatableNews, setUpdatableNews] = useState({});
    const getNewsFromNewsCard = (news) => {
        setUpdatableNews(news);
    }

    const onChangeCheckbox = (checkedValues) => {
        console.log('checked = ', checkedValues);

        setTags(checkedValues);
    };
    const plainOptions = [
        {
            label: 'Газ',
            value: 'gas'
        },
        {
            label: 'Вода',
            value: 'water'
        },
        {
            label: 'Мусор',
            value: 'rubbish'
        }
    ];

    const onChangeDate = (date, dateString) => {
        setStart(dateString[0])
        setEnd(dateString[1])
        console.log(dateString);
    };

    const onChangeLimit = (value) => {
        console.log('checked = ', value);
        setLimit(value);
    };

    const registration = (username, password, conf) => {
        NewsService.registration(username, password, conf).then((response) => {
            console.log(response.data);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
            }
        });
        setIsRegModalOpen(false);
    }

    const auth = (username, password) => {
        NewsService.auth(username, password).then((response) => {
            cookies.set('jwt', response.data.token, { path: 'http://localhost:3000/news' });
            document.cookie = 'jwt=' + response.data.token + ';max-age=604800;domain=http://localhost:3000/news';
            console.log(response.data);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
            }
        });
        NewsService.getRoles(username).then((response) => {
            console.log(response.data);
            setRoles(response.data)
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
            }
        });
        console.log(roles);
        setIsAuthModalOpen(false);
    }

    const isAdmin = () => {
        return roles.includes('ROLE_ADMIN');
    }

    const addButtonShow = () => {
        if (isAdmin()) {
            return ( <Button type="default" onClick={showModal}>
                    Добавить новость
                </Button>
            )
        }
    }

    const reportButtonShow = () => {
        if (isAdmin()) {
            return ( <Button type="default" onClick={generateReport} style={{ marginTop: 15 }}>
                    Сгенерировать отчеты
                </Button>
            )
        }
    }

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
                    <InputNumber style={{ marginTop: 10 }} min={1} max={10} onChange={onChangeLimit} />
                    <RangePicker style={{ marginTop: 10 }} onChange={onChangeDate} placeholder={['От', 'До']}/>
                    <Button type="default" onClick={getNewsByTags} style={{ marginTop: 10 }}>
                        Получить новости по тегам
                    </Button>
                    <Button type="default" onClick={getNewsByDateBetween} style={{ marginTop: 10 }}>
                        Получить новости по дате
                    </Button>
                    <Button type="default" onClick={getNewsByTagDateLimit} style={{ marginTop: 10 }}>
                        Получить новости по тегам с лимитом
                    </Button>
                    {reportButtonShow()}
                </Col>
                <Col  style={{ display:'flex', flexDirection:'Column'}} offset={15}> 
                    <div >
                        {addButtonShow()}
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
                            onCansel={handleRegCancel}
                            validMessage={validMassage}
                            registration={registration}
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
                            auth={auth}
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
                    <OkModal
                        isModalOpen={isOkModalOpen}
                        onCansel={handleOkCancel}
                        validMessage={validMassage}
                        text={textMsg}
                    />
                    <NewsCard
                        news={news}
                        deleteNews={deleteNews}
                        showUpdateNewsModal={showUpdateNewsModal}
                        getNewsFromNewsCard={getNewsFromNewsCard}
                        isAdmin={isAdmin}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default News;