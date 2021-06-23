import axios from "axios";
import {photosByProfileType, profileType, usersType} from "../../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '9e627330-9cf7-4c05-8045-cf162f6f5f60'
    }
});
type ApiResponseType<D = {}> = {
    data: D
    resultCode: ResultCodeEnum
    messages: Array<string>
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeDateType = {
    id: number
    email: string
    login: string
}
type LoginType = {
    userId: number
}



type GetUsersType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}
type DownloadPhotoType = {
    photos: photosByProfileType
}
type GetCaptchaURL = {
    url: string
}
export const dalAPi = {
    //получение списка юзеров
    getUsersAxios(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    //подписка
    follow(id: number) {
        return instance.post<ApiResponseType>(`follow/${id}`).then(response => response.data)
    },
    //отписка
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data) as Promise<ApiResponseType>
    },
    //проверка на логин на серваке
    getAuthAxios() {
        return instance.get<ApiResponseType<MeDateType>>(`auth/me`).then(response => response.data)
    },
    //получить профиль юзера для отрисовки
    getProfile(userId: number | null) {
        return instance.get<profileType>(`profile/` + userId).then(response => response.data)
    },
    //получить статус своего профиля
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    //изменить статус своего профиля
    putUpdateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, {status}).then(response => response.data)
    },
    //залогиниться на серваке через нашу страничку
    postLoginAxios(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<LoginType>>('/auth/login', {email, password, rememberMe, captcha}).then(response => response.data)
    },
    //разлогиниться на серваке через нашу страничку
    deleteLoginAxios() {
        return instance.delete<ApiResponseType>('/auth/login').then(response => response.data)
    },
    //Загрузка новой авки
    putDownloadPhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<ApiResponseType<DownloadPhotoType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    //получить обновленный профайл
    putUpdateProfile(profile: profileType) {
        return instance.put<ApiResponseType>('profile', profile).then(response => response.data)
    },
    //получить капчу
    getCaptcha() {
        return instance.get<GetCaptchaURL>('security/get-captcha-url').then(response => response.data)
    }
};
