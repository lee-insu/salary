import React from 'react';
import style from './login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>헤이앱</div>
                <div className={style.main_title}>로그인</div>
                <div className={style.sub_title}>아이디와 비밀번호를 입력해주세요.</div>
            </div>

            <div className={style.signin_container}>
            <button className={style.find_user}>아이디/비밀번호 찾기 <FontAwesomeIcon className={style.icon} icon={faChevronRight} /></button>
            <form className={style.signin}>
                <div className={style.id_container}>
                    <div className={style.id_text}>헤이앱 아이디</div>
                    <input className={style.id_input} type="text"/>
                </div>
                <div className={style.pw_container}>
                    <div className={style.pw_text}>비밀번호</div>
                    <input className={style.pw_input} type="password"/>
                </div>
                
                <div className={style.submit_btn}>
                    <div className={style.signup_btn}>회원가입</div>
                    <input className={style.submit} type="submit" value="로그인"/>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;