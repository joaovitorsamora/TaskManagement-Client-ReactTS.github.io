import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUsers';
import { TaskForm } from './TaskForm';
import { TaskHeader } from './TaskHeader';
import './css/Task.css';

interface TaskProps {
  openLoginModal: () => void; // função passada do header para abrir o modal
}

const Task = () => {
  const { loggedUser } = useUser();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken || !loggedUser) {
      Swal.fire({
        title: 'Usuário não autenticado!',
        text: 'Você precisa fazer login para criar tarefas.',
        icon: 'warning',
        confirmButtonText: 'Fazer Login',
      }).then((result) => {
        if (result.isConfirmed) {
          // aqui você dispara o modal do login no header
          document.dispatchEvent(new CustomEvent('openLoginModal'));
        }
      });
    }
  }, [authToken, loggedUser]);

  if (!authToken || !loggedUser) {
    return null; // não renderiza TaskForm nem TaskHeader
  }

  return (
    <section className="tarefas">
      <TaskHeader />
      <TaskForm />
    </section>
  );
};

export default Task;
