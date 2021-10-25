import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './app_content.module.css';
import {firestore} from '../../../service/firebase';
import { connect } from 'react-redux';
import {getKeyword} from '../../../service/store';


const AppContent = () => {

    const fireStore = firestore.collection('appKeyword');

    const [activeBtn,setActiveBtn] = useState("");
    const [appKeywords,getAppKeywords] = useState([]);
    const [contents,getContents] = useState([]);
    const [allContents,getAllContents] = useState([]);
    const [allImgs,getAllImgs] = useState([]);
    const [allContentsArr,getAllContentsArr] =useState([]);
    const [allImgsArr,getAllImgsArr] = useState([]);
  
    

    const handleKeyword = e => {
        setActiveBtn(e)
        fireStore.doc(e).collection('appContents').where('active','==',false)
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getContents(array);
        })
    };
    
  
    useEffect(()=> {
        fireStore.where('active','==',true).onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            for(let i = 0; i < array.length; i++) {
                const arr = array[i].id;
                getAppKeywords(prevState => [...prevState,arr]);

            }
        })
    },[])

    useEffect(()=> {
        if(!activeBtn) {
            appKeywords.forEach(keyword => {
                fireStore.doc(keyword).collection('appContents').where('active','==',false)
                .onSnapshot(snapshot => {
                    const array = snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data()
                    }))
                    getAllContents(prevState => [...prevState,array]);
                })
            })
        }
        
    },[appKeywords])

    useEffect(()=> {
        const contentsFlat = allContents.flat();
        const allContentsArray = [...new Set(contentsFlat.map(JSON.stringify))].map(JSON.parse);
        getAllContentsArr(allContentsArray);
    },[allContents])


    useEffect(()=> {
        if(!activeBtn && allContentsArr){
            try{
            allContentsArr.map(content => {
                const id = content.id; 
                appKeywords.forEach(keyword => {
                    firestore.collection('imgs').doc(keyword).collection('img')
                    .doc(id).collection('list').where('order','==','1')
                    .onSnapshot(snapshot => {
                        const array = snapshot.docs.map(doc => ({
                            id:doc.id,
                            ...doc.data()
                        }))
                        getAllImgs(prevState => [...prevState,array])
                    })
                })
            })
           }catch(err) {
            console.log(err)
          }
        }
      
    },[allContentsArr,appKeywords])

    useEffect(()=> {
        const all = allImgs.flat();
        const allimgs = [...new Set(all.map(JSON.stringify))].map(JSON.parse);
        getAllImgsArr(allimgs);
    },[allImgs])

    const imgsView = id => {
       return allImgsArr.map(img=> {
          if(id === `${img.app_name}${img.app_ver}`) {
              return img.imgs.map(img => 
              <li className={style.img}>
                  <img className={style.imgs} src={img} alt=""/>
              </li>)
          }
       })
    }
   
    const allContent = allContentsArr.map(content => 
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


        let content;
        if(contents) {
            const cont = contents.map(content =>
                <Link to = {`/onboard/${content.title_app_keyword}/${content.id}`}>
                     <div 
                      key={content.id}
                      className={style.container}>
                         <div className={style.content_box}>
                               <div className={style.name_box}>
                                   <div className={style.title}>{content.app_name}</div>
                                   <div className={style.update}>업데이트 버전: {content.app_ver}v</div>
                               </div>
                           <ul className={style.img_box}>
                                 {imgsView(content.id)}
                           </ul>
                     </div>
                    </div>
                </Link>    
                )
              content = cont
        }
       



    const keyword = appKeywords.map(keyword => 
        <li
        key={keyword}
        onClick= {()=>handleKeyword(keyword)}
        className={activeBtn === keyword ? style.li_active : style.li_unActive}
        >
        {keyword}
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
                            className={!activeBtn? style.li_active : style.li_unActive}
                            onClick={()=>setActiveBtn("")}
                            >
                            전체
                            </li>
                            {keyword}
                     </ul>
                 </nav>
            </div>



            {!activeBtn ? allContent : content}
  
            <div className={style.more}>더보기</div>
        </div>
    );
};





export default AppContent;