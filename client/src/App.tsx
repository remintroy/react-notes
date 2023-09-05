import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/Home";
import { Container } from '@mantine/core';
import EditNotePage from './pages/EditNote/EditNote';
import { useGetNotesQuery } from './lib/api/noteApi';
import { useAppDispatch } from './lib/redux/hooks';
import { useEffect } from 'react';
import { addNodeAllAttach, setNoteLoading } from './lib/redux/slices/noteSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: '/edit/:id',
    element: <EditNotePage />
  }
])

function App() {
  const { data, isLoading } = useGetNotesQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addNodeAllAttach(data));
    dispatch(setNoteLoading(isLoading))
  }, [data, isLoading])

  return (
    <Container p={30}>
      <RouterProvider router={router} />
    </Container>
  )
}

export default App
