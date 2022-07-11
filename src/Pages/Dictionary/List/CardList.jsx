import { Row, Tag } from 'antd';
import CardItem from './CardItem';


function CardList({ dics, mapTypesValue, onUpdate,setVisibleTagModal,setSelectedDic }) {
    return (
        <Row gutter={[20, 20]}>
            { dics.map(item => (   <CardItem  key={item._id} item={item} mapTypesValue={mapTypesValue} onUpdate={onUpdate} setVisibleTagModal={setVisibleTagModal} setSelectedDic={setSelectedDic} /> ) )}
        </Row>
    );
}

export default CardList;