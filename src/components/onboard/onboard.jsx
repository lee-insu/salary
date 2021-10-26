import React, { useEffect, useState } from 'react';
import style from './onboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../service/firebase';


const Onboard = () => {

    const params = useParams();
    const fireStore = firestore.collection('appKeyword')
    const [content,getContent] = useState('');
    const [imgs,getImgs] = useState([]);
    const [research,getResearch] = useState([]);


    useEffect(()=> {
        fireStore.doc(params.author).collection('appContents').doc(params.id)
        .get().then(result => {
            const data = result.data();
            getContent(data);
        })

        firestore.collection('imgs').doc(params.author).collection('img').doc(params.id)
        .collection('list').orderBy('order').onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getImgs(array);
        })
    },[])


    useEffect(()=> {
       if(content) {
        const research = content.research_keyword;
        firestore.collection('researchDate').onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            array.forEach(date=> {
               research.map(research => {
                firestore.collection('researchDate').doc(date.id).collection('research').where('keywords','array-contains',research)
                .onSnapshot(snapshot => {
                    const array = snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data()
                    }))
                    getResearch(prevState => [...prevState,array]);
                })
               })
            })
        })
       }
    },[content])



    const imgView = e => {
        return e.map(img => 
            <li key={img.id} className={style.img}>
                <img className={style.imgs} src={img} alt={img.name}/>
            </li>
            )
    }


    const imgArray = imgs.slice(1,).map(img => 
        <div key={img.id} className={style.container}>  
            <div className={style.content_box}>
              <div className={style.name_box}>
                     <div className={style.title}>{img.sub}</div>
                </div>
            <ul className={style.img_box}>
                {imgView(img.imgs)}
            </ul>
        </div>
    </div>
        )

    console.log(research.length);

    const researchViews = research.flat().map(research => 
        <li className={style.article_li}>  
            <div className={style.article_box}>
                  <div className={style.art_category}>집중탐구 세상에 UX</div>
                  <div className={style.art_title}>{research.title}</div>
                  <div className={style.article}>{research.subTitle}</div>
                <div className={style.contain_user}>
                <ul className={style.ul}>
                     <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>{research.views}</li>
                </ul>
                 <Link to={`/research/${research.year}년 ${research.month}월/${research.id}`}><button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button></Link>
                </div>
           </div>
        </li>

    )

    return (
        <div className={style.session}>
            <div className={style.explain_box}>
                <div className={style.category}>{content.title_app_keyword}</div>
                <div className={style.company}>{content.app_name}</div>
                <div className={style.version}>update ver {content.app_ver} v</div>
            </div>

            {imgArray}
    
           
         
            <div className={style.container}>
                <div className={style.content_box}>
                    <div className={style.name_box}>
                        <div className={style.title}>집중탐구</div>
                    </div>
                </div>  
                <ul className={style.article_container}>
                {researchViews}
                </ul>
            </div>



        </div>
    );
};



export default Onboard;

