import { Col, Form, Modal, Row, Input, Button, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch } from "react-redux";
import { createTagAPI } from "../Redux/Tags/action";
import { TagAPI } from "../Utilities/Tags/API";

function ModalAdd(props) {
    const { visible, setVisible, updateTags } = props;
    const dispatch = useDispatch();

    const submit = async (data) => {
            setVisible(false)
            data.active = 1;
            dispatch(createTagAPI(data))
    }

    return (
        <Modal
            title="Create tag"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={400}
            footer={null}
        >
            <Form layout="vertical" onFinish={submit}>
                <Row gutter={[12, 0]}>
                    <Col span={24}>
                        <Form.Item name="name" label="Tag">
                            <Input placeholder="Tag" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="color" label="Color">
                            <Input placeholder="Color" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="active" label="Activate">
                            <Select defaultValue="1">
                                <Option key={1}>Active</Option>
                                <Option key={0}>Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" style={{ marginRight: "5px" }} htmlType="submit">
                            Create
                        </Button>
                        <Button onClick={() => setVisible(false)}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalAdd;