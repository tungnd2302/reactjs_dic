import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row ,Spin,Typography} from 'antd';
import styles from "./practice.module.css"
import { useSelector } from 'react-redux';
import { LoginOutlined } from '@ant-design/icons';

const { Text } = Typography
function ChooseTag({ setcurrentState,setSelectedTag }) {
    const tags = useSelector(item => item.tags);

    const handleNextStep = (id) => {
        setSelectedTag(id)
        setcurrentState("practice")
    }

    if(tags.loading) {
        return <Spin />
    }

    return (
        <Row gutter={[12,12]}>
            {
                tags.data.map(tag => (
                    <Col span={8} key={tag._id}>
                    <div className={styles.box_item}>
                        <Text>{tag.name}</Text> 
                        <Button onClick={() => handleNextStep(tag._id)}>
                            <LoginOutlined />
                        </Button>
                    </div>
                </Col>
                ))
            }
           
        </Row>
    );
}

export default ChooseTag;