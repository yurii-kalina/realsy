import { configureStore } from '@reduxjs/toolkit'
import adReducer from './ad/slice'
import configurationReducer from './configuration/slice'
import locationReducer from './location/slice'
import userReducer from './user/slice'
import submissionReducer from './submission/slice'
import propertyReducer from './property/slice'
import websocketReducer from './websocket/slice'
import propositionReducer from './propositions/slice'
import chatReducer from './chat/slice'
import favoritesReducer from './favorite/slice'
import socketMiddleware from './middleware/socketMiddleware'

export default configureStore({
  reducer: {
    ad: adReducer,
    configurations: configurationReducer,
    location: locationReducer,
    user: userReducer,
    property: propertyReducer,
    websocket: websocketReducer,
    submission: submissionReducer,
    propositions: propositionReducer,
    chat: chatReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware)
})
