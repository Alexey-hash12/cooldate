import {Modal, ModalFuncProps} from 'antd';
import {FC, useState, useEffect} from 'react';
import styles from './LoginModal.module.scss';
import {Row, Col} from 'antd';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Link from 'next/link';
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { Cookies } from 'typescript-cookie';
import { updateToken, updateUserId } from '@/store/actions';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import notify from '@/helpers/notify';
import { useWindowSize } from 'usehooks-ts';
import LimitModal from '@/popups/LimitModal/LimitModal';
const service = new ApiService()

const LoginModal:FC<ModalFuncProps> = (props) => {
    const {locale} = useAppSelector(s => s)
    const {width} = useWindowSize() 
    const router = useRouter()
    const [blocked, setBlocked] = useState(false)

    const dispatch = useDispatch()
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
            if(res?.token) {
                Cookies.set('cooldate-web-token', res?.token)
                Cookies.set('cooldate-web-user-id', res?.id)
                dispatch(updateToken(res?.token))
                dispatch(updateUserId(res?.id))
                
                Router.push('/search')
                onClose()

                setErrors({
                    email: '',
                    password: ''
                })
                
            } else {
                if(res?.error === 'BLOCKED') {
                    setBlocked(true)
                } 
                notify('Произошла ошибка', 'ERROR')
            }
            if(res?.error) {
                setErrors(s => {
                    return {
                        ...res?.error
                    }
                })
            }

        }).finally(() => {
            setLoad(false)
            
        })
    }




    return (
        <>
            <LimitModal
                text='Пользователь заблокирован!'
                open={blocked}
                onCancel={() => setBlocked(false)}
                />
            <Modal
            {...props}
            width={400}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            title={locale?.popups?.login?.title}
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
                    {errors?.email && <div className={styles.error}>{errors?.email}</div>}
                </Col>
                <Col span={24}>
                    <Input
                        error={errors.password ? true : false}
                        value={password}
                        type={'password'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder={locale?.popups?.login?.fields?.password}
                        />
                    {errors?.password && <div className={styles.error}>{errors?.password}</div>}
                </Col>
                <Col span={24}>
                    <div className={styles.ex}>
                        <span onClick={() => {
                            onClose()
                            Router.push('/signup')
                        }} className={styles.item}>{locale?.popups?.login?.links.register}</span>
                        <span className={styles.item}>{locale?.popups?.login?.links?.forgot_password}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <Button
                        middle={width <= 768}
                        onClick={onSubmit}
                        load={load}
                        disabled={!(email && password)}
                        text={locale?.popups?.login?.login_btn}
                        style={{width: '100%'}}
                        />
                </Col>
            </Row>
        </Modal>
        </>
        
    )
}


export default LoginModal