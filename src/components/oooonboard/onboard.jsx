import React, { useEffect, useState } from 'react';
import style from './onboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../service/firebase';
import { connect } from 'react-redux';

const Onboard = ({keyword}) => {

    const params = useParams();
    const fireStore = firestore.collection('appKeyword')
    const [content,getContent] = useState('');
    const [imgs,getImgs] = useState([]);
    const [research,getResearch] = useState([]);


    useEffect(()=> {
        if(keyword) {
            keyword.map(async(key) => {
                const keyword = await Object.values(key).[0];
                fireStore.doc(keyword).collection('appContents').doc(params.id)
                .get().then(result => {
                    const data = result.data();
                    getContent(data);
                })
                    
                firestore.collection('imgs').doc(keyword).collection('img').doc(params.id)
                .collection('list').orderBy('order').onSnapshot(snapshot => {
                    const array = snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data()
                    }))
                    getImgs(array);
                })
            })
        }
    },[])  




    useEffect(()=> {
        if(content){
            const research = content.research_keyword;
            research.map(research => {
                firestore.collection('researchKeyword').where('keywords','array-contains',research)
                .onSnapshot(snapshot => {
                const array = snapshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data()
                }))
                getResearch(array);
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

    let img;
    if(imgs) {
       const imgsView = imgs.map(img =>  
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
        return img = imgsView;
    }



    let contentView;
   if(content) {
       const con = 
       <div key={content.id} className={style.explain_box}>
           <div className={style.category}>{content.title_app_keyword}</div>
            <div className={style.company}>{content.app_name}</div>
            <div className={style.version}>update ver {content.app_ver} v</div>
        </div>;
        return contentView = con;
   }

   const researchViews = research.map(research => 
        <li className={style.article_li}>  
            <div className={style.article_box}>
                  <div className={style.art_category}>집중탐구 세상에 UX</div>
                  <div className={style.art_title}>{research.title}</div>
                  {/* <div className={style.article} dangerouslySetInnerHTML={{ __html: research.text }}></div> */}
                  <div className={style.article}>{research.subTitle}</div>
                <div className={style.contain_user}>
                <ul className={style.ul}>
                     <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/>{research.views}</li>
                </ul>
                 <Link to={`/research/${research.id}`}><button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button></Link>
                </div>
           </div>
        </li>
    
    )

    

    return (
        <div className={style.session}>
            {contentView}
            {img}
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


const mapStateToProps = (state) => {
    return {keyword:state}
}

export default connect(mapStateToProps) (Onboard);