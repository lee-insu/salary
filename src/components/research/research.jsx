import React from 'react';
import { Link } from 'react-router-dom';
import style from './research.module.css';

const Research = () => {
    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>집중탐구</div>
                <div className={style.main_title}>전체보기</div>
                <div className={style.sub_title}>헤이앱의 모든 콘텐츠가 최신순으로 정렬됩니다.</div>
            </div>

            <div className={style.container}>
                <div className={style.explain_box}>
                    <div className={style.name_box}>
                        <div className={style.date}>2021년 XX월</div>
                        <div className={style.sub_explain}>간편 키워드 검색을 통해서 앱을 빠르게 찾아보세요!</div>
                    </div>
                    <ul className={style.ul}>
                        <li className={style.li_active}>활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                    </ul>
                </div>
                <ul className={style.article_box}>
                    <Link to ='/research/content'>
                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일 : 2021.xx.xx</div>
                       </div>
                    </li>
                    </Link>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>
                </ul>

                <div className={style.explain_box}>
                    <div className={style.name_box}>
                        <div className={style.date}>2021년 XX월</div>
                        <div className={style.sub_explain}>간편 키워드 검색을 통해서 앱을 빠르게 찾아보세요!</div>
                    </div>
                    <ul className={style.ul}>
                        <li className={style.li_active}>활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                        <li className={style.li_unActive}>비활성화</li>
                    </ul>
                </div>
                <ul className={style.article_box}>
                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>

                    <li className={style.article}>
                       <div className={style.img}>img</div>
                       <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                       <div className={style.article_info}>
                            <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</div>
                            <div className={style.update}>최신 업데이트일:2021.xx.xx</div>
                       </div>
                    </li>
                </ul>

                {/* 한묶음 */}
            </div>


        </div>
    );
};

export default Research;