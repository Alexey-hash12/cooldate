import {Modal, ModalFuncProps} from 'antd';
import {FC, useState, useEffect} from 'react';
import styles from './LoginModal.module.scss';
import {Row, Col} from 'antd';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';
import ApiService from '@/service/apiService';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { Cookies } from 'typescript-cookie';
import { updateToken, updateUserId } from '@/store/actions';
import Router from 'next/router';
import { useRouter } from 'next/router';


const service = new ApiService()

const LoginModal:FC<ModalFuncProps> = (props) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {onCancel} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })


    const onClose = () => {
        setErrors({
            email: '',
            password: ''
        })
        setEmail('')
        setPassword('')
        onCancel && onCancel()
    }


    const onSubmit = () => {
        setLoad(true)
        service.login({
            email,
            password
        }).then(res => {
            
            console.log(res)
            if(res?.token) {
                Cookies.set('cooldate-web-token', res?.token)
                Cookies.set('cooldate-web-user-id', res?.id)
                dispatch(updateToken(res?.token))
                dispatch(updateUserId(res?.id))

                
                // router.replace('/search')
                window.location.replace('/search')

                setErrors({
                    email: '',
                    password: ''
                })
            } 
            if(res?.error) {
                setErrors(s => {
                    return {
                        ...s,
                        ...res?.error
                    }
                })
            }

        }).finally(() => {
            setLoad(false)
            onClose()
        })
    }


    return (
        <Modal
            {...props}
            width={400}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            title="Войти"
            footer={false}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Input
                        error={errors.email ? true : false}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder='E-mail'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        error={errors.password ? true : false}
                        value={password}
                        type='password'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder='Пароль'
                        />
                </Col>
                <Col span={24}>
                    <div className={styles.ex}>
                        <Link href={'/signup'} className={styles.item}>Регистрация</Link>
                        <span className={styles.item}>Забыли пароль?</span>
                    </div>
                </Col>
                <Col span={24}>
                    <Button
                        onClick={onSubmit}
                        load={load}
                        disabled={!(email && password)}
                        text='Войти'
                        style={{width: '100%'}}
                        />
                </Col>
            </Row>
        </Modal>
    )
}


export default LoginModal