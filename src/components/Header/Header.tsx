import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderLoginUser } from './HeaderLoginUser';
import { HeaderSearch } from './HeaderSearch';
import { HeaderThemeToogle } from './HeaderThemeToggle';
import './css/Header.css';
import { useUser } from '../../hooks/useUsers';
import { HeaderRegisterUser } from './HeaderRegisterUser';
import { useEffect } from 'react';

interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

export const Header = () => {
  const {
    newUser,
    setNewUser,
    handleCreateUser,
    loggedUser,
    handleLogin,
    isLoginOpen,
    isRegisterOpen,
    setIsRegisterOpen,
    setIsLoginOpen,
  } = useUser();

  useEffect(() => {
    const handleOpen = () => setIsLoginOpen(true);
    document.addEventListener('openLoginModal', handleOpen);
    return () => document.removeEventListener('openLoginModal', handleOpen);
  }, []);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <HeaderLogo />
        <HeaderSearch />
        <HeaderNav />

        <div className="app-header__actions">
          <HeaderThemeToogle />
          <HeaderRegisterUser
            isOpen={isRegisterOpen}
            setIsOpen={setIsRegisterOpen}
            handleCreateUser={handleCreateUser}
            loggedUser={loggedUser as User}
            newUser={newUser}
            setNewUser={setNewUser}
            onClickSignUp={() => setIsRegisterOpen(true)}
          />
          <HeaderLoginUser
            isOpen={isRegisterOpen}
            setIsOpen={setIsRegisterOpen}
            handleLogin={handleLogin}
            loggedUser={loggedUser as User}
            onClickLogin={() => setIsLoginOpen(true)}
            newUser={newUser}
            setNewUser={setNewUser}
            isModalOpen={isLoginOpen}
            setIsModalOpen={setIsLoginOpen}
          />
        </div>
      </div>
    </header>
  );
};
