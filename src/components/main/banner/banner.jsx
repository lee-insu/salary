import React, { useEffect, useState } from 'react';
import style from './banner.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { firestore } from '../../../service/firebase';

const Banner = () => {


    const [contents,getContents] = useState([])
    const fireStore = firestore.collection('researchKeyword');

    useEffect(()=> {
        fireStore.where('active','==',true)
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getContents(array)
        })
    },[])
    
    //content 일정 영역 넘어가면 ... 변환 => 코인앵무새 보드뷰 참고,
    //슬라이드 
    const content = contents.map(content => 
            <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.category}>집중탐구 세상에 UX</div>
                    <div className={style.title}>{content.title}</div>
                    <div className={style.content}>{content.subTitle}</div>
                <div className={style.container_user}>
                    <ul className={style.ul}>
                         <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>{content.views}</li>
                    </ul>
                    <Link to={`/research/${content.id}`}><button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button></Link>
                </div>
                </div>
                <div className={style.img_box}>
                    <img  className={style.img_box} src={content.img} alt={content.img}/>
                </div>
           </div>
        )
    

    return (
        <div className={style.session} >
            {content}
           {/* <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.category}>집중탐구 세상에 UX</div>
                    <div className={style.title}>쿠팡은 어떻게 쿠팡이츠 유입을 가능하게 했을까?</div>
                    <div className={style.content}>쿠팡은 커머스 서비스와 이외 서비스를 명확하게 
                    구분 짓는 모습을 보이는데요. 로켓 프레시나 C.애비뉴와 같은 전문관들은 별도로 
                    독립시키기 보다는 쿠팡은 카카오톡과 직접 시너지가 나는 일부 서비스를 제외하고...</div>
                <div className={style.container_user}>
                    <ul className={style.ul}>
                         <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>12345</li>
                    </ul>
                    <Link to='/research/:id'><button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button></Link>
                </div>
                </div>
                <div className={style.img_box}>img box</div>
           </div> */}
           
        </div>
    );
};

export default Banner;