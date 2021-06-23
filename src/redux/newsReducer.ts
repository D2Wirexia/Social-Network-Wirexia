import wGameImg from './../img/wGame.png'
import {categoryNewsType} from "../types/types";
import {InferActionsType} from "./redux-store";

let initialState = {
	category: [
		{
			img: wGameImg,
			text: "Теперь пользователи могут по полной насладиться приятной и душевной атмосферой" +
				 " игры в кругу друзей и близких.",
			title: "Завершилась разработка нового приложения W.GAME",
			link: "https://d2wirexia.github.io/WirexGame/",
			date: "Вчера, 17:34"
		},
		{
			img: "https://i.pinimg.com/originals/2d/3a/fb/2d3afb16e52b219d862c349766601c7f.jpg",
			text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
			title: "Любая другая новость...",
			link: "",
			date: "3 дня назад"
		},
		{
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg/248px-Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg",
			text: "Дорогие украинцы!\n" +
				 "\n" +
				 "После моей победы на выборах мой шестилетний сын сказал:\n" +
				 "\n" +
				 "«Па! По телевизору говорят, что Зеленский – Президент...\n" +
				 "\n" +
				 "Получается, что я тоже Президент?!»\n" +
				 "\n" +
				 "И тогда это прозвучало как шутка, но потом я понял, что на самом деле это истина.\n" +
				 "\n" +
				 "Потому что каждый из нас Президент.\n" +
				 "\n" +
				 "Не 73 процента, которые за меня голосовали, а все 100 процентов украинцев.\n" +
				 "\n" +
				 "Это не моя, это наша общая победа.\n" +
				 "\n" +
				 "И это – наш общий шанс. За который мы несем общую ответственность.\n" +
				 "\n" +
				 "И сейчас не только я принял присягу. Каждый из нас положил руку на Конституцию и каждый из нас дал присягу на верность Украине.\n" +
				 "\n" +
				 "Представьте себе громкие заголовки: «Президент не платит налоги», «Президент навеселе промчался на красный свет», «Президент потихоньку ворует, потому что «все же так делают».\n" +
				 "\n" +
				 "Вы согласны, что это позор?\n" +
				 "\n" +
				 "Вот что я имею в виду, когда говорю, что каждый из нас – Президент.",
			title: "Один из ваших знакомых стал презедентом",
			link: "",
			date: "20.05.2019"
		}
	] as Array<categoryNewsType>
};
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const newsReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {

		default:
			return state;
	}
};
const actions = {

}
export default newsReducer;