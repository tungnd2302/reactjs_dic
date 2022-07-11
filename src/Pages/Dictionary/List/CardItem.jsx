import { EditOutlined, TagFilled } from '@ant-design/icons';
import { Col, Tag } from 'antd';
import Card from 'antd/lib/card/Card';
import { useEffect, useState } from 'react';
import styles from "./styles/CardList.module.css";
const { CheckableTag } = Tag;

function CardItem({ item, mapTypesValue, onUpdate,setVisibleTagModal,setSelectedDic }) {
    const [word, setWord] = useState({});

    useEffect(() => {
        let arrayMeanings = item.meanings.map((item, index) => {
            if (index === 0) {
                return {
                    ...item,
                    checked: true
                }
            } else {
                return {
                    ...item,
                    checked: false
                }
            }
        })
        setWord({
            ...item,
            meanings: arrayMeanings
        })
    }, [item]);

    const showMeaning = () => {
        if (word.meanings) {
            const selectedWord = word.meanings.find(item => item.checked);
            return selectedWord.meaning
        }
    }

    const changeType = (id) => {
        let arrayMeanings = item.meanings.map((item, index) => {
            if (item._id == id) {
                return {
                    ...item,
                    checked: true
                }
            } else {
                return {
                    ...item,
                    checked: false
                }
            }
        })
        setWord({
            ...item,
            meanings: arrayMeanings
        })
    }

    const handleTag = () => {
        setSelectedDic(item);
        setVisibleTagModal(true)
    }

    return (
        <Col span={8}>
            <Card className={styles.deep_1} title={word ? word.word : ""} extra={<>
                <a onClick={(_id) => onUpdate(word._id)} style={{ marginRight: "15px" }}><EditOutlined /></a>
                <a onClick={handleTag}><TagFilled /></a>
            </>}>
                {
                    word.meanings ? word.meanings.map(ele => (
                        <CheckableTag checked={ele.checked} key={ele._id} onClick={() => changeType(ele._id)}>
                            {mapTypesValue(ele.type)}
                        </CheckableTag>
                    )) : null
                }
                <p className={styles.meaning}>
                    {
                        showMeaning()
                    }
                </p>
            </Card>
        </Col>
    );
}

export default CardItem;