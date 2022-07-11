import { Breadcrumb } from "antd";

function CustomBreadcrumb(props) {
    let { items } = props;

    return (
        <Breadcrumb separator=">">
            {
                items.map((item, index) => {
                    if(item.href) {
                        return (
                            <Breadcrumb.Item key={index} href={item.href}>
                                { item.title }
                            </Breadcrumb.Item>
                        )
                    } else {
                        return (
                            <Breadcrumb.Item key={index}>
                                { item.title }
                            </Breadcrumb.Item>
                        )
                    }
                })
            }
        </Breadcrumb>
    );
}

export default CustomBreadcrumb;