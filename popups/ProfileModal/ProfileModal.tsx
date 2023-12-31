import { IUser } from '@/models/IUser';
import styles from './ProfileModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC, useEffect, useState, useRef} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { Swiper as SwiperWrap, SwiperSlide } from 'swiper/react';
import Swiper , {Thumbs, Navigation} from 'swiper';
import Skeleton from './components/Skeleton/Skeleton';
import { updateCurrentProfileId, updateCurrentProfileUiid } from '@/store/actions';
import Image from 'next/image';
import ApiService from '@/service/apiService';
import UserTitle from '@/components/UserTitle/UserTitle';
import UserLocation from '@/components/UserLocation/UserLocation';
import Textarea from '@/components/Textarea/Textarea';
import Button from '@/components/Button/Button';
import Router, { useRouter } from 'next/router';
import placeholder from '@/public/assets/images/avatar-placeholder.png'
import Avatar from '@/components/Avatar/Avatar';
import { BsCamera } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { FaRegSmileWink } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import notify from '@/helpers/notify';
const service = new ApiService()


const ProfileModal:FC<ModalFuncProps> = (props) => {
    const {query} = useRouter()
    const {currentProfileId, token, locale, currentProfileUuid} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {onCancel} = props
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [load, setLoad] = useState(true)
    const [data, setData] = useState<IUser | null>(null)

    const {
        profile_photo, 
        name,
        age,
        country,
        state,
        about_self,
        id,
        avatar_url_thumbnail,
        user_avatar_url,
    } = data || {}

    const onClose = () => {
        onCancel && onCancel()
        dispatch(updateCurrentProfileUiid(null))
    }


    


    useEffect(() => {
        if(currentProfileId && token) {
            setLoad(true)
            service.getProfile({user_id: currentProfileId}, token).then(res => {
                console.log(res)
                if(res) {
                    setData(res)
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }, [currentProfileId, token])


    const onLike = () => {
        if(token) {
            service.feedItemLike({id: Number(id)}, token).then(res => {
                console.log(res)
                if(res?.status === 200) {
                    notify('Вы поставили лайк', 'SUCCESS')
                } else {
                    notify('Вы уже поставили лайк данному пользователю', 'ERROR')
                }
            })
        }
        
    }

    const onFavorite = () => {  
        if(token) {
            service.addUserToFav({user_id: Number(id)}, token).then(res => {
                console.log(res)
                if(res?.status === 200) {
                    notify('Вы добавили в избранное', 'SUCCESS')
                } else {
                    notify('Вы уже добавили данного пользователя в избранные', 'ERROR')
                }
            })
        }
    }




    const onWink = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                console.log(res)
                if(res?.chat_id) {
                    service.sendWink({user_id: id}, token).then(r => {
                        if(r?.error) {
                            notify('Вы уже подмигнули', 'ERROR')
                        } else {
                            Router.push(`/chat/${res?.chat_id}?type=chat`)
                        }
                        // условие
                        
                    })
                }
            })
        }
    }



    return (
        <Modal
            {...props}
            width={800}
            footer={false}
            onCancel={onClose}
            className={`modal purp ${styles.wrapper}`}
            >
            {
                !load ? (    
                    <div className={styles.in}>
                        {
                            (profile_photo && profile_photo?.length > 0) && (
                                <div className={styles.main}>
                                    {
                                        thumbsSwiper && (
                                            <div className={styles.slider}>
                                                <div className={styles.photo_count}><BsCamera/>{profile_photo?.length}</div>
                                                <SwiperWrap
                                                    modules={[Thumbs]}
                                                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                                    className={styles.slider_body}
                                                    spaceBetween={10}
                                                    >
                                                    {
                                                        (profile_photo && profile_photo?.length > 0) ? profile_photo?.map(i => (
                                                            <SwiperSlide className={styles.slider_item} key={i.id}>
                                                                <Image
                                                                    width={300}
                                                                    height={300}
                                                                    src={i.image_url}
                                                                    alt=''
                                                                    loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                    />
                                                            </SwiperSlide>
                                                        )) : (
                                                            <SwiperSlide className={styles.slider_item}>
                                                                <Image
                                                                    width={300}
                                                                    height={300}
                                                                    src={placeholder}
                                                                    alt=''
                                                                    loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                    />
                                                            </SwiperSlide>
                                                        )
                                                    }
                                                </SwiperWrap>
                                            </div>
                                        ) 
                                    }
                                    {
                                        profile_photo && profile_photo?.length > 1 ? (
                                            <div className={styles.thumbs}>
                                                <SwiperWrap
                                                    modules={[Thumbs, Navigation]}
                                                    className={styles.thumbs_body}
                                                    navigation={{
                                                        prevEl: '.profile-modal-nav-prev',
                                                        nextEl: '.profile-modal-nav-next'
                                                    }}
                                                    slidesPerView={3}
                                                    watchSlidesProgress
                                                    onSwiper={setThumbsSwiper}
                                                    spaceBetween={10}
                                                    >
                                                    {
                                                        profile_photo?.map(i => (
                                                            <SwiperSlide className={styles.thumbs_item} key={i.id}>
                                                                <Image
                                                                    src={i.image_url}
                                                                    alt=''
                                                                    width={70}
                                                                    height={70}
                                                                    loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                    />
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                    
                                                </SwiperWrap>
                                                <div className={`profile-modal-nav-prev ${styles.nav} ${styles.prev}`}>
                                                    <FiChevronLeft/>
                                                </div>
                                                <div className={`profile-modal-nav-next ${styles.nav} ${styles.next}`}>
                                                    <FiChevronRight/>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    
                                </div>
                            )
                        }
                        
                        <div className={styles.body}>
                            <div className={styles.body_action}>
                                <button onClick={onLike} className={styles.item}>
                                    <div className={styles.icon}>
                                        <FiHeart/>
                                    </div>
                                    <div className={styles.text}>{locale?.global?.user_action?.like}</div>
                                </button>
                                <button onClick={onWink} className={styles.item}>
                                    <div className={styles.icon}>
                                        <FaRegSmileWink/>
                                    </div>
                                    <div className={styles.text}>{locale?.global?.user_action?.wink}</div>
                                </button>
                                <button onClick={onFavorite} className={styles.item}>
                                    <div className={styles.icon}>
                                        <AiOutlineStar/>
                                    </div>
                                    <div className={styles.text}>{locale?.global?.user_action?.fav}</div>
                                </button>
                            </div>
                            <div className={styles.body_main}>
                                <Row gutter={[15,15]}>
                                    
                                    <Col span={24}>
                                        <div className={styles.user}>
                                            <Avatar
                                                image={avatar_url_thumbnail || user_avatar_url}
                                                style={{marginRight: 15}}
                                                />
                                            <UserTitle
                                                isOnline
                                                username={name}
                                                age={age ? age.toString() : ''}
                                                style={{fontSize: 20}}
                                                />
                                        </div>
                                        
                                    </Col>
                                    <Col span={24}>
                                        <UserLocation
                                            state={state}
                                            country={country}
                                            />
                                    </Col>
                                    {
                                        about_self ? (
                                            <Col span={24}>
                                                <div className={styles.part}>
                                                    <div className={styles.label}>О себе</div>
                                                    <div className={styles.value}>{about_self}</div>
                                                </div>
                                            </Col>
                                        ) : null
                                    }
                                    <Col span={24}>
                                        <div className={styles.action}>
                                            <Button onClick={() => {
                                                onClose()
                                                Router.push({
                                                    pathname: `/users/[id]`,
                                                    query: {id: id, currentProfileUuid: currentProfileUuid}
                                                })
                                            }} middle text='Открыть профиль'/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                ) : <Skeleton/> 
            }
            
        </Modal>
    )
}

export default ProfileModal;