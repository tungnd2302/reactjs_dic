import React from 'react';
import { Col, Modal, Row,Tabs } from 'antd';
import { TagFilled } from '@ant-design/icons';
import Information from './Tags/Information';
import Word from './Tags/Word';

const { TabPane } = Tabs;
function ModalView(props) {
    const { visible, setVisible, tag, setTag } = props;
    const onChange = (key) => {
        console.log(key);
      };
    return (
        <Modal
            title={ <h4>
                <TagFilled style={{ marginRight: "10px" }} /> {tag.name}
            </h4>}
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={800}
            footer={null}
            bodyStyle={{ paddingTop: "0px" }}
        >
            <Row>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" onChange={onChange}>
                        <TabPane tab="Information" key="1">
                           <Information item={tag} setItem={setTag}/>
                        </TabPane>
                        <TabPane tab="Word" key="2" >
                            <Word item={tag} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Modal>
    );
}

export default ModalView;

