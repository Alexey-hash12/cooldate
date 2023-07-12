import Echo from "laravel-echo";
import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { Cookies } from "typescript-cookie";
import { IUser } from "@/models/IUser";
import ru from "@/locales/ru";
import { ILocale } from "@/models/ILocale";


export interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null,
    userData: IUser | null,
    isMenuOpen: boolean,
    currentProfileId: number | null,
    currentProfileUuid: string | null

    newMessage: any,
    newMail: any,
    locale: ILocale,

    actionsPricing: any[],


    limit: {
        open?: boolean,
        data?: {
            head?: string,
            text?: string,
            action?: {
                link?: string,
                label?: string
            }
        } | null
    },
    
}


export const globalState: IGlobalState = {
    userId: process?.browser && Cookies.get('cooldate-web-user-id') ? Cookies.get('cooldate-web-user-id') : null,
    token: process?.browser && Cookies.get('cooldate-web-token') ? Cookies.get('cooldate-web-token') : null,
    socketChannel: null,
    userData: null,
    isMenuOpen: false,
    newMessage: null,
    newMail: null,
    currentProfileId: null,
    currentProfileUuid: null,
    locale: ru,
    actionsPricing:[],
    limit: {
        open: false,
    }
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'UPDATE_SOCKET':
            return {
                ...state,
                socketChannel: action.socket
            }
        case 'UPDATE_USER_ID':
            return {
                ...state,
                userId: action.id
            }
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.data
            }
        case 'UPDATE_MENU':
            return {
                ...state,
                isMenuOpen: !state?.isMenuOpen
            }

        case 'UPDATE_NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.data
            }
        case 'UPDATE_NEW_MAIL':
            return {
                ...state,
                newMail: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_ID':
            return {
                ...state,
                currentProfileId: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_UIID':
            return {
                ...state,
                currentProfileUuid: action.data
            }
        case 'UPDATE_LOCALE': {
            return {
                ...state,
                locale: action.data
                
            }
        }
        case 'UPDATE_PRICING':
            return {
                ...state,
                actionsPricing: action.data
            }
        case 'UPDATE_LIMIT':
            return {
                ...state,
                limit: action.data
            }
        default:
            return state;
    }
}

export default reducer;