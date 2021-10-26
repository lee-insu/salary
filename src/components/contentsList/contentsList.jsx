import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../service/firebase';
import style from './contentsList.module.css';

const ContentsList = () => {

    const params = useParams().id;
    const fireStore = firestore.collection('appKeyword').doc(params).collection('appContents')
    const [contents, getContents] = useState([]);
    const [imgs, getImgs] = useState([])


    useEffect(()=> {
        fireStore.where('active','==',false).onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getContents(array);
            array.forEach(keyword => {
                const key = keyword.id;
                firestore.collection('imgs').doc(params).collection('img')
                .doc(key).collection('list').where('order','==','1')
                .onSnapshot(snapshot => {
                    const array = snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data()
                    }))
                    getImgs(prevState => [...prevState,array])
                })
            })
        })
    },[params])

    const imgsView = id => {
        return imgs.flat().map(img => {
            if(id === `${img.app_name}${img.app_ver}`) {
                return img.imgs.map(img => 
                <li className={style.img}>
                    <img className={style.imgs} src={img} alt=""/>
                </li>)
            }
        })
    }



    const content = contents.map(content => 
         <Link to = {`/onboard/${content.title_app_keyword}/${content.id}`}>
            <div 
            key={content.id}
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

    


    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>{params}</div>
                <div className={style.main_title}>전체보기</div>
                <div className={style.sub_title}>헤이앱의 모든 콘텐츠가 최신순으로 정렬됩니다.</div>
            </div>

            {content}

        </div>
    );
};

export default ContentsList;