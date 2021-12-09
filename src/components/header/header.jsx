import React, { useState } from 'react';
import style from './header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {getSearch} from '../../service/store';
import classnames from 'classnames';
import { firestore } from '../../service/firebase';
import {firebaseAuth} from '../../service/firebase';


const Header = ({state,searchStore,login}) => {

    const history = useHistory();
    const [drop,setDrop] = useState(false);
    const [keywords,getKeywords] =useState([]);

    const onChange = e => {
        const value = e.target.value;
        searchStore(value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
       history.push(`/search/${state.search}`);
    }

    const dropDown = () => {
        if(!drop) {
            setDrop(true);
        }else{
            setDrop(false);
        }
    }

    const logout = () => {
        firebaseAuth.signOut();
        window.location.replace('/');
    }

  
 

    useState(()=> {
        firestore.collection('appKeyword').where('active','==',true).onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id
            }))
            getKeywords(array)
        })
    },[])

    const keyword = keywords.map((keyword,i) => 
        <Link to={`/appcontents/${keyword.id}`}>
        <li key={i} onClick={dropDown} className={classnames(drop ? style.drop_menu_item : style.hidden)}>{keyword.id}</li>
        </Link>
        )

    return (
        <nav className={style.nav}>
            <Link to='/'><div className={style.logo}>heyapp</div></Link>  
            <ul className={style.ul}>
                <li onClick={dropDown} className={classnames(style.li)}>
                    <div  className={style.list}>앱 화면</div>
                    <FontAwesomeIcon icon={faAngleDown} className={style.icon} />
                </li>
                <li className={classnames(drop ? style.drop_down : style.hidden)}>
                    <div className={classnames(drop ? style.drop_menu_box : null)}>
                        <ul className={classnames(drop ? style.drop_menu : null)}>
                           {keyword}
                            
                        </ul>
                    </div>
                </li>
                <li className={style.li}>
                    <Link to='/research'><div className={style.list2}>집중탐구</div></Link>
                </li>
            </ul>
            <form onSubmit={onSubmit}>
                <input 
                className={style.input}
                type="text"
                onChange={onChange}
                placeholder="검색..."

                />
            </form>
            
            <ul>
                {login ? 
                <>
                <li className={style.user}>{state.user.displayName}님</li>
                <li className={classnames(style.logout,style.li)} onClick={logout}>로그아웃</li>
                </>
                :
                <li className={style.li}>
                    <Link to='/login'><div className={style.login}>로그인</div></Link>
                </li>

                }
            </ul>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {state:state}
}


const mapDispatchToProps = (dispatch) => {
    return {
        searchStore:(key) => dispatch(getSearch(key))
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Header);