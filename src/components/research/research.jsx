import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../service/firebase';
import style from './research.module.css';

const Research = () => {

    const fireStore = firestore.collection('researchDate')
    const [date,getDate] = useState([]);
    const [keywords,getKeywords] = useState([]);
 


    useEffect(()=> {
        fireStore.onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            for(let i = 0; i < array.length; i++) {
                const arr = array[i].id;
                getDate(prevState => [...prevState,arr]);;
            }
        })
    },[])
    
    useEffect(()=> {
        date.map(date => {
            fireStore.doc(date).collection('research').onSnapshot(snapshot => {
                const array = snapshot.docs.map(doc =>({
                    id:doc.id,
                    ...doc.data()
                }))
                array.map(keyword => {
                    const keywords = keyword.keywords;
                    getKeywords(prevState => [...prevState,keywords])
                });
            
            })
        })
    },[date])

    const keywordArr = new Set(keywords.flat());
    const newKeyword = [...keywordArr];
  

    const keyword = newKeyword.map(keyword => 
        <li key={keyword.id} className={style.li_unActive}>{keyword}</li>
        )


    const dateArticle = date.map(date => 
        <div key={date} className={style.container}>
        <div className={style.explain_box}>
            <div className={style.name_box}>
                <div className={style.date}>{date}</div>
                <div className={style.sub_explain}>간편 키워드 검색을 통해서 앱을 빠르게 찾아보세요!</div>
            </div>
            <ul className={style.ul}>
                {keyword}
            </ul>
        </div>
        <ul className={style.article_box}>
            <ResearchContents date = {date}/>
        </ul>
    </div>   
    )

    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>집중탐구</div>
                <div className={style.main_title}>전체보기</div>
                <div className={style.sub_title}>헤이앱의 모든 콘텐츠가 최신순으로 정렬됩니다.</div>
            </div>

            {dateArticle}

        </div>
    );
};



export default Research;


const ResearchContents = ({date}) => {

    
    const fireStore = firestore.collection('researchDate');
    const [contents,getContents] = useState([]);

    useEffect(()=> {
        fireStore.doc(date).collection('research').onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getContents(array)
        })
    },[])


   const content = contents.map(content => 
            <Link to ={`/research/${content.year}년 ${content.month}월/${content.id}`}>
            <li className={style.article}>
                <div className={style.img_box}>
                 <img className={style.img} src={content.img}/>
                </div>
               <div className={style.title}>{content.title}</div>
               <div className={style.article_info}>
                    <div className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>{content.views}</div>
                    <div className={style.update}>최신 업데이트일 : {content.year}.{content.month}.{content.date}</div>
               </div>
            </li>
            </Link>
    )

    return (
        <>
            {content}
        </>
    )
}