import React from 'react';
import style from './footer.module.css';

const Footer = () => {
    return (
        <nav className={style.session}>
          <nav className={style.nav}>
            <ul className={style.ul}>
                <li>헤이앱 창시자 &nbsp; <img src="/static/img/polygon.svg" alt=""/></li>
                <li>헤이앱은 국내 모바일 앱 화면과 관련 컨텐츠를 제공합니다</li>
                <li>헤이앱 즐겨찾기</li>  
            </ul>
                <div className={style.logo}>salary</div>
           </nav>
        </nav>
    );
};

export default Footer;