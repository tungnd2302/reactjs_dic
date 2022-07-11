import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Input, Form, Divider, Button, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Steper from "../../../Components/Steper/Steper";
import { typeAPI } from "../../../Utilities/Types/API";
import { stepsAdd as steps } from "../../../Utilities/Dictionary/steps";
import { DicAPI } from "../../../Utilities/Dictionary/API";
import { useDispatch } from "react-redux";
import { createDictAPI } from "../../../Redux/dicts/action";

function ModalAdd({ visible, setVisible }) {
    const { Option } = Select;
    const [currentStep, setCurrentStep] = useState(0);
    const [disableButton, setDisableButton] = useState([true, true, true])
    const [formData, setFormData] = useState(null);
    const [types, getTypes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            try {
                let abc = await typeAPI.getTypes();
                if (abc.status === 200) {
                    getTypes(abc.data.types)
                }
            } catch (error) {
                console.log("error", error)
            }
        }())
    }, []);

    const validationStep = (values, all) => {
        const { word, pronounce } = all
        if (currentStep == 0) {
            if (word && pronounce) {
                setDisableButton([false, true, true])
                setFormData({ word, pronounce })
            } else {
                setDisableButton([true, true, true])
            }
        }

        if (currentStep == 1) {
            let disable = all.meaning?.every(item => item.type && item.type !== "0" && item.meaning && item.sample);
            if (disable) {
                setFormData({
                    ...formData,
                    meanings: all.meaning
                })
                setDisableButton([true, false, false])
            } else {
                setDisableButton([true, true, true])
            }
        }
    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const submit = async () => {
        try {
            setVisible(false)
            dispatch(createDictAPI(formData));
        } catch (error) {
            console.log(error.response.data.message)
        }

    }

    const mapTypesValue = (id) => {
        const type = types.find(item => item._id == id);
        return type.name;
    }

    return (
        <Modal
            title="Create vocab"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={null}
        >
            <Form layout="vertical" onValuesChange={(values, all) => validationStep(values, all)} onFinish={submit}>
                <Row style={{ marginBottom: "20px" }}>
                    <Col span={16} offset={4}>
                        <Steper steps={steps} current={currentStep} setCurrent={setCurrentStep} />
                    </Col>
                </Row>
                <Divider />

                {currentStep === 0 && <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="word" label="Word">
                            <Input placeholder="Word" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="pronounce" label="Pronounce">
                            <Input placeholder="Pronounce" />
                        </Form.Item>
                    </Col>
                </Row>}

                {currentStep === 1 && <Form.List name="meaning">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={24} key={key}>
                                    <Col span={24}>
                                        <Divider orientation="left">Meaning</Divider>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'type']}
                                            label="type"
                                        >
                                            <Select defaultValue="0">
                                                <Option key={0}> -- Select an option --</Option>
                                                {types.length && types.map(type => <Option key={type._ai} value={type._id}>{type.name}</Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'meaning']}
                                            label="Meaning"
                                            rules={[{
                                                required: true,
                                                message: "Meaning is required"
                                            }]}
                                        >
                                            <Input placeholder="Meaning" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'sample']}
                                            label="Example sentence"
                                            rules={[{
                                                required: true,
                                                message: "Example sentence is required"
                                            }]}
                                        >
                                            <Input placeholder="Example sentence" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                remove(name)
                                                if (fields.length == 1) {
                                                    console.log(fields.length)
                                                    setDisableButton([true, true, true]);
                                                }
                                            }}
                                            block
                                            icon={<MinusCircleOutlined />}
                                            style={{ marginBottom: "20px" }}
                                        >
                                            Delete field
                                        </Button>
                                    </Col>
                                    <Col span={24}>
                                        <Divider />
                                    </Col>

                                </Row>
                            ))}
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                setDisableButton([true, true, true]);
                                                add()
                                            }}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Add field
                                        </Button>
                                    </Form.Item>

                                </Col>
                            </Row>
                        </>
                    )}
                </Form.List>}

                {currentStep === 2 && <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Word">
                            <Input value={formData.word} readOnly={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Pronounce">
                            <Input value={formData.pronounce} readOnly={true} />
                        </Form.Item>
                    </Col>
                    {formData.meanings && formData.meanings.map(form => (
                        <>
                            <Col span={24}>
                                <Divider orientation="left">Meaning</Divider>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Type">
                                    <Input value={mapTypesValue(form.type)} readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Meaning">
                                    <Input value={form.meaning} readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Example sentence">
                                    <Input value={form.sample} readOnly={true} />
                                </Form.Item>
                            </Col>
                        </>
                    ))}
                </Row>}



                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="default">Cancel</Button>
                        <Button type="primary" disabled={disableButton[currentStep]} onClick={nextStep} htmlType={currentStep === 3 ? "submit" : "button"}>
                            {currentStep === 2 ? "Create" : "Next"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalAdd;