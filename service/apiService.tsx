import endpoints from "./endpoints";
import { IToken } from "@/models/IToken";





const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

//'Authorization': `Bearer ${token}`

class ApiService {


    register = async (
        body: {
            name: string,
            email: string,
            password: string
        }
    ) => {
        try {
            let res = await fetch(endpoints.register, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    login = async (body: {
        email: string,
        password: string
    }) => {

        try {
            let res = await fetch(endpoints.login, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    search = async ({
        page,
        isNew,
        isNear,
        isOnline,
        state,
        country,
        age_range_start,
        age_range_end,
        prompt_target_id,
        prompt_finance_state_id
    }: {
        page: number,
        isNew: 1 | 0,
        isOnline: 1 | 0,
        isNear: 1 | 0,
        state?: string,
        country?: string,
        age_range_start?: number,
        age_range_end?: number,
        prompt_target_id?: number | string,
        prompt_finance_state_id?: number | string,
    }, token: IToken
        
    ) => {
        try {
            let res = await fetch(endpoints.search + 
                `?page=${page}&state=${state ? state : ''}&country=${country ? country : ''}&age_range_start=${age_range_start}&age_range_end=${age_range_end}&prompt_target_id=${prompt_target_id ? prompt_target_id : ''}&prompt_finance_state_id=${prompt_finance_state_id ? prompt_finance_state_id : ''}&new=${isNew}&near=${isNear}&online=${isOnline}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getPromptTargets = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptTargets, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getPromptFinanceState = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptFinanceState, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getCountries = async () => {
        try {
            let res = await fetch(endpoints.getCountries, {
                method: 'GET',
                headers,
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getStates = async (country_id: number) => {
        try {
            let res = await fetch(endpoints.getStates + `?country_id=${country_id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getFeed = async ({
        page
    }: {
        page?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.feeds + `?page=${page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    feedItemLike = async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setLike, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    feedItemSkip = async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setSkip, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    //открытие чата
    
    createChat = async ({user_id}: {
        user_id?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.createChat + `?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getChatList = async ({page, per_page = 10}: 
        {
            page?: number, 
            per_page?: number
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatList + `?page=${page}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    sendMessage_text = async (body: {
        chat_id: number,
        text: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_text, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMessage_sticker = async (body: {
        chat_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_sticker, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMessage_gift = async (body: {
        chat_id: string,
        gifts: string //string: [1,2,3]
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_gift, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getChat = async ({id, page, per_page = 10}: 
        {
            id: number,
            page: number,
            per_page?: number
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChat + `?page=${page}&chat_id=${id}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getStickers = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getStickers, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getGifts = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getGifts, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    readMessage = async (body: {
        chat_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMessage, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }



    //mail
    createMail = async ({id}:{id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.createMail + `?user_id=${id}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getMailList = async ({per_page}:{per_page?: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMailList + `?per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    sendMail_text = async (body: {
        letter_id: number,
        text: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_text, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMail_sricker = async (body: {
        letter_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_sticker, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMail_gift = async (body: {
        letter_id: string,
        gifts: string //string: [1,2,3]
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_gift, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getMail = async ({id, per_page}:{id: number, per_page?: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMail + `?letter_id=${id}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    readMail = async (body: {
        letter_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMail, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
    

    sendWink = async ({user_id}:{user_id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendWink, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({user_id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

}


export default ApiService;