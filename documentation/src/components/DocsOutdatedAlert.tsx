import styles from "./DocsOutdatedAlert.module.css"

export const DocsOutdatedAlert = () => {
    return (
        <div className={styles.alert}>
            <div className={styles.alertContent}>
                <span className={styles.alertIcon}>⚠️</span>
                <div className={styles.alertContainer}>
                    <span className={styles.alertText}>
                        With the offical release of JS scripting by valve, the documentation on{" "}
                        <a href="https://developer.valvesoftware.com/wiki/Counter-Strike_2_Workshop_Tools/Scripting">the developer wiki</a> will be the latest
                        and most up to date.
                    </span>
                    <span className={styles.alertText}>
                        See <a href="https://developer.valvesoftware.com/wiki/Counter-Strike_2_Workshop_Tools/Scripting_API">the developer wiki</a> for the
                        latest API documentation.
                    </span>
                </div>
            </div>
        </div>
    )
}
