import { Button, Space, Table, Tag } from 'antd';

const Column = { Table }
function TableList({ dics, mapTypesValue, onUpdate }) {
    return (
        <Table dataSource={dics} pagination={false}>
            <Column title="Word" dataIndex="word" key="word" />
            <Column title="Pronounce" dataIndex="pronounce" key="pronounce" />
            <Column
                title="Types"
                dataIndex="meanings"
                key="meanings"
                render={(meanings) => (
                    <>
                        {meanings.map((meaning) => (
                            <Tag color="blue" key={meaning}>
                                {mapTypesValue(meaning.type)}
                            </Tag>
                        ))}
                    </>
                )}
            />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button size="small" type="text" onClick={(_id) => onUpdate(record._id)}>Update</Button>
                    </Space>
                )}
            />
        </Table>
    );
}

export default TableList;