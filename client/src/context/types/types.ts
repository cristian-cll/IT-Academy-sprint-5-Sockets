export const types = {

    usersLoaded: '[Chat] Usuarios cargados',
    activateChat: '[Chat] Activar Chat',
    newMessage: '[Chat] Nuevo Mensaje',
    loadMessages: '[Chat] Cargar Mensajes',
    closeSession: '[Chat] Cerrar sesión',
    channelCreated: '[Chat] Canal creado',
    channelsList: '[Chat] Cargar Canales',
    channelMessage: '[Chat]  Nuevo Mensaje Canal',
}


export type State = {

    uid: string,
    activeChat: string | null, // UID del usuario al que yo quiero enviar mensajes
    users: [], // Todos los usuarios de la base datos
    messages: [],
    channels: []
}

export const initialState: State = {
    uid: '',
    activeChat: null, // UID del usuario al que yo quiero enviar mensajes
    users: [], // Todos los usuarios de la base datos
    messages: [], // El chat seleccionado
    channels: []
}



