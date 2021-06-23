/*Profile Reducer*/
export type postType = {
    id: number
    message: string
    like: number
}
export type contactsByProfileType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosByProfileType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsByProfileType
    photos: photosByProfileType
    aboutMe: string
}
/*User Reducer*/
export type usersType = {
    id: number
    name: string
    status: string
    photos: photosByProfileType
    followed: boolean
}
/*News Reducer*/
export type categoryNewsType = {
    img: string
    text: string
    title: string
    link: string,
    date: string
}
/*SideBar Reducer*/
export type topFriendsType = {
    id: number
    name: string
    photoUrl: string
}
/*Settings Reducer*/


/*Dialogs Reducer*/
export type messageDataType = {
    [key: string]: Array<messageType>
}
export type messageType = {
    id: number,
    message: string,
    sender: string
}
export type dialogType = {
    id: number,
    name: string,
    photoUrl: string
}
export type ZeChatType = {
    [key: string]: Array<string>
}