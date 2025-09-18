import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useAppDispatch } from './redux/hook';
import { setUserFromStorage } from './redux/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') ?? '';
  const user = localStorage.getItem('user') ?? '';
  if (token && user) {
    dispatch(setUserFromStorage({ token, user: JSON.parse(user) }));
  }
  return (
   <RouterProvider router={router}/>
  )
}

export default App
