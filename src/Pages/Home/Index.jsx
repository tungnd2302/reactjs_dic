import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import CustomBreadcrumb from '../../Components/CustomBreadcrumb/Index';
import PageTitle from '../../Components/PageTitle/Index';

const breadcrumb = [
    {
        title: "Home",
        href: 'dasdas'
    }
]
function HomePage(props) {
    return (
        <>
            <Row >
                <Col span={24}>
                    <CustomBreadcrumb items={breadcrumb} />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginTop: "10px" }}>
                   <PageTitle>Home Page</PageTitle>
                </Col>
            </Row>
        </>

    );
}

export default HomePage;