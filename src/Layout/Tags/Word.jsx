import React, { useEffect, useState } from 'react';
import { Button, Col, AutoComplete, Row, Spin, Typography } from 'antd';
import styles from "./tags.module.css"
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DicAPI } from '../../Utilities/Dictionary/API';
import { getWords } from '../../Utilities/Dictionary/helper';
import { useSelector } from 'react-redux';

const { Text } = Typography;
const { Option } = AutoComplete;

function Word(props) {
    const { item } = props;
    const [words, setWords] = useState([]);
    const [wordId, setWordId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const dicts = useSelector(reducer => reducer.dicts)

    async function fetchWordsData() {
        setLoading(true)
        const tagId = item._id;
        let res = await DicAPI.showWordsByTag(tagId);
        if (res.status === 200) {
            let word = getWords(res.data.words);
            setWords(word)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWordsData();
        return () => setWords([])
    }, [item]);

    const handleSearch = (value) => {
        let words = dicts.data.filter(item => item.word.includes(value))
        setResult(words);
    };

    const handleAddToTag = async () => {
        let dicSelected = dicts.data.find(dic => dic.word == wordId);
        let payload = {
            wordId: dicSelected._id,
            oldTagsId: [],
            newTagsId: [item._id]
        }
        try {
            let res = await DicAPI.addWordToTags(payload);
            if (res.status == 200) {
                fetchWordsData();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveFromTag = async (word_id) => {
        let payload = {
            wordId: word_id,
            oldTagsId: [item._id],
            newTagsId: []
        }
        try {
            let res = await DicAPI.addWordToTags(payload);
            if (res.status == 200) {
                fetchWordsData();
            }

        } catch (error) {
            console.log(error)
        }   
    }


    if (loading) {
        return (
            <Spin />
        )
    }

    return (
        <Row gutter={[12, 12]}>
            {
                words.length > 0 && words.map(item => (
                    <Col span={8} >
                        <div className={styles.box_item}>
                            <Text>{item.word}</Text>
                            <Button className={styles.button_delete_item} onClick={() => handleRemoveFromTag(item._id)}>
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </Col>
                ))
            }

            <Col span={8} >
                <div className={styles.box_item}>
                    <AutoComplete className={styles.add_new_word} onSearch={handleSearch} onSelect={(word) => setWordId(word)}>
                        {result.map((item) => (
                            <Option key={item._id} value={item.word}>
                                {item.word}
                            </Option>
                        ))}
                    </AutoComplete>
                    <Button className={styles.button_delete_item} onClick={handleAddToTag}>
                        <PlusOutlined />
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

export default Word;