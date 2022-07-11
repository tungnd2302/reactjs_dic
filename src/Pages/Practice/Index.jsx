import { Col, Row } from 'antd';
import { useState } from 'react';
import CustomBreadcrumb from '../../Components/CustomBreadcrumb/Index';
import PageTitle from '../../Components/PageTitle/Index';
import { Practicebreadcrumb } from '../../Utilities/PageBreadcrumb';
import ChooseTag from './Steps/ChooseTag';
import Practice from './Steps/Practice';
import Review from './Steps/Review';

function PracticePage(props) {
    const [currentState, setcurrentState] = useState("choose-tag");
    const [selectedTag, setSelectedTag] = useState();
    const showComponent = () => {
        if(currentState == "choose-tag") {
            return <ChooseTag setcurrentState ={setcurrentState} setSelectedTag={setSelectedTag} />
        }else if (currentState == "review") {
            return <Review setcurrentState={setcurrentState}/>
        }else {
            return <Practice selectedTag={selectedTag} setcurrentState={setcurrentState} />
        }
    } 


    return (
        <>
            <Row >
                <Col span={24}>
                    <CustomBreadcrumb items={Practicebreadcrumb} />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginTop: "10px" }}>
                    <PageTitle>Practice</PageTitle>
                </Col>
            </Row>
            {
                showComponent()
            }
        </>

    );
}

export default PracticePage;