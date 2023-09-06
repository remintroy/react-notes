import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/Home";
import { Container } from '@mantine/core';
import EditNotePage from './pages/EditNote/EditNote';
import { useGetNotesQuery } from './lib/api/noteApi';
import { useAppDispatch, useAppSelector } from './lib/redux/hooks';
import { useEffect } from 'react';
import { addNodeAllAttach, setNoteLoading, updateMeta } from './lib/redux/slices/noteSlice';

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
  const page = useAppSelector(state => state.note.page)
  const { data, isLoading } = useGetNotesQuery({ page });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newData: any = {};
    data?.docs?.forEach((note: any) => {
      newData[note?.noteid] = note;
    })
    dispatch(addNodeAllAttach(newData));
    dispatch(updateMeta(data));
    dispatch(setNoteLoading(isLoading));
  }, [data, isLoading])

  return (
    <Container p={30}>
      <RouterProvider router={router} />
    </Container>
  )
}

export default App
