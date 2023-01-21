import React from 'react';
import styles from './SideBar.module.scss'
import cs from "classnames";
import {ReactComponent as IconBack} from "../../assets/svg/back.svg";
import {ReactComponent as SettingsIcon} from "../../assets/svg/settings_FILL0_wght300_GRAD200_opsz48.svg";
import {Link} from "react-router-dom";
import {allLanguage} from "../../constans";
import {useSelector} from "react-redux";

const SideBar = ({onClose, state}) => {
    const currentLang = useSelector(state => state?.data?.interfaceLanguage)
    const localStoreWeather = JSON.parse(localStorage.getItem('CURRENT_LANG'));
    const lang = localStoreWeather || currentLang;

    const dataCurrentLanguage = (value) => {
        let result = null;
        for (const key in value) {
            if (lang === key) result = value[key]
        }
        return result;
    }

    return (
        <div className={cs(styles.root, {[styles.openBar]: state})}>
            <div className={styles.header}>
                <div onClick={() => onClose()} className={styles.backBlock}>
                    <IconBack/>
                    <span>{dataCurrentLanguage(allLanguage).sideBar.back}</span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {dataCurrentLanguage(allLanguage).sideBar.menu}
                </div>
            </div>
            <div className={styles.content} onClick={() => onClose()}>
                <Link to='/settings'>
                    <div className={styles.item}>
                        <div className={styles.itemContent}>
                            <SettingsIcon/>
                            <span>{dataCurrentLanguage(allLanguage).sideBar.settings}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideBar;