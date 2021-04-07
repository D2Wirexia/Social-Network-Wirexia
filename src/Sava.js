
var a = {
	name: 'Wirexia',
	age: 18,
	friends: ['Misha', 'Oleg', 'Nika', 'Nastya'],
	isOnline: true,
	classroom: {
		teacher: {
			name: 'Dimuch',
			age: 27
		}
	}
};

var b = {...a};

b.name = 'Dima';
b.isOnline = false;
b.friends = [...a.friends];
b.friends.push('Vika');
b.classroom.teacher.name = "Wirexia";


console.group("test:");
console.log(a);
console.log(b);

let arr = ["a", "b", "c", "d", "e", 7];

arr.forEach((iter, i) => {
	console.log(i + " . " + iter);
});

let arrFilter = arr.filter(num => num === 'b');
console.log(arrFilter);

let arrMap = arr.map(n => n+2);
console.log(arrMap);

const arr1 = [1, 2, 3, 4, 5, 15, 2];
let result = arr1.reduce((num, current, index, arr) => num + current, arr1.length);
console.log( result ); // 32 + 6


const arr3 = [ 1, 2, 3, 4, 5 ];
function getSums (arr){
	let mewAr = [];
	mewAr.push(arr.reduce((num, current) => {
		mewAr.push(num);
		return num+current;
	}));
	return mewAr;
};
console.log(getSums(arr3));

/*
Написать функцию, которая эмитирует округление лайков для ютуба. Пример:
26 456 = 26 ТЫС
1 532 - 1,5 ТЫС
2 435 235 = 2,4 М
853 = 853
*/
const funcImitationCountLikes = like => {

};
console.log(funcImitationCountLikes(543)); //543
console.log(funcImitationCountLikes(18460)); //18 ТЫС
console.log(funcImitationCountLikes(7632091)); //7,6 М
console.log(funcImitationCountLikes(1672)); //1,6 ТЫС
console.log(funcImitationCountLikes(10562711)); //10 М
/*
Улучшить функцию до округнеия в большую или меньшую сторону 3го знака слева
console.log(funcImitationCountLikes(543)); //543
console.log(funcImitationCountLikes(13660)); //13,7 ТЫС
console.log(funcImitationCountLikes(1890317)); //1,9 М
console.log(funcImitationCountLikes(1672)); //1,7 ТЫС
console.log(funcImitationCountLikes(10562711)); //10,6 М
 */


/*Написать функцию палидрома, которая возвращает true, если она читаеться одинаково с права на
 лево и слева на право и false, если она такой не явяется*/
const polidrom = word => {
	word = word.toLowerCase();
	for (let i = 0; i < Math.floor(word.length/2); i++) {
		if(word[i] !== word[word.length -1 - i]){
			return false
		}
	}
	return true;
	//return word === word.split("").reverse().join("");
};
console.log(polidrom("avaVa")); //true
console.log(polidrom("avaav")); //false


const testert = "Invalid url format (Contacts->Website)";

const newtqet = testert.split("(")[0] + testert.split("(")[1].split("->")[1].split(")")[0];

console.log(newtqet)