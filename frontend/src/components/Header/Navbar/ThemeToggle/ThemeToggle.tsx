import { useState } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {

    const [toggle, setToggle] = useState(false);

    const handleLanguageToggle = () => {
        setToggle(!toggle);
    }

    return (
        <div className={styles.wrapper}>
            <input type="checkbox" id={styles["hide_checkbox"]} defaultChecked={toggle} />
            <label htmlFor="hide_checkbox" className={styles.toggle} onClick={handleLanguageToggle}>
                <span className={styles.toggle_button}>
                    <span className={`${styles.crater} ${styles.crater_1}`}></span>
                    <span className={`${styles.crater} ${styles.crater_2}`}></span>
                    <span className={`${styles.crater} ${styles.crater_3}`}></span>
                    <span className={`${styles.crater} ${styles.crater_4}`}></span>
                    <span className={`${styles.crater} ${styles.crater_5}`}></span>
                    <span className={`${styles.crater} ${styles.crater_6}`}></span>
                    <span className={`${styles.crater} ${styles.crater_7}`}></span>
                </span>
                <span className={`${styles.star} ${styles.star_1}`}></span>
                <span className={`${styles.star} ${styles.star_2}`}></span>
                <span className={`${styles.star} ${styles.star_3}`}></span>
                <span className={`${styles.star} ${styles.star_4}`}></span>
                <span className={`${styles.star} ${styles.star_5}`}></span>
                <span className={`${styles.star} ${styles.star_6}`}></span>
                <span className={`${styles.star} ${styles.star_7}`}></span>
                <span className={`${styles.star} ${styles.star_8}`}></span>
            </label>
        </div>
    )
}

export default ThemeToggle;