import { Button, Checkbox, Col, Form, Modal, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DicAPI } from '../../../Utilities/Dictionary/API';
import { TagAPI } from '../../../Utilities/Tags/API';
import { getSelectedTags, mapDataToSubmit } from '../../../Utilities/Tags/helper';

function ModalTag(props) {
    const { visible, setVisible,selectedDic } = props;
    const tags = useSelector(reducer => reducer.tags);
    const [fetchTag, setFetchTag] = useState(true);
    const [seletedTags, setSelectedTags] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        async function getSelectedTag() {
            setFetchTag(true)
            try {
                  const res = await TagAPI.showSelectedTag(selectedDic._id)
                  if(res.status === 200) {
                      let wordTags = getSelectedTags(selectedDic._id,res.data?.tagWords)
                      form.setFieldsValue(wordTags);
                      setSelectedTags(wordTags)
                      setFetchTag(false)
                  }
            } catch (error) {
                console.log(error)
            }
        }
        getSelectedTag();
        
    },[selectedDic])

    const submit = async (data) => {
        let payload = mapDataToSubmit(selectedDic._id,seletedTags.tagsId,data.tagsId);
        setFetchTag(true);
        try {
            const res = await DicAPI.addWordToTags(payload);
            if(res.status === 200) {
                setFetchTag(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            title="Add Tag"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={300}
            footer={null}
        >
            {
                (tags.loading || fetchTag) ? <Spin /> : <Form onFinish={submit} form={form}>
                    <Row>
                        <Form.Item name="tagsId">
                            <Checkbox.Group>
                                {
                                    tags.data && tags.data.map(tag => (
                                        <Col span={24} key={tag._id}>
                                            <Checkbox value={tag._id} style={{ lineHeight: '32px' }}>
                                                {tag.name}
                                            </Checkbox>
                                        </Col>
                                    ))
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button htmlType="submit">Update</Button>
                        </Col>
                    </Row>
                </Form>
            }
        </Modal>
    );
}

export default ModalTag;