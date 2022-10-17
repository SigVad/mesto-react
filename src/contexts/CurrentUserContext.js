//В компонент App внедрён контекст через CurrentUserContext.Provider
//Компоненты Main и Card подписаны на контекст CurrentUserContext .
import React from 'react';

export const CurrentUserContext = React.createContext();
export const CardsContext  = React.createContext();
