import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Menu, Pagination, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { typeAPI } from '../../../Utilities/Types/API';
import CardList from './CardList';
import TableList from './TableList';

const ITEMS_PER_PAGE = 10;

function List(props) {
    const { setVisibleAddModal, setVisibleUpdateModal, initDics, setSelectedDic,modeView, setModeView,setVisibleTagModal } = props;
    const [dics, setDics] = useState([]);
    const [types, setTypes] = useState([]);
    const [current, setCurrent] = useState(1);

    const menu = (
        <Menu
            onClick={({key}) => handleClick(key)}
            defaultValue={modeView}
            items={[
                {
                    label: 'List',
                    key: '0',
                    icon: <UserOutlined />,
                },
                {
                    label: 'Grid',
                    key: '1',
                    icon: <UserOutlined />,
                }
            ]}
        />
    )    
    useEffect(() => {
        async function fetchType() {
            try {
                let result = await typeAPI.getTypes();
                if (result.status === 200) {
                    setTypes(result.data.types)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchType();
    }, []);

    useEffect(() => {
        if(initDics.length) {
            setDics(initDics.slice(0,ITEMS_PER_PAGE))
        }
        setCurrent(1)
    }, [initDics]);

    const handleClick = (item) => {
        setModeView(item)
    }

    const mapTypesValue = (id) => {
        const type = types.find(item => item._id == id);
        return type?.name;
    }

    const onPageChange = (page) => {
        setDics(initDics.slice((page*ITEMS_PER_PAGE) -ITEMS_PER_PAGE ,page*ITEMS_PER_PAGE))
        setCurrent(page);
    };

    const onUpdate = (id) => {
        setVisibleUpdateModal(true);
        const dic = initDics.find(dic => dic._id == id);
        setSelectedDic(dic);
    }

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            <Card>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Button type="primary" icon={<PlusOutlined />} size={16} onClick={() => setVisibleAddModal(true)} >Create</Button>
                        <Dropdown overlay={menu} >
                            <Button>
                                <Space>
                                    { modeView == 0 ? 'List' : 'Grid'}
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={24}>
                        { modeView == 0 ?  <TableList dics={dics} mapTypesValue={mapTypesValue} onUpdate={onUpdate} /> : <CardList dics={dics} mapTypesValue={mapTypesValue} onUpdate={onUpdate} setVisibleTagModal={setVisibleTagModal} setSelectedDic={setSelectedDic}/>  }
                    </Col>
                    {
                        initDics.length > ITEMS_PER_PAGE && (
                            <Col span={24} style={{ marginTop: "20px" }}>
                                <Pagination current={current} onChange={onPageChange} pageSize={ITEMS_PER_PAGE} total={initDics.length} />
                            </Col>
                        )
                    }
                </Row>

            </Card>
        </Space>
    );
}

export default List;