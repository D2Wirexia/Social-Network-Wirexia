import * as axios from "axios";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '9e627330-9cf7-4c05-8045-cf162f6f5f60'
	}
});

export const dalAPi = {
	//получение списка юзеров
	getUsersAxios(currentPage = 1, pageSize = 10){
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
	},
	//подписка
	follow(id){
		return instance.post(`follow/${id}`)
	},
	//отписка
	unfollow(id){
		return instance.delete(`follow/${id}`)
	},
	//проверка на логин на серваке
	getAuthAxios(){
		return instance.get(`auth/me`).then(response => response.data)
	},
	//получить профиль юзера для отрисовки
	getProfile(userId){
		return instance.get(`profile/` + userId)
	},
	//получить статус своего профиля
	getStatus(userId){
		return instance.get(`profile/status/` + userId)
	},
	//изменить статус своего профиля
	putUpdateStatus(status){
		return instance.put(`profile/status`, {status})
	},
	//залогиниться на серваке через нашу страничку
	postLoginAxios(email, password, rememberMe  = false){
		return instance.post('/auth/login', {email, password, rememberMe})
	},
	//разлогиниться на серваке через нашу страничку
	deleteLoginAxios(){
		return instance.delete('/auth/login')
	},
	//Загрузка новой авки
	putDownloadPhoto(photo){
		const formData = new FormData();
		formData.append("image", photo);
		return instance.put('profile/photo', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	//
	putUpdateProfile(profile){
		return instance.put('profile', profile)
	}
};
