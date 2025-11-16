import React from 'react';
import type { TaskListProps } from '../../hooks/useList';
import './Modal.css';

interface ModalProps {
  showModal: boolean;
  tarefaSelecionada: TaskListProps;
  handleEditTask: (
    id: number,
    updateTask: Partial<TaskListProps>
  ) => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTarefaSelecionada: React.Dispatch<
    React.SetStateAction<TaskListProps | undefined>
  >;
}

export const Modal = ({
  showModal,
  setShowModal,
  tarefaSelecionada,
  handleEditTask,
  setTarefaSelecionada,
}: ModalProps) => {
  return (
    <>
      {showModal && tarefaSelecionada && (
        <div className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (tarefaSelecionada.id !== undefined) {
                handleEditTask(tarefaSelecionada.id, tarefaSelecionada);
                setShowModal(false);
              }
            }}
          >
            <input
              type="text"
              placeholder="Título"
              value={tarefaSelecionada.titulo || ''}
              onChange={(e) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  titulo: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Data de criação"
              value={tarefaSelecionada.dataCriacao || ''}
              onChange={(e) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  dataCriacao: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Prioridade"
              value={tarefaSelecionada.prioridadeTarefa || ''}
              onChange={(e) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  prioridadeTarefa: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tags (separadas por vírgula)"
              value={tarefaSelecionada.tags?.join(', ') || ''}
              onChange={(e) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                })
              }
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </>
  );
};
