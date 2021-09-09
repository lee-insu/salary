import React, { useState } from 'react';
import style from './search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

    const [change, setChange] = useState(true);


    const liChange = (e) => {
            const value = e.target.value;
            
            if(value ==='app') {
                setChange(true);
            }else if(value === 'research') {
                setChange(false);
            }


    }

    

    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>검색</div>
                <div className={style.main_title}>'text'검색 결과</div>
                <div className={style.select_box}>
                    <button onClick={liChange} value='app' className={change ? style.li_active: style.li_unActive}>앱 화면</button>
                    <button onClick={liChange} value='research' className={!change ? style.li_active: style.li_unActive}>집중 탐구</button>
                </div>
            </div>
            {change ? 
            <div className={style.container}>
                <div className={style.explain_box}>
                    <div className={style.search}>‘Text’을(를) 주제로 한 앱 화면</div>
                    
                         <div className={style.app_container}>
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
            </div>

                :

            <div className={style.container}>
                <div className={style.explain_box}>
                    <div className={style.search}>‘Text’을(를) 주제로 한 집중탐구 컨텐츠</div>
                    <ul className={style.article_box}>
                            <li className={style.article_li}>  
                                    <div className={style.article_container}>
                                        <div className={style.art_category}>집중탐구 세상에 UX</div>
                                        <div className={style.art_title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                                        <div className={style.article}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                                            구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                                            독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                                        <div className={style.contain_user}>
                                          <ul className={style.ul}>
                                              <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                                         </ul>
                                          <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                                        </div>
                                    </div>
                            </li>

                            <li className={style.article_li}>  
                                    <div className={style.article_container}>
                                        <div className={style.art_category}>집중탐구 세상에 UX</div>
                                        <div className={style.art_title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                                        <div className={style.article}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                                            구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                                            독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                                        <div className={style.contain_user}>
                                          <ul className={style.ul}>
                                              <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                                         </ul>
                                          <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                                        </div>
                                    </div>
                            </li>

                            <li className={style.article_li}>  
                                    <div className={style.article_container}>
                                        <div className={style.art_category}>집중탐구 세상에 UX</div>
                                        <div className={style.art_title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                                        <div className={style.article}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                                            구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                                            독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                                        <div className={style.contain_user}>
                                          <ul className={style.ul}>
                                              <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                                         </ul>
                                          <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                                        </div>
                                    </div>
                            </li>

                            <li className={style.article_li}>  
                                    <div className={style.article_container}>
                                        <div className={style.art_category}>집중탐구 세상에 UX</div>
                                        <div className={style.art_title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                                        <div className={style.article}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                                            구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                                            독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                                        <div className={style.contain_user}>
                                          <ul className={style.ul}>
                                              <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                                         </ul>
                                          <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                                        </div>
                                    </div>
                            </li>

                            <li className={style.article_li}>  
                                    <div className={style.article_container}>
                                        <div className={style.art_category}>집중탐구 세상에 UX</div>
                                        <div className={style.art_title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                                        <div className={style.article}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                                            구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                                            독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                                        <div className={style.contain_user}>
                                          <ul className={style.ul}>
                                              <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                                         </ul>
                                          <button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button>
                                        </div>
                                    </div>
                            </li>

                        </ul>

                </div>
            </div>
        }
        </div>
    );
};

export default Search;