import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../../service/firebase';
import style from './app_content.module.css';

const AppContent = () => {

    const fireStore = firestore.collection('appKeyword');

    const [active,setActive] = useState(null);
    const [keywords,getKeywords] = useState([]);
    const [contents,getContents] = useState([])
    const [imgs,getImgs] = useState([]);
    const [count,setCount] = useState(3);
    



    useEffect(()=> {
        fireStore.where('active','==',true).onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            getKeywords(array);
            if(active === null) {
                array.map(keyword => {
                    fireStore.doc(keyword.id).collection('appContents').where('active','==',true)
                    .onSnapshot(snapshot => {
                        const array = snapshot.docs.map(doc => ({
                            id:doc.id,
                            ...doc.data()
                        }))
                        getContents(prevState => [...prevState,array])
                        array.map(arr => 
                            firestore.collection('imgs').doc(keyword.id).collection('img')
                            .doc(arr.id).collection('list').where('order','==','1')
                            .onSnapshot(snapshot => {
                                const array = snapshot.docs.map(doc => ({
                                    id:doc.id,
                                    ...doc.data()
                                }))
                                getImgs(prevState => [...prevState,array]);
                            })
                            )
                    })
                })
            }
        })
    },[active])


    const imgsView = id => {
        return imgs.flat().map(img => {
            if(id === `${img.app_name}${img.app_ver}`) {
                return img.imgs.map((img,i) => 
                    <li key={i} className={style.img}>
                    <img className={style.imgs} src={img} alt=""/>
                    </li>
                )
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


    const handleKeyword = e => {
        setActive(e);
        fireStore.doc(e).collection('appContents').limit(3)
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getContents(array)
        })
    }

    const keyword = keywords.map((keyword,i) => 
        <li
        key={i}
        onClick= {()=>handleKeyword(keyword.id)}
        className={active === keyword.id ? style.li_active : style.li_unActive}
        >
        {keyword.id}
        </li>
        )
    

    return (
        <div className={style.session}>
            <div className={style.container}>
                 <nav className={style.nav}>
                     <div className={style.title}>어떤 앱 화면을 찾고 계시나요?</div>
                     <div className={style.sub_title}>간편 키워드 검색을 통해서 앱을 빠르게 찾아보세요!</div>
                     <ul className={style.ul}>
                            <li 
                            className={!active? style.li_active : style.li_unActive}
                            onClick={()=>setActive(null)}
                            >
                            전체
                            </li>
                            {keyword}
                     </ul>
                 </nav>
            </div>
           
           {contents ? content.slice(0,count) : null}

            {content.length > count? 
            <div onClick={()=>{setCount(count + 3)}} className={style.more}>더보기</div>
            :
            <div className = {style.no}>{content.length > 3 ? '불러올 컨텐츠가 없습니다.' : null}</div>
            }
            
        </div>
    );
};

export default AppContent;