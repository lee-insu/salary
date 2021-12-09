import React, { useEffect, useState } from 'react';
import style from './login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { firebaseAuth,firestore } from '../../service/firebase';



const Login = () => {

    const [email,getEmail] = useState('');
    const [password,getPassword] = useState('');
    const [userList,getUserList] = useState([]);


    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} = e;

        if(name === 'email') {
            getEmail(value);
        }else if(name === 'password') {
            getPassword(value);
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            await firebaseAuth.signInWithEmailAndPassword(email,password);
            history.push('/');
        }catch(error) {
            if(error.code === 'auth/user-not-found') {
                alert("유저 정보가 없습니다");
                getEmail("");
                getPassword("");
            }else if(error.code ==='auth/wrong-password') {
                alert('비밀번호가 틀렸습니다');
                getPassword("");
            }
        }
    }

    useEffect(()=> {
        firestore.collection('user').onSnapshot(snapshot => {
            const usermail = snapshot.docs.map(doc => ({
                email:doc.data().email
            }))
            usermail.map(doc => {
                getUserList(prevState => [...prevState,doc.email])
            })
        })
    },[])

    const resetPassword = e => {
         e.preventDefault();
        if(!email) {
            alert('이메일란에 이메일을 적으면 재설정 메일이 발송됩니다.')
        }else {
            if(userList.includes(email)) {
                alert('해당 메일로 재설정 메일을 보냈습니다!')
                firebaseAuth.sendPasswordResetEmail(email)
                getEmail('');
            }else {
                 alert('가입되지 않은 계정입니다.')
            }
        }
         
    }

  

    return (
        <div className={style.session}>
            <div className={style.main_box}>
                <div className={style.category}>헤이앱</div>
                <div className={style.main_title}>로그인</div>
                <div className={style.sub_title}>이메일과 비밀번호를 입력해주세요.</div>
            </div>

            <div className={style.signin_container}>
            <button onClick={resetPassword} className={style.find_user}>비밀번호를 잊어버리셨나요? <FontAwesomeIcon className={style.icon} icon={faChevronRight} /></button>
            <form className={style.signin} onSubmit={onSubmit}>
                <div className={style.id_container}>
                    <div className={style.id_text}>헤이앱 이메일</div>
                    <input className={style.input} 
                    type="text"
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                    />
                </div>
                <div className={style.pw_container}>
                    <div className={style.pw_text}>비밀번호</div>
                    <input className={style.input} 
                    type="password"
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    />
                </div>
                
                <div className={style.submit_btn}>
                <div className={style.signup_btn}><Link to ='/register'>회원가입</Link></div>
                <input className={style.submit} type="submit" value="로그인"/>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;