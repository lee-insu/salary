import React from 'react';
import style from './footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <nav className={style.session}>
          <nav className={style.nav}>
            <ul className={style.ul}>
                <li className={style.created}>헤이앱 창시자 &nbsp; <img src="/static/img/polygon.svg" alt=""/>
                    <div className={style.tooltip}>
                        <div>우리가 만들었어요!</div>
                        <div><img className={style.icon} src="/static/img/horse.png" alt=""/>개발자 인수<FontAwesomeIcon className={style.arrow} icon={faChevronRight} /></div>
                        <div><img className={style.icon} src="/static/img/bear.png" alt=""/>디자이너 호석<FontAwesomeIcon className={style.arrow} icon={faChevronRight} /></div>
                    </div>
                </li>
                <li>헤이앱은 국내 모바일 앱 화면과 관련 컨텐츠를 제공합니다</li>
                <li>헤이앱 즐겨찾기</li>  
            </ul>
            <div className={style.logo}>salary</div>
           </nav>
        </nav>
    );
};

export default Footer;