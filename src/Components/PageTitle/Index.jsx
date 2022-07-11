import styles from "./layout.module.css"

function PageTitle({ children }) {
    return (
        <h4 className={styles.pageTitle}>{ children }</h4>
    );
}

export default PageTitle;