import React from 'react';
import style from './app_content.module.css';

const AppContent = () => {
    return (
        <div className={style.session}>
            <div className={style.container}>
                 <nav className={style.nav}>
                     <div className={style.title}>어떤 앱 화면을 찾고 계시나요?</div>
                     <div className={style.sub_title}>간편 키워드 검색을 통해서 앱을 빠르게 찾아보세요!</div>
                     <ul className={style.ul}>
                         <li className={style.li_active}>활성화</li>
                         <li className={style.li_unActive}>비활성화</li>
                         <li className={style.li_unActive}>비활성화</li>
                         <li className={style.li_unActive}>비활성화</li>
                         <li className={style.li_unActive}>비활성화</li>
                         <li className={style.li_unActive}>비활성화</li>
                     </ul>
                 </nav>
            </div>
            <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.name_box}>
                        <div className={style.title}>쿠팡 (coupang)</div>
                        <div className={style.update}>update ver</div>
                    </div>
                    <ul className={style.img_box}>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                    </ul>
                </div>
            </div>
            {/* 경계선 */}
            <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.name_box}>
                        <div className={style.title}>쿠팡 (coupang)</div>
                        <div className={style.update}>update ver</div>
                    </div>
                    <ul className={style.img_box}>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                        <li className={style.img}>223px 482px</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AppContent;