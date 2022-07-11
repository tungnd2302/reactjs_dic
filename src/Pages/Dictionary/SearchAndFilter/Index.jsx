import { Card, Row, Space,Input, Col } from 'antd';
import { useEffect, useState } from 'react';
const { Search } = Input;
function SearchAndFilter({ dics, setDics }) {
    const [initDicts,setInitDics] = useState([]);

    useEffect(() => {
    },[])

    const handleSearch = (word) => {
        // setDics([...dics].filter(dic => dic.word.includes(word)))
    }

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            <Card title="Search & Filter" size="default">
                <Row>
                    <Col span={24}>
                        <Search placeholder="input search text" enterButton="Search" size="large" onSearch={handleSearch}/>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
}

export default SearchAndFilter;