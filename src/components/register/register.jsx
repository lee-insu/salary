import React, { useState } from 'react';
import style from './register.module.css';
import {firebaseAuth,firestore} from '../../service/firebase'; 
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nick,setNick] = useState('');

    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} =e;

        if(name === 'email') {
            setEmail(value);
        }else if(name === 'password') {
            setPassword(value);
        }else if(name === 'nick') {
            setNick(value);
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            await firebaseAuth.createUserWithEmailAndPassword(email,password).then(result=> {
                result.user.updateProfile({displayName:nick});
                firestore.collection("user").doc(result.user.uid).set({
                    email:email,
                    name: nick
                })
            })
            alert('회원가입이 완료되었습니다!');
            history.push('/')
        }catch(error) {
            if(error.code ==='auth/weak-password') {
                alert('비밀번호는 6자 이상으로 해주세요!')
                setPassword('');
            }else if(error.code === 'auth/invalid-email') {
                alert('이메일 형식이 맞지 않습니다');
                setEmail('');
                setPassword('');
                setNick('');
            }
        }
    }
    



    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>헤이앱</div>
                <div className={style.main_title}>회원가입</div>
                <div className={style.sub_title}>회원 정보를 입력해주세요.</div>
            </div>

            <div className={style.signup_container}>
            <form className={style.signin} onSubmit={onSubmit}>
                <div className={style.id_container}>
                    <div className={style.id_text}>헤이앱 이메일</div>
                    <input className={style.input} 
                    type="text"
                    name='email'
                    onChange={onChange}
                    value={email}
                    required
                    />
                </div>
                <div className={style.pw_container}>
                    <div className={style.pw_text}>비밀번호</div>
                    <input className={style.input} 
                    type="password"
                    name='password'
                    onChange={onChange}
                    value={password}
                    required
                    />
                </div>

                <div className={style.nick_container}>
                    <div className={style.nick_text}>닉네임</div>
                    <input className={style.input} 
                    type="text"
                    name='nick'
                    onChange={onChange}
                    value={nick}
                    required
                    />
                </div>
                
                <div className={style.submit_btn}>
                    <input className={style.submit} type="submit" value="가입하기"/>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Register;