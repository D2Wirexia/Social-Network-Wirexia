import {dialogType, messageDataType, messageType, ZeChatType} from '../types/types';
import dimuchPhoto from './../img/dimuch.png'
import {InferActionsType} from "./redux-store";


let initialState = {
	messageData: {
		'Vladimir Zelensky': [
			{id: 1, message: 'Доброго дня!', sender: "other"},
			{id: 2, message: 'Готовий відповісти на ващі питання!', sender: "other"},
			{id: 3, message: 'мои команды: какие, кто, где, сколько, когда', sender: "other"},
		],
		'Nastenka': [
			{id: 1, message: 'Hi', sender: "other"},
			{id: 2, message: 'Would you like to go for a walk?', sender: "other"},
			{id: 3, message: 'in 20 minutes', sender: "other"},
			{id: 4, message: 'ye, ofc', sender: "me"},
			{id: 5, message: '🕗', sender: "me"},
			{id: 6, message: 'I\'ll wait', sender: "other"},
		],
		'Dima BigBoss': [
			{id: 1, message: 'Коничуа, самурай!)', sender: "other"},
			{id: 2, message: 'Как с собесами дела?', sender: "other"},
			{id: 3, message: 'Летаю😀', sender: "me"},
			{id: 4, message: 'Вот тебе задачка', sender: "other"},
			{id: 5, message: 'Обращаем массив вспять. Напишите две функции, reverseArray и reverseArrayInPlace. Первая получает массив как аргумент и выдаёт новый массив, с обратным порядком элементов. Вторая работает как оригинальный метод reverse – она меняет порядок элементов на обратный в том массиве, который был ей передан в качестве аргумента. Не используйте стандартный метод reverse.', sender: "other"},
		],
		'Artem lowSkill': [
			{id: 1, message: 'Здорова', sender: "other"},
			{id: 2, message: 're)', sender: "me"},
			{id: 3, message: 'Есть чирик до понедельника занять?', sender: "other"},
			{id: 4, message: 'На пиво не хватает', sender: "other"},
		]
	} as messageDataType,
	dialogData: [
		{
			id: 1, name: 'Vladimir Zelensky',
			photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg/248px-Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg',
		},
		{
			id: 2, name: 'Nastenka',
			photoUrl: 'https://svirtus.cdnvideo.ru/SO9sxAqnAkR1tN1Kg6jXFhWvYMM=/0x0:371x371/800x0/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/d4/d4e61b79893464edf8fac84d5b25bcd6.jpg?m=6abf7ca4aedde894c0fb76aea5a89542',
		},
		{
			id: 3, name: 'Dimuch BigBoss',
			photoUrl: dimuchPhoto,
		},
		{
			id: 4, name: 'Artem lowSkill',
			photoUrl: 'https://abakan-news.ru/wp-content/uploads/2018/03/-e1520919096875.jpg',
		},
	] as Array<dialogType>,
	ZeChat: {
		what: ["Красивые", "Похожи на меня", "Суть вопроса мне ясна, ждите ответа!", "Перспективные",
		"Шлем натер яйца, давайте следующий вопрос..."],
		who: ["Спросите у Петра", "Это все Россия", "Точно не я!",
			"Трамп",	"Александр Сергеевич Пушкин", "Ты",
			"Это все нелегалы, титушки и агенты Кремля", "Не знаю, але українці рідніщі понад усе"],
		where: ["Нужно посмотреть в Берлине", "Сзади", "Конечно же дома, под матрасом",
			"Где именно не знаю, но в квартале было хорошо", "Давайте посмотрим вместе"],
		howMuch: ["3 кг гречки", "Точно сказать не могу, но сумма внушает доверие",
			"8 лет строгача", "Разузнаю, потом напишу", "Чучуть", "Пол этажа таможни"],
		when: ["В четверг", "На выходных", "Со следующей недели", "2 дня назад",
			"Во времена правления Петра", "Понедельник точно отпадает, остаеться только пятница"],
	} as ZeChatType
};

export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const messageReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case 'message/ADD-MESSAGE':
			return {
				...state,
				messageData: {
					...state.messageData,
					[action.whomToSend]: [...state.messageData[action.whomToSend],
					{
						id: state.messageData[action.whomToSend].length + 1,
						message: action.text,
						sender: "me"
					}]
				}
			};
		case 'message/ANSWER_ZE':
			return {
				...state,
				messageData: {
					...state.messageData,
					'Vladimir Zelensky': [...state.messageData['Vladimir Zelensky'],
						{
							id: state.messageData['Vladimir Zelensky'].length + 1,
							message: action.text,
							sender: "other"
						}]
				}
			};
		default:
			return state;
	}
};
export const actions = {
	addMessage: (text: string, whomToSend: string) => ({type: 'message/ADD-MESSAGE', text, whomToSend} as const),
	addAnswerZe: (text: string) => ({type: 'message/ANSWER_ZE', text} as const)
}

export default messageReducer;