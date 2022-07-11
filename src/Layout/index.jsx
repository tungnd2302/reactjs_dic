import { BookOutlined, CheckSquareOutlined, TableOutlined, TagFilled } from '@ant-design/icons';
import { Layout as AntdLayout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import {
    Link
} from "react-router-dom";
import AppRoutes from '../AppRoutes';
import ModalUpdate from '../Pages/Dictionary/ModalUpdate/Index';
import { TagAPI } from '../Utilities/Tags/API';
import styles from "./layout.module.css";
import ModalAdd from './ModalAdd';
import ModalView from './ModalView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTagsAPI } from '../Redux/Tags/action';

const { Header, Footer, Sider, Content } = AntdLayout;

function Layout() {
    // const [tags, setTags] = useState([]);
    const [visibleModalAdd, setVisibleModalAdd] = useState(false);
    const [visibleModalView, setVisibleModalView] = useState(false);
    const [tagSelected, setTagSelected] = useState(null);
    const dispatch = useDispatch();
    const tags = useSelector(reducer => reducer.tags);
    useEffect(() => {
        dispatch(fetchTagsAPI())
    }, []);


    const onTagSelected = async (tag) => {
        setTagSelected(tag);
        setVisibleModalView(true)
    }
    return (
        <AntdLayout>
            <Header style={{ backgroundColor: "#5733FF" }}>
                <div className="logo">
                    <h4 style={{ color: "#fff" }}>Dictionary</h4>
                </div>
            </Header>
            <AntdLayout style={{ backgroundColor: "#fff" }}>
                <Sider className="ant-layout-sider-light" >
                    <div className={styles.logo}><b>Hello</b> </div>
                    <Menu mode="inline" >
                        <Menu.Item key="home">
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key="submenu"
                            title={
                                <>
                                    <BookOutlined />
                                    <span>Dictionary</span>
                                </>
                            }
                        >
                            <Menu.Item key="dictionary">
                                <Link to="/dictionary">
                                <TableOutlined /> List
                                </Link>

                            </Menu.Item>
                            <Menu.Item key="practice">
                                <Link to="/practice">
                                <CheckSquareOutlined /> Pratice
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu
                                key="tag-menu"
                                title={
                                    <>
                                        <TagFilled />
                                        <span>Tag</span>
                                    </>
                                }
                            >   
                            { tags.data.length > 0 && tags.data.map( tag => (
                                <Menu.Item key={ tag._id } className={styles.task_item} onClick={() => onTagSelected(tag)}>
                                      <span>
                                      { tag.name }
                                      </span>
                                </Menu.Item>
                            ))}
                                <Menu.Item key="create-tag" className={styles.button_create_tag} onClick={() => setVisibleModalAdd(true)}>
                                    Create a tag
                                </Menu.Item>
                            </Menu.SubMenu>
                            
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ padding: "20px 40px" }}>
                    <AppRoutes />
                </Content>
            </AntdLayout>
            <ModalAdd visible={visibleModalAdd} setVisible={setVisibleModalAdd} />
            { tagSelected && <ModalView visible={visibleModalView} setVisible={setVisibleModalView} setTag={setTagSelected} tag={tagSelected}/>}
            
        </AntdLayout>
    );
}

export default Layout;