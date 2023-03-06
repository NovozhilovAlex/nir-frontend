import React from 'react';
import {Layout, theme} from 'antd';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./pages/News";

const { Header, Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <BrowserRouter>
            <Layout>
                <Header style={{background: "lightgrey"}}>
                    Header
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <NavBar/>
                    <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                        <Content style={{padding: '0 150px', minHeight: 600}}>

                            <Route path="/news">
                                <News/>
                            </Route>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', background: "grey"}}>
                    Footer
                </Footer>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
