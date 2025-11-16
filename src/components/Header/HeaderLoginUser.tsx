interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}
interface HeaderLoginProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClickLogin?: () => void;
  newUser?: User;
  setNewUser?: React.Dispatch<React.SetStateAction<User>>;
  handleLogin?: () => void;
  isModalOpen?: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser?: User;
}

import { useUser } from '../../hooks/useUsers';
import './css/HeaderLoginUser.css';
import { LogOut } from 'lucide-react';

export const HeaderLoginUser = ({
  onClickLogin,
  isModalOpen,
  setIsModalOpen,
}: HeaderLoginProps) => {
  const { loggedUser, handleLogin, logout, newUser, setNewUser } = useUser();

  return (
    <>
      {!loggedUser ? (
        <button onClick={onClickLogin} className="botao__login">
          Login
        </button>
      ) : (
        <div className="img__container">
          <img
            src="account-avatar-profile-user.svg"
            alt="Avatar"
            className="avatar"
          />
          <LogOut onClick={logout} />
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <form
            className="modal-content animate"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="container">
              <label htmlFor="nome">
                <b>Nome</b>
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={newUser.nome}
                onChange={(e) =>
                  setNewUser({ ...newUser, nome: e.target.value })
                }
                required
              />

              <label htmlFor="senha">
                <b>Senha</b>
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={newUser.senha}
                onChange={(e) =>
                  setNewUser({ ...newUser, senha: e.target.value })
                }
                required
              />
              <button type="submit">Entrar</button>
              <button
                type="button"
                className="cancelBtn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
