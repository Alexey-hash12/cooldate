import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from '@/pageModules/footer/FooterPage.module.scss';
import {useAppSelector} from "@/hooks/useTypesRedux";
import {useEffect, useRef} from "react";
import ApiService from "@/service/apiService";
const service = new ApiService()

const SafetyPage = () => {
    const {token, unreadChatCount, userData} = useAppSelector(s => s)
    const spanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        service.getArticle(token , 'security_guides').then(res => {
            if (res) {
                if (spanRef.current) {
                    spanRef.current.innerHTML = res.text_en;
                }
            }
        })
    }, [spanRef.current]);
    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/> */}
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Советы по безопасности</h1>
                    <div className={styles.body} ref={spanRef}>
                    </div>
                </div>
            </MainLayout>
        </Container>
    )
}

export default SafetyPage;