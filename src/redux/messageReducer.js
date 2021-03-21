import dimuchPhoto from './../img/dimuch.png'
const ADD_MESSAGE = "ADD-MESSAGE";
const ANSWER_ZE = "ANSWER_ZE";
let initialState = {
	messageData: {
		'Vladimir Zelensky': [
			{id: 1, message: 'Доброго дня!', sender: "other"},
			{id: 2, message: 'мои команды: какие, кто, где, сколько, когда', sender: "other"},

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
			{id: 1, message: 'Hi', sender: "other"},
			{id: 2, message: 'Yo, what so?', sender: "other"},
			{id: 3, message: 'Hello, It\'s 🆗!', sender: "me"},
			{id: 4, message: 'Swim the task...', sender: "other"},
			{id: 5, message: 'Обращаем массив вспять. Напишите две функции, reverseArray и reverseArrayInPlace. Первая получает массив как аргумент и выдаёт новый массив, с обратным порядком элементов. Вторая работает как оригинальный метод reverse – она меняет порядок элементов на обратный в том массиве, который был ей передан в качестве аргумента. Не используйте стандартный метод reverse.', sender: "other"},
		],
		'Artem lowSkill': [
			{id: 1, message: 'Здорова', sender: "other"},
			{id: 2, message: 're)', sender: "me"},
			{id: 3, message: 'Есть чирик до понедельника занять?', sender: "other"},
			{id: 4, message: 'На пиво не хватает', sender: "other"},
			{id: 5, message: 'карта - 84534765812124916', sender: "other"},
		]
	},
	dialogData: [
		{
			id: 1, name: 'Vladimir Zelensky', hash: "Ze",
			photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg/248px-Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg',
		},
		{
			id: 2, name: 'Nastenka', hash: "Nastenka",
			photoUrl: 'https://svirtus.cdnvideo.ru/SO9sxAqnAkR1tN1Kg6jXFhWvYMM=/0x0:371x371/800x0/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/d4/d4e61b79893464edf8fac84d5b25bcd6.jpg?m=6abf7ca4aedde894c0fb76aea5a89542',
		},
		{
			id: 3, name: 'Dimuch BigBoss', hash: "DimaBoss",
			photoUrl: dimuchPhoto,
		},
		{
			id: 4, name: 'Artem lowSkill', hash: "Artem",
			photoUrl: 'https://abakan-news.ru/wp-content/uploads/2018/03/-e1520919096875.jpg',
		},
	],
	ZeChat: {
		what: ["Красивые", "Похожи на меня", "Суть вопроса мне ясна, ждите ответа!", "Перспективные",
		"Шлем натер яйца, давайте следующий вопрос..."],
		who: ["Спросите у Петра", "Это все Россия", "Артём Смирнов", "Точно не я!",
			"Клоун на LexXxuse",	"Александр Сергеевич Пушкин", "Ты",
			"Это все нелегалы, титушки и агенты Кремля", "Не знаю, але українці рідніщі понад усе"],
		where: ["Нужно посмотреть в Берлине", "Сзади", "Конечно же дома, под матрасом",
			"Где именно не знаю, но в квартале было хорошо", "Давайте посмотрим вместе"],
		howMuch: ["3 кг гречки", "Точно сказать не могу, но сумма внушает доверие",
			"8 лет строгача", "Разузнаю, потом напишу", "Чучуть", "Пол этажа таможни"],
		when: ["В четверг", "На выходных", "Со следующей недели", "2 дня назад",
			"Во времена правления Петра", "Понедельник точно отпадает, остаеться только пятница"],
	}
};
const messageReducer = (state = initialState, action) => {
	switch (action.type) {

		case ADD_MESSAGE:
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
		case ANSWER_ZE:
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
			}
		default:
			return state;
	}
};
export const addMessage = (text, whomToSend) => {
	return {
		type: ADD_MESSAGE, text, whomToSend
	}
};
export const addAnswerZe = (text) => {
	return {
		type: ANSWER_ZE, text
	}
};
export default messageReducer;