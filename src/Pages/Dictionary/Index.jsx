import { Col, Modal, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadcrumb from '../../Components/CustomBreadcrumb/Index';
import PageTitle from '../../Components/PageTitle/Index';
import { fetchDictsAPI } from '../../Redux/dicts/action';
import { DicAPI } from '../../Utilities/Dictionary/API';
import { Dictionarybreadcrumb } from '../../Utilities/PageBreadcrumb';
import List from './List/Index';
import ModalAdd from './ModalAdd/Index';
import ModalTag from './ModalTag/Index';
import ModalUpdate from './ModalUpdate/Index';
import SearchAndFilter from './SearchAndFilter/Index';

function DictionaryPage(props) {
    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
    const [visibleTagModal, setVisibleTagModal] = useState(false);
    const [modeView, setModeView] = useState(1);
    const [selectedDic, setSelectedDic] = useState({});
    const dicts = useSelector(reducer => reducer.dicts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDictsAPI());
    }, []);

    return (
        <>
            <Row >
                <Col span={24}>
                    <CustomBreadcrumb items={Dictionarybreadcrumb} />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginTop: "10px" }}>
                    <PageTitle>Dictionary</PageTitle>
                </Col>
            </Row>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <SearchAndFilter/>
                </Col>
                {
                    dicts.loading ?
                        <Col span={24} style={{ textAlign: "center" }}><Spin /></Col>
                        :
                        <Col>
                            <List
                                setVisibleAddModal={setVisibleAddModal}
                                setVisibleUpdateModal={setVisibleUpdateModal} 
                                setVisibleTagModal={setVisibleTagModal} 
                                initDics={dicts.data}
                                setSelectedDic={setSelectedDic}
                                modeView={modeView}
                                setModeView={setModeView}
                            />
                        </Col>
                }
            </Row>
            {visibleAddModal && <ModalAdd visible={visibleAddModal} setVisible={setVisibleAddModal} />}
            {visibleUpdateModal && <ModalUpdate visible={visibleUpdateModal} setVisible={setVisibleUpdateModal} selectedDic={selectedDic}  />}
            {visibleTagModal && <ModalTag visible={visibleTagModal} setVisible={setVisibleTagModal} selectedDic={selectedDic} />}
        </>

    );
}

export default DictionaryPage;