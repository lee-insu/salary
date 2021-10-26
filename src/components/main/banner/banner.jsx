import React, { useEffect, useState } from 'react';
import style from './banner.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { firestore } from '../../../service/firebase';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000
      };

    const [contents,getContents] = useState([]);
    const fireStore = firestore.collection('researchDate');



    useEffect(()=> {
        fireStore.onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            array.forEach(date => {
                fireStore.doc(date.id).collection('research')
                .onSnapshot(snapshot => {
                    const array = snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data()
                    }))
                    getContents(prevState => [...prevState,array]);
                })
            })
        })
    },[])

    const contentsFlat = contents.flat();
    const allContentsArray = [...new Set(contentsFlat.map(JSON.stringify))].map(JSON.parse);
    

        const content = allContentsArray.map(content => 
            <div key={content.id}>
                <div  className={style.container}>
                    <div className={style.content_box}>
                        <div className={style.category}>집중탐구 세상에 UX</div>
                        <div className={style.title}>{content.title}</div>
                        <div className={style.content}>{content.subTitle}</div>
                        <div className={style.container_user}>
                            <ul className={style.ul}>
                                 <li className={style.view}><img className={style.icon_view} src="/static/img/view.png" alt="view"/></li>
                                 <li className={style.view}>{content.views}</li>
                             </ul>
                        <Link to={`/research/${content.year}년 ${content.month}월/${content.id}`}><button className={style.btn}>당장 보러가기 &ensp;<FontAwesomeIcon icon={faChevronRight} /></button></Link>
                        </div>
                    </div>
                    <div className={style.img_box}>
                        <img  className={style.img} src={content.img} alt={content.img}/>
                    </div>
               </div>
            </div>
            )

    return (
        <div className={style.session} >
            <Slider {...settings}>
                  {content}
            </Slider>

           
        </div>
    );
};

export default Banner;

