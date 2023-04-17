import styles from './Step1.module.scss';
import { FC, useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import { Row, Col } from 'antd';
import {RxCalendar} from 'react-icons/rx';
import SelectSex from '@/components/SelectSex/SelectSex';
import Link from 'next/link';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';

const service = new ApiService()

interface IStep1 {
    email: string,
    name: string,
    password: string,
    sex: 'male' | 'female'

    setEmail: (...args: any[]) => any,
    setName: (...args: any[]) => any,
    setPassword: (...args: any[]) => any,
    setSex: (sex: 'male' | 'female') => any
}


const Step1:FC<IStep1> = ({
    name,
    email,
    password,
    sex,
    setEmail,
    setName,
    setPassword,
    setSex
}) => {
    const {token} = useAppSelector(s => s)
    // const [countryList, setCountryList] = useState([])



    // useEffect(() => {
    //     if(token) {
    //         service.getCountries(token).then(res => {
    //             console.log(res)
    //         })
    //     }
    // }, [token])



    return (
        <motion.div 
            initial={{
                y: '20px',
                scale: 0.8,
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1
            }}
            transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>
            <Col span={24}>
                <Row gutter={[30, 30]}>
                    <Col span={24}>
                        <Row gutter={[12,12]}>
                            <Col span={24}>
                                <Input
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    placeholder='Имя'
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    placeholder='E-mail'
                                    type={'email'}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    placeholder='Пароль'
                                    type={'password'}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    placeholder='Город'
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    placeholder='Дата рождения'
                                    beforeIcon={<RxCalendar color='#9B9B9B'/>}
                                    />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <SelectSex
                            onSelect={(e) => setSex(e)}
                            value={sex}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.pr}>
                            Продолжив, Вы принимаете <Link href={'/'} target={'_blank'}>условия пользовательского соглашения и конфидициальности</Link>
                        </div>
                    </Col>
                </Row>
            </Col>
            
        </motion.div>
    )
}

export default Step1;