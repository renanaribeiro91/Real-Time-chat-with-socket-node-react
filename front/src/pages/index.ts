import { lazy } from 'react';

const SingUp = lazy(() => import("./SingUp"));
const ChatScreen = lazy(() => import("./ChatScreen"));
const NotFound = lazy(() => import("./notFound"));


export { SingUp,NotFound,ChatScreen }
