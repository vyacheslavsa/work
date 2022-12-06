import React, {useState} from 'react';
import Modal from "../Modal";
import {useDispatch, useSelector} from "react-redux";
import {dataSearch, getDataCurrentWeather} from "../../../actions/actions";
import ButtonCustom from "../../ButtonCustom";
import CustomSearch from "../../CustomSearch";
import styles from './ModalSelectPositions.module.scss'
import {ReactComponent as IconLocation} from "../../../image/location.svg";

function ModalSelectPositions({onClose, locateCity, showCity, currentCity}) {
    const dispatch = useDispatch();
    const dataResult = useSelector(state => state?.data?.resultSearch);
    const [searchCity, setSearchCity] = useState('');
    const [openDropDownSearch, setOpenDropDownSearch] = useState(false);

    const saveCity = (currenCity) => {
        onClose();
        localStorage.setItem('GEOLOCATIONS', JSON.stringify(currenCity));
        dispatch(getDataCurrentWeather(currenCity.lat, currenCity.lon));
        onClose();
    }

    const getSearchCity = async (e) => {
        if (e.key === 'Enter') {
            await dispatch(dataSearch(searchCity))
            setOpenDropDownSearch(true)
        }
    }

    return (
        <Modal title={'Welcome to your weather app !!!'}>
            <span style={{marginBottom: '20px'}}>Search your city in the search or use the geolocator</span>
            <div style={{display: 'flex'}}>
                <div className={styles.searchContainer}>
                    <CustomSearch
                        height={'50px'}
                        onChange={(e) => setSearchCity(e.target.value)}
                        onKeyDown={(e) => getSearchCity(e)}
                        deleteValue={() => setSearchCity('')}
                        onClose={() => setOpenDropDownSearch(false)}
                        value={searchCity}
                        openCityList={openDropDownSearch}
                        dataResult={dataResult}
                        onCloseDropdown={() => setOpenDropDownSearch(false)}
                        onCloseModal={onClose}
                        clearPosition={'10px'}
                        positionDropdown={'55px'}
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonCustom
                        onClick={locateCity}
                        title='My location'
                        icon={<IconLocation/>}
                    />
                </div>
            </div>
            {showCity &&
                <>
                    <div>Your city: {currentCity[0].name}?</div>
                    <div className={styles.btnBlock}>
                        <ButtonCustom
                            onClick={() => saveCity(currentCity[0])}
                            title='Yes'
                        />
                    </div>
                </>
            }
        </Modal>
    );
}

export default ModalSelectPositions;