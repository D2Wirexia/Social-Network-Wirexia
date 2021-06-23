import React from 'react';
import universal from './Friends.module.css';
import {NavLink} from 'react-router-dom';
import {dialogType} from "../../../types/types";
import cn from 'classnames'

type PropsTypeFriends = {
    dialogData: Array<dialogType>
    idFriend: number
    receiveIdFriend: (id: number) => void
}
type PropsTypeDialog = {
    name: string
    id: number
    photoUrl: string
    idFriend: number
    receiveIdFriend: (id: number) => void
}
const OneDialog: React.FC<PropsTypeDialog> = (props) => {
    return (
        <NavLink to={'/dialogs/' + props.id} className={cn({
            [universal.active]: props.idFriend === props.id
        })}
                 activeClassName={universal.active}>
            <div className={universal.dialog} onClick={() => props.receiveIdFriend(props.id)}>
                <div className={universal.imgFriend}>
                    <img src={props.photoUrl} alt="photoProfile"/>
                </div>

                <div className={universal.nameFriend}>{props.name}</div>

            </div>
        </NavLink>
    );
};

const Friends: React.FC<PropsTypeFriends> = ({dialogData, receiveIdFriend, idFriend}) => {

    let dialogElement = dialogData.map(dialog => {
        return <OneDialog name={dialog.name} id={dialog.id} photoUrl={dialog.photoUrl} key={dialog.id}
                          receiveIdFriend={receiveIdFriend} idFriend={idFriend}/>
    });
    return (
        <div className={universal.mainDialog}>
            <div className={universal.friendsDialog}>
                {dialogElement}
            </div>
        </div>

    );
};

export default Friends;
