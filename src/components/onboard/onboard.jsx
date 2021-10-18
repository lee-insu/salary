import React, { useEffect, useState } from 'react';
import style from './onboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { firestore } from '../../service/firebase';
import { connect } from 'react-redux';

const Onboard = ({keyword}) => {

    const params = useParams();
    const fireStore = firestore.collection('appKeyword')
    const [content,getContent] = useState('');
    const [imgs,getImgs] = useState([]);


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


    const imgView = e => {
      return e.map(img => 
            <li className={style.img}>
                <img className={style.img} src={img} alt={img.name}/>
            </li>
            )
    }

    let img;
    if(imgs) {
       const imgsView = imgs.map(img =>  
            <div className={style.container}>  
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
        img = imgsView;
    }



    let contentView;
   if(content) {
       const con = 
       <div className={style.explain_box}>
           <div className={style.category}>{content.title_app_keyword}</div>
            <div className={style.company}>{content.app_name}</div>
            <div className={style.version}>update ver {content.app_ver} v</div>
        </div>;
        contentView = con;
   }

    

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
                    <li className={style.article_li}>  
                            <div className={style.article_box}>
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
                            <div className={style.article_box}>
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
                            <div className={style.article_box}>
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
    );
};


const mapStateToProps = (state) => {
    return {keyword:state}
}

export default connect(mapStateToProps) (Onboard);