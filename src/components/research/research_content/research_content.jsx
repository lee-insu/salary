import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../service/firebase';
import style from './research_content.module.css';
import firebase from 'firebase/app';

const ResearchContent = () => {

    const params = useParams();
    const date = params.date;
    const docId = params.id;
    const fireStore = firestore.collection('researchDate');
    const [content, getContent] = useState('');
    const [keywords, getKeywords] = useState([]); 

    const increment = firebase.firestore.FieldValue.increment(1);

    useEffect(()=> {
        fireStore.doc(date).collection('research').doc(docId).update({
            views:increment
        })
    },[])

    useEffect(()=> {
       

        fireStore.doc(date).collection('research').doc(docId)
        .get().then(result => {
            const data = result.data();
            getContent(data);
            getKeywords(data.keywords);
        })
    },[])


    const keyword = keywords.map(key => 
         <li key={key.id} className={style.keyword_li}>{key}</li>
        )
   
    
    return (
        <div className={style.session}>
            <div className={style.header} style={{backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ),url(${content.img})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',opacity:'0.8'}}>
                <div className={style.category}>집중탐구</div>
                <div className={style.title}>{content.title}</div>
                <div className={style.article_info}>
                    <ul className={style.keyword_ul}>
                        {keyword}
                    </ul>
                    <div className={style.user_info}>
                        <div className={style.view}><img className={style.icon_view} src="/static/img/whiteview.png" alt="view"/>{content.views}</div>
                        <div className={style.update}>최신 업데이트일 : {content.year}.{content.month}.{content.date}</div>
                    </div>
                </div>
            </div>

            <div className={style.article_container}>
                <div className={style.article} dangerouslySetInnerHTML={{ __html: content.text }}></div>
            </div>

            {/* <div className={style.more}>
                <div className={style.shadow}></div>
                <div className={style.more_text}>
                열심히 작성한 관리자를 위해!<br/>
                아낌없는 후원이 가능하다구욧!
                </div>
                <button className={style.more_btn}>후원하고 더보기</button>
            </div> */}
        </div>
    );
};

export default ResearchContent;