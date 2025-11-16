import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type User = {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
};

export const useUser = () => {
  const [newUser, setNewUser] = useState<User>({
    nome: '',
    email: '',
    senha: '',
  });
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const authApiLogin = import.meta.env.VITE_API_URL_AUTH_LOGIN;
  const authApiRegister = import.meta.env.VITE_API_URL_AUTH_REGISTER;
  const userLoggedURL = import.meta.env.VITE_API_URL_AUTH_ME;

  const handleCreateUser = async () => {
    if (!newUser.nome || !newUser.email || !newUser.senha) {
      return Swal.fire({ title: 'Preencha todos os campos!', icon: 'warning' });
    }

    try {
      const response = await fetch(authApiRegister, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nome: newUser.nome,
          Email: newUser.email,
          Senha: newUser.senha,
        }),
      });

      if (response.ok) {
        setNewUser({ nome: '', email: '', senha: '' });
        setIsRegisterOpen(false);
        Swal.fire({
          title: 'Usuário criado com sucesso! Faça o login.',
          icon: 'success',
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Erro ao criar usuário: ${errorData.message || response.statusText}`,
          icon: 'error',
        });
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      Swal.fire({
        title: 'Erro de conexão ao tentar registrar.',
        icon: 'error',
      });
    }
  };

  const handleLogin = async () => {
    if (!newUser.nome || !newUser.senha) {
      return alert('Preencha o nome e a senha!');
    }
    const response = await fetch(authApiLogin, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Nome: newUser.nome,
        Senha: newUser.senha,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem('authToken', data.token);

      setLoggedUser(data.user);
    } else {
      Swal.fire({
        title: 'Credenciais inválidas. Tente novamente.',
        icon: 'warning',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    setLoggedUser(null);
    Swal.fire({ title: 'Usuario deslogado!', icon: 'success' });
    setIsLoginOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoggedUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(userLoggedURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          setLoggedUser(null);
          return;
        }

        if (!response.ok) {
          setLoggedUser(null);
          return;
        }

        const data = await response.json();

        if (data.message || !data.email) {
          setLoggedUser(null);
          return;
        }

        setLoggedUser(data);
      } catch (err) {
        console.error('Erro ao verificar usuário logado:', err);
        setLoggedUser(null);
      }
    };

    fetchUser();
  }, [userLoggedURL]);

  return {
    newUser,
    setNewUser,
    handleCreateUser,
    handleLogin,
    loggedUser,
    setLoggedUser,
    isRegisterOpen,
    isLoginOpen,
    setIsRegisterOpen,
    setIsLoginOpen,
    logout,
  };
};
