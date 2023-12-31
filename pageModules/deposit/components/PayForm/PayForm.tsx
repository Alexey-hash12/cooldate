import { useState } from 'react';
import styles from './PayForm.module.scss';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';

const switchRedirect = (planId: number | string) => {
    if(planId == '1') {
        return `${window.location.origin}/pay_success_credit1`
    }
    if(planId == '2') {
        return `${window.location.origin}/pay_success_credit2`
    }
    if(planId == '3') { 
        return `${window.location.origin}/pay_success_credit3`
    }
    if(planId == '4') {
        return `${window.location.origin}/pay_success_credit4`
    }
    if(planId == '5') {
        return `${window.location.origin}/pay_success_credit5`
    }
}

const PayForm = ({plan}: {plan?: any}) => {
    const [payLoad, setPayLoad] = useState<boolean>(false)
    const [message, setMessage] = useState<any>(null)
    const {locale} = useAppSelector(s => s)
    const stripe = useStripe()
    const elements = useElements()


    const onPay = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }

        setPayLoad(true)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: switchRedirect(plan?.id),
            },
            redirect: "if_required" 
        })
        const {payment_intent} = error || {}

        if(error) {
            setMessage(error)
        } else if(payment_intent && payment_intent?.status === 'succeeded') {
            setMessage("Payment status: " + payment_intent?.status + "")
        } else {
            setMessage('Unexpected state')
        }

        setPayLoad(false)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.title}>
                {locale?.depositPage?.form?.title}
                </div>
                <div className={styles.subtitle}>
                {locale?.depositPage?.form?.subtitle}
                </div>
            </div>
            <form id='payment-form' onSubmit={onPay}>
                <Row gutter={[15,15]}>
                    <Col span={24}>
                        <PaymentElement/>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            text={`${locale?.depositPage?.form?.btn} ${plan?.price}$`}
                            load={payLoad}
                            />
                    </Col>
                </Row>
            </form>
        </div>
    )
}


export default PayForm;