import React from 'react';
import style from './research_content.module.css';

const ResearchContent = () => {
    return (
        <div className={style.session}>
            <div className={style.header}>
                <div className={style.category}>집중탐구</div>
                <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까? 배민과 쿠팡의 차이 분석</div>
                <div className={style.article_info}>
                    <ul className={style.keyword_ul}>
                        <li className={style.keyword_li}>활성화</li>
                        <li className={style.keyword_li}>활성화</li>
                        <li className={style.keyword_li}>활성화</li>
                    </ul>
                    <div className={style.user_info}>
                        <div className={style.view}><img className={style.icon_view} src="/static/img/whiteview.png" alt="view"/>12345</div>
                        <div className={style.update}>최신 업데이트일 : 2021.xx.xx</div>
                    </div>
                </div>
            </div>

            <div className={style.article_container}>
                <div>content</div>
            </div>

            <div className={style.more}>
                <div className={style.shadow}></div>
                <div className={style.more_text}>
                열심히 작성한 관리자를 위해!<br/>
                아낌없는 후원이 가능하다구욧!
                </div>
                <button className={style.more_btn}>후원하고 더보기</button>
            </div>
        </div>
    );
};

export default ResearchContent;