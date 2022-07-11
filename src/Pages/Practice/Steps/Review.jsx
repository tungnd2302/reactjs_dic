import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import styles from './practice.module.css'

const { Text } = Typography
function Review({ setcurrentState}) {
    return (
        <Row>
            <Col span={24} className={styles.box_submit}>
                <Text style={{ fontWeight: "bold" }}>
                   Congratulation!! You pass
                </Text>
                <Button onClick={() => setcurrentState("choose-tag")}>
                    Try again
                </Button>
            </Col>
        </Row>
    );
}

export default Review;