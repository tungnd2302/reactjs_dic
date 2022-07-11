import { Button, Col, Row, Typography } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { useEffect, useRef, useState } from 'react';
import { DicAPI } from '../../../Utilities/Dictionary/API';
import { getWords } from '../../../Utilities/Dictionary/helper';
import { shuffle } from '../../../Utilities/helpers';
import styles from "./practice.module.css";

const { Text } = Typography;
function Practice({ selectedTag,setcurrentState }) {
    const [dics, setDics] = useState([]);
    const [wordSelected, setWordSelected] = useState({});
    const [notify, setNotify] = useState("");
    const [indexWord, setIndexWord] = useState(-1);
    const inputRef = useRef([]);

    
    useEffect(() => {
        async function fetchDic() {
            try {
                let res = await DicAPI.showWordsByTag(selectedTag);
                    if (res.status === 200) {
                        let word = getWords(res.data.words);
                        setDics(shuffle(word));
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchDic();
    }, []);

    useEffect(() => {
        pickRandom();
    }, [dics]);

    const pickRandom = () => {
        if(indexWord < dics.length) {
            setIndexWord(indexWord + 1)
            setWordSelected(dics[indexWord])
        } else {
            setcurrentState("review")
        }
    }

    const handleChange = (pos) => {
        const current = inputRef.current;
        if (current[pos].value) {
            if (pos + 1 < wordSelected?.word?.length) {
                current[pos + 1].focus()
            }
        }else {
            if (pos > 0) {
                current[pos - 1].focus()
            }
        }
    }

    const handleCheck = () => {
        const current = inputRef.current;
        const word = current.map(e => e?.value).join("");
        if(word.toUpperCase() == wordSelected?.word.toUpperCase()) {
            setNotify("");
            current[0].focus();
            pickRandom();
            current.forEach(e => e.value = "");
        }else {
            setNotify("You are not correct, try again")
        }
    }

    const handleDelete = (e, pos) => {
        const current = inputRef.current;
        if (e.keyCode === 8) {
            if (!current[pos].value) {
                current[pos - 1].focus();
            }
        }
    }
    return (
        <Row>
            {notify && <Col span={24} className={styles.box}>
                <Text type="success">{notify}</Text>
            </Col>}

            <Col span={24} className={styles.box}>
                <h2>
                    {wordSelected?.pronounce}
                </h2>

                <p>
                    {wordSelected?.meanings && wordSelected?.meanings[0].meaning}
                </p>
                <div className={styles.box_group}>
                    {
                        wordSelected?.word?.length && wordSelected?.word.split("").map((e, index) => <div key={index}>
                            <input type="text" maxLength="1" onChange={(e) => handleChange(index)} ref={ref => inputRef.current[index] = ref} onKeyDown={(e) => handleDelete(e, index)} />
                        </div>)
                    }
                </div>
            </Col>
            <Col span={24} className={styles.box_submit}>
                <ButtonGroup>
                    <Button type="primary">Clear</Button>
                    <Button type="ghost" onClick={handleCheck}>Check</Button>
                </ButtonGroup>
               {
                   dics.length > 0 && indexWord > 0 &&  <Text style={{ fontWeight: "bold" }}>
                   { indexWord }/ { dics.length }
               </Text>
               }
            </Col>
        </Row>
    );
}

export default Practice;