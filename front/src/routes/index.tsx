import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { SingUp,NotFound ,ChatScreen} from '../pages';


export const RoutesApp = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>carregando</div>}>
        <Routes>
          <Route index element={<ChatScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
