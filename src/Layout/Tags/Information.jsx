import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Row, Select, Input, Button, Form, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTagAPI } from '../../Redux/Tags/action';
import { TagAPI } from '../../Utilities/Tags/API';
import styles from './tags.module.css'

const { Option } = Select;
function Information(props) {
    const { item, setItem } = props;
    const [viewMode, setViewMode] = useState(true);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const tags = useSelector(reducer => reducer.tags);

    useEffect(() => {
        form.setFieldsValue(item);
        setViewMode(true)
    }, [item]);

    const submit = async (data) => {
        try {
            if (viewMode) {
                setViewMode(false)
            } else {
                dispatch(updateTagAPI(item._id,data))
                setItem({
                    ...data,
                    _id: item._id
                })
                setViewMode(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (tags.loading) {
        return (
            <Spin />
        )
    }

    return (
        <Form form={form} onFinish={submit}>
            <Row className={styles.item_infor}>
                <Col span={6}>
                    <span>Name</span>
                </Col>
                <Col span={17}>
                    {
                        viewMode ? <span>{item.name}</span> :
                            <Form.Item name="name" style={{ marginBottom: "0px" }}>
                                <Input value={item.name} className={styles.input_update} />
                            </Form.Item>
                    }
                </Col>
            </Row>
            <Row className={styles.item_infor}>
                <Col span={6}>
                    <span>Color</span>
                </Col>
                <Col span={17}>
                    {
                        viewMode ? <span>{item.color}</span> :
                            <Form.Item name="color" style={{ marginBottom: "0px" }}>
                                <Input value={item.color} className={styles.input_update} />
                            </Form.Item>
                    }
                </Col>
            </Row>
            <Row className={styles.item_infor}>
                <Col span={6}>
                    <span>Active</span>
                </Col>
                <Col span={17}>
                    {
                        viewMode ? <span>{item.active === 1 ? 'Active' : 'Inactive'}</span> :
                            <Form.Item name="active" style={{ marginBottom: "0px" }}>
                                <Select bordered={false} className={styles.select_update} dropdownStyle={{ paddingLeft: "0px" }}>
                                    <Option key={1}>Active</Option>
                                    <Option key={0}>Inactive</Option>
                                </Select>
                            </Form.Item>
                    }

                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {
                        viewMode ?
                            <Button htmlType="submit">
                                <EditOutlined /> Edit
                            </Button> :
                            <Button htmlType="submit">
                                <CheckOutlined /> Save
                            </Button>

                    }
                </Col>
            </Row>
        </Form>
    );
}

export default Information;