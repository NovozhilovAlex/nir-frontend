import React from 'react';
import {Button, Card, Tag} from "antd";
import Meta from "antd/es/card/Meta";

const NewsCard = (props) => {
    const newsCards = () => (
        props.news.map((n) => {
            let d = new Date(n.createDate);
            return (
                <Card style={{ marginTop: 20, backgroundColor: "lightgray"}}
                      title={n.header}
                      bordered={false}
                      cover={<img
                          alt="example"
                          src={n.imageUrl}
                      />}
                >
                    {n.body}
                    <Meta style={{ marginTop: 10 }} description={d.toLocaleDateString()} />
                    {n.tags.map((tag) => {
                        return (
                            <Tag style={{ marginTop: 10 }} color="darkblue" key={tag.name}>
                                {tag.name}
                            </Tag>
                        );
                    })}
                    <Button style={{float: "right"}}
                            type="text"
                            danger
                            size="small"
                            onClick={() => props.deleteNews(n.id)}
                    >
                        Удалить
                    </Button>
                    <Button style={{float: "right"}}
                            type="text"
                            size="small"
                            onClick={() => {
                                props.getNewsFromNewsCard(n);
                                props.showUpdateNewsModal();
                            }}
                    >
                        Изменить
                    </Button>
                </Card>
            );
        })
    );

    return (
        newsCards()
    );
};

export default NewsCard;