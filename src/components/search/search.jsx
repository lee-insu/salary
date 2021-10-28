import React, { useEffect, useState } from 'react';
import style from './search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../service/firebase';

const Search = () => {

    const [change, setChange] = useState(true);
    const [contents, getContents] = useState([]);
    const [researches,getResearches] = useState([]);
    const [imgs, getImgs] = useState([]);
    const params = useParams().id;

    const liChange = (e) => {
            const value = e.target.value;
            if(value ==='app') {
                setChange(true);
            }else if(value === 'research') {
                setChange(false)
            }
    }


    useEffect(()=> {
            firestore.collection('appKeyword').where('active','==',true).onSnapshot(snapshot => {
                const array = snapshot.docs.map(doc => ({
                    id:doc.id
                }))
                array.forEach(keyword => {
                    firestore.collection('appKeyword').doc(keyword.id).collection('appContents')
                    .where('active','==',true).where('app_name',">=",params).where("app_name","<=",params + "\uf8ff")
                    .onSnapshot(snapshot => {
                        const array = snapshot.docs.map(doc => ({
                            id:doc.id,
                            ...doc.data()
                        }))
                        getContents(prevState => [...prevState,array])
                        array.map(arr => {
                            firestore.collection('imgs').doc(keyword.id).collection('img')
                            .doc(arr.id).collection('list').where('order','==','1')
                            .onSnapshot(snapshot => {
                                const array = snapshot.docs.map(doc => ({
                                    id:doc.id,
                                    ...doc.data()
                                }))
                                getImgs(prevState => [...prevState,array]);
                            })
                        })
                       
                    })
                })
            })
            //
            firestore.collection('researchDate').onSnapshot(snapshot => {
                const array =snapshot.docs.map(doc => ({
                    id:doc.id
                }))
                array.forEach(arr => {
                    firestore.collection('researchDate').doc(arr.id).collection('research')
                    .where('active','==',true).where('title',">=",params).where("title","<=",params + "\uf8ff")
                    .onSnapshot(snapshot => {
                        const array = snapshot.docs.map(doc => ({
                            id:doc.id,
                            ...doc.data()
                        }))
                        getResearches(prevState => [...prevState,array])
                    })
                })
            })
    },[])

    const imgsView = id => {
        return imgs.flat().map(img => {
            if(id === `${img.app_name}${img.app_ver}`) {
                return img.imgs.map((img,i) => 
                <li key={i} className={style.img}>
                    <img className={style.imgs} src={img} alt=""/>
                </li>)
            }
        })
    }


    const content = contents.flat().map((content,i) => 
                 <Link to = {`/onboard/${content.title_app_keyword}/${content.id}`}>
            <div 
            key={i}
            className={style.container}>
                <div className={style.content_box}>
                    <div className={style.name_box}>
                        <div className={style.title}>{content.app_name}</div>
                        <div className={style.update}>업데이트 버전: {content.app_ver} v</div>
                    </div>
                    <ul className={style.img_box}>
                        {imgsView(content.id)}
                        
                    </ul>
                </div>
            </div>
        </Link>
        )


    const research = researches.flat().map((research,i) => 
        <li key={i} className={style.article_li}>  
            <div className={style.article_container}>
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
            <div className={style.main_box}>
                <div className={style.category}>검색</div>
                <div className={style.main_title}>'{params}'검색 결과</div>
                <div className={style.select_box}>
                    <button onClick={liChange} value='app' className={change ? style.li_active: style.li_unActive}>앱 화면</button>
                    <button onClick={liChange} value='research' className={!change ? style.li_active: style.li_unActive}>집중 탐구</button>
                </div>
            </div>
            {change ? 
            <div className={style.container}>
                <div className={style.explain_box}>
                    <div className={style.search}>‘{params}’을(를) 주제로 한 앱 화면</div>
                        {content}
                </div>
            </div>

                :

            <div className={style.container}>
                <div className={style.explain_box}>
                    <div className={style.search}>‘{params}’을(를) 주제로 한 집중탐구 컨텐츠</div>
                    <ul className={style.article_box}>
                           {research}

                            
                        </ul>

                </div>
            </div>
        }
        </div>
    );
};


const mapStateToProps = (state,props) => {
    return {search:state}
}

export default connect(mapStateToProps,null) (Search);