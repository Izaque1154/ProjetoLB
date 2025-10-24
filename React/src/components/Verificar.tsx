import styles from "./css/verificar.module.css"

function Verificar() {
    return(
        <div className={styles.container}>
            <div className={styles.caixa}>
                <h1 className={styles.h1}>Enviamos um email de verificação</h1>
                <h2 className={styles.h2}>Verifique sua caixa de email</h2>
            </div>
        </div>
    )
}

export default Verificar