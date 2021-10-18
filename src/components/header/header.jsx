import React from 'react';
import style from './header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <nav className={style.nav}>
            <Link to='/'><div className={style.logo}>salary</div></Link>  
            <ul className={style.ul}>
                <li className={style.li}>
                    <div className={style.list}>앱 화면</div>
                    <FontAwesomeIcon icon={faAngleDown} className={style.icon} />
                </li>
                <li className={style.li}>
                    <Link to='/research'><div className={style.list2}>집중탐구</div></Link>
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
                    <Link to='/login'><div className={style.login}>로그인</div></Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;