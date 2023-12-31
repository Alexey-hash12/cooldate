import styles from './ChatSide.module.scss';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import {FiSearch} from 'react-icons/fi';
import ChatList from '../ChatList/ChatList';
import { IDialogs } from '../../types';
import {FC} from 'react';




const ChatSide:FC<IDialogs> = ({
    dialogsList,
    activeDialogId,
    updateDialogsPage,
    updateDialogsList,
    totalDialogItemCount,
    filter
}) => {

    return (
        <div className={styles.wrapper}>
            <ChatList
                filter={filter}
                totalDialogItemCount={totalDialogItemCount}
                updateDialogsPage={updateDialogsPage}
                updateDialogsList={updateDialogsList}
                dialogsList={dialogsList}
                activeDialogId={activeDialogId}
                />
        </div>
    )
}

export default ChatSide;