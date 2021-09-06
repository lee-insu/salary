import React from 'react';
import style from './header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <nav className={style.nav}>
            <div className={style.logo}>salary</div>
            <ul className={style.ul}>
                <li className={style.li}>
                    <div className={style.list}>앱 화면</div>
                    <FontAwesomeIcon icon={faAngleDown} className={style.icon} />
                </li>
                <li className={style.li}>
                    <div className={style.list2}>집중탐구</div>
                    <FontAwesomeIcon icon={faAngleDown} className={style.icon2} />
                </li>
            </ul>
            <form>
                <input 
                className={style.input}
                type="text"
                placeholder="검색..."

                />
            </form>
            <ul>
                <li className={style.li}>
                    <div className={style.login}>로그인</div>
                </li>
            </ul>
        </nav>
    );
};

export default Header;