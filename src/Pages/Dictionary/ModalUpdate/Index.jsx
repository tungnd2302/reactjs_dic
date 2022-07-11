import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Steper from "../../../Components/Steper/Steper";
import { updateDictAPI } from "../../../Redux/dicts/action";
import { DicAPI } from "../../../Utilities/Dictionary/API";
import { stepsUpdate as steps } from "../../../Utilities/Dictionary/steps";
import { typeAPI } from "../../../Utilities/Types/API";

function ModalUpdate({ visible, setVisible,setDics,selectedDic,setLoading }) {
    const { Option } = Select;
    const [currentStep, setCurrentStep] = useState(0);
    const [disableButton, setDisableButton] = useState([true, true, true])
    const [meaningIdDelete,setMeaningIdDelete] = useState([]);
    const [formData, setFormData] = useState(null);
    const [types, getTypes] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            try {
                let resp = await typeAPI.getTypes();
                if (resp.status === 200) {
                    getTypes(resp.data.types)
                }
            } catch (error) {
                console.log("error", error)
            }
        }())
    }, []);

    useEffect(() => {
        setFormData(selectedDic)
    }, [selectedDic]);

    useEffect(() => {
        form.setFieldsValue(selectedDic);
        setDisableButton([false,false,false])
    }, [currentStep]);



    const validationStep = (values, all) => {
        const { word, pronounce } = all
        if (currentStep == 0) {
            if (word && pronounce) {
                setDisableButton([false, true, true])
                setFormData({
                    ...formData,
                    word,
                    pronounce
                })
            } else {
                setDisableButton([true, true, true])
            }
        }

        if (currentStep == 1) {
            let disable = all.meanings?.every(item => item.type && item.type !== "0" && item.meaning && item.sample);
            if (disable) {
                setFormData({
                    ...formData,
                    meanings: all.meanings
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
            setVisible(false);
            // setLoading(true);
            const updateData = {
                ...formData,
                meaningIdDelete: meaningIdDelete,
            }
            dispatch(updateDictAPI(formData._id,updateData))
            // let result = await DicAPI.update(formData._id,updateData);
            // if(result.status === 200) {
            //     setLoading(false)
            //     setDics(result.data.dics)
            // }
        } catch (error) {
            console.log(error)
        }

    }

    const mapTypesValue = (id) => {
        const type = types.find(item => item._id == id);
        return type.name;
    }
    return (
        <Modal
            title="Update vocab"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={null}
        >
            <Form form={form} layout="vertical" onValuesChange={(values, all) => validationStep(values, all)} onFinish={submit}>
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

                {currentStep === 1 && <Form.List name="meanings">
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
                                                remove(name);
                                                if (fields.length == 1) {
                                                    setDisableButton([true, true, true]);
                                                }
                                                setMeaningIdDelete([...meaningIdDelete,formData.meanings[name]._id])
                                                formData.meaning.splice(name,1)
                                                setFormData({
                                                    ...formData,
                                                    meaning: formData.meaning
                                                })
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
                            {currentStep === 2 ? "Update" : "Next"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalUpdate;