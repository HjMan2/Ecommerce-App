import styles from './notFound.module.css'

function NotFound() {
    return (
        <div className={styles.not_found}>
            <div className={styles.img}></div>
            <p className={styles.error_message}>صفحه مورد نظر پیدا نشد</p>
        </div>
    )
}

export { NotFound }