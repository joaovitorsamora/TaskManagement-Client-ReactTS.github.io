import { useState } from 'react';
import './TaskList.css';
import ReactPaginate from 'react-paginate';
import { useList, type TaskListProps } from '../../hooks/useList';
import { Modal } from './Modal';
import { useFilter } from '../../components/index';
import { useUser } from '../../hooks/useUsers';

type PriorityProps = 'Todas' | 'Alta' | 'Media' | 'Baixa';
type StatusProps = 'Aberta' | 'Concluida';

const PriorityMap: Record<string, PriorityProps> = {
  '1': 'Todas',
  '2': 'Alta',
  '3': 'Media',
  '4': 'Baixa',
};

const StatusMap: Record<string, StatusProps> = {
  '1': 'Aberta',
  '2': 'Concluida',
};

const TaskList = () => {
  const [showModal, setShowModal] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<
    TaskListProps | undefined
  >();
  const [currentPage, setCurrentPage] = useState(0);
  const token = localStorage.getItem('authToken');
  const { setLista, error, loading, pageCount, postPerPage, tarefasApi } =
    useList();

  const { selectedPriority, selectedStatus, searchItemValue } = useFilter();
  const { loggedUser } = useUser();

  const filteredTask = searchItemValue.filter((task: TaskListProps) => {
    const filterPriority =
      selectedPriority === 'Todas' ||
      PriorityMap[task.prioridadeTarefa] === selectedPriority;
    const filterStatus =
      selectedStatus === 'Aberta' || StatusMap[task.status] === selectedStatus;

    return filterStatus && filterPriority;
  });

  if (!loggedUser) {
    return null;
  }

  const handleDeleteTask = async (id: number) => {
    if (!token) return alert('Token inválido!');

    const confirmacao = confirm('Tem certeza que deseja excluir essa tarefa?');
    if (!confirmacao) return;

    try {
      const response = await fetch(`${tarefasApi}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erro ao deletar tarefa');
      setLista((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir tarefa');
    }
  };

  const handleEditTask = async (
    id: number,
    updateTask: Partial<TaskListProps>
  ): Promise<void> => {
    if (!token) return alert('Token inválido!');

    try {
      const { id: _, ...dadosAtualizados } = updateTask;

      console.log('Enviando dados:', dadosAtualizados);

      const response = await fetch(`${tarefasApi}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) throw new Error('Erro ao atualizar a tarefa!');

      setLista((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...dadosAtualizados } : item
        )
      );
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastPost = (currentPage + 1) * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = filteredTask.slice(indexOfFirstPost, indexOfLastPost);

  const handleChecked = async (tarefa: TaskListProps) => {
    const novoStatus = StatusMap[tarefa.status] === 'Aberta' ? '2' : '1';

    setLista((prev) =>
      prev.map((item) =>
        item.id === tarefa.id ? { ...item, status: novoStatus } : item
      )
    );

    try {
      await handleEditTask(tarefa.id, { status: novoStatus });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <ul className="lista__tarefas">
        {currentPost.map((tarefa: TaskListProps) => (
          <li key={tarefa.id} className="lista__tarefas-item">
            <article className="card-tarefas">
              <input
                type="checkbox"
                id={`tarefa-${tarefa.id}`}
                checked={StatusMap[tarefa.status] === 'Concluida'}
                onChange={() => handleChecked(tarefa)}
              />
              <label
                htmlFor={`tarefa-${tarefa.id}`}
                className="task-title"
                style={
                  StatusMap[tarefa.status] === 'Concluida'
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }
              >
                {tarefa.titulo}
              </label>
              <div className="card__info">
                <span
                  className="prioridade-tarefa"
                  style={{
                    color:
                      PriorityMap[tarefa.prioridadeTarefa] === 'Alta'
                        ? 'red'
                        : PriorityMap[tarefa.prioridadeTarefa] === 'Media'
                          ? 'yellow'
                          : PriorityMap[tarefa.prioridadeTarefa] === 'Baixa'
                            ? 'green'
                            : 'gray',
                    border:
                      PriorityMap[tarefa.prioridadeTarefa] === 'Alta'
                        ? '1px solid red'
                        : PriorityMap[tarefa.prioridadeTarefa] === 'Media'
                          ? '1px solid yellow'
                          : PriorityMap[tarefa.prioridadeTarefa] === 'Baixa'
                            ? '1px solid green'
                            : '1px solid gray',
                    backgroundColor: '#111827',
                  }}
                >
                  {PriorityMap[tarefa.prioridadeTarefa] ||
                    tarefa.prioridadeTarefa}
                </span>

                <time dateTime={tarefa.dataCriacao} className="date">
                  {new Date(tarefa.dataCriacao).toLocaleDateString()}
                </time>
                <div className="tags-container">
                  {tarefa.tags.map((tag, i) => (
                    <span key={i} className="tags">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <menu className="card__menu">
                <button
                  type="button"
                  aria-label="Editar tarefa"
                  onClick={() => {
                    setTarefaSelecionada(tarefa);
                    setShowModal(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  type="button"
                  aria-label="Excluir tarefa"
                  onClick={() => handleDeleteTask(tarefa.id)}
                >
                  🗑️
                </button>
              </menu>
            </article>
          </li>
        ))}
      </ul>
      {loggedUser && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={`previous-button ${loggedUser ? 'hidden-button' : ''}`}
          nextClassName={`next-button ${loggedUser ? 'hidden-button' : ''}`}
          pageClassName="page-link-style"
        />
      )}
      {showModal && tarefaSelecionada && (
        <Modal
          showModal={showModal}
          tarefaSelecionada={tarefaSelecionada}
          handleEditTask={handleEditTask}
          setShowModal={setShowModal}
          setTarefaSelecionada={setTarefaSelecionada}
        />
      )}
    </>
  );
};

export default TaskList;
