import { HTTPTransport } from "../core/httpTransport";
import { APIError } from "./type";
import cat1 from '../assets/01.jpg'
import cat2 from '../assets/02.jpg'
import cat3 from '../assets/03.jpg'

const catsApi = new HTTPTransport('/chats');

const delay = (showError) => new Promise((resolve, reject) => {
    if(showError) {
        setTimeout(() => reject(), 2000)
    } else {
        setTimeout(() => resolve(), 3000)
    }
})

export default class CatsApi {
    async getCats(): Promise<[]> {
        await delay();
        return [
            {
                id: 1,
                name: 'cat 1',
                logo: cat1
            },
            {
                id: 2,
                name: 'cat 2',
                logo: cat2
            },
            {
                id: 3,
                name: 'cat 3',
                logo: cat3
            }
        ]
    }
}