import React from 'react';
import style from './banner.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Banner = () => {
    return (
        <div className={style.session} >
           <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.category}>집중탐구 세상에 UX</div>
                    <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                    <div className={style.content}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                    구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                    독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                <div className={style.container_user}>
                    <ul className={style.ul}>
                         <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                        <li className={style.comment}><img className={style.icon_comment} src="/static/img/comment.png" alt="comment"/>123개</li>
                    </ul>
                    <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
                </div>
                <div className={style.img_box}>img box</div>
           </div>
           
        </div>
    );
};

export default Banner;