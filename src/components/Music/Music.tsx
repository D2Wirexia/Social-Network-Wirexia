import React from 'react';
import universal from './Music.module.css';

type PropsType = {

}
const Music: React.FC<PropsType> = () => {
	return (
		 <div className={universal.container}>Music</div>
	);
}

export default Music;
