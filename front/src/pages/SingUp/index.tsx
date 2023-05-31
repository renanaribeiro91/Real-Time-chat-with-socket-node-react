import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styles';
import { useHandleApi } from './controller';
import { Socket, io } from 'socket.io-client';
import { setChatVisibility, setSocket } from '../../store/chatSlice/chatSlice';


const SingUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleCreateUser, newUser, setNewUser } = useHandleApi();
  const [nameError, setNameError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;

    if (!newUser.name) {
      setNameError('Favor preencher seu nome');
      valid = false;
    } else {
      setNameError('');
    }

    if (!newUser.cpf) {
      setCpfError('Favor preencher seu CPF');
      valid = false;
    } else if (newUser.cpf.length < 9) {
      setCpfError('CPF deve ter no mínimo 9 dígitos');
      valid = false;
    } else {
      setCpfError('');
    }

    if (!newUser.password) {
      setPasswordError('Favor preencher sua senha');
      valid = false;
    } else if (newUser.password.length < 6) {
      setPasswordError('Senha deve ter no mínimo 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      await handleCreateUser();

      const username = nameInputRef.current?.value;
      const socket: Socket = io('http://localhost:4000');
      socket.emit('set_username', username);

      dispatch(setSocket(socket));
      dispatch(setChatVisibility(true));

    }
  };

  return (
    <S.Container>
      <S.Header>Formaretech</S.Header>
      <S.Title>Faça seu cadastro para conversar no chat</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label htmlFor="name">Nome:</S.Label>
          <S.StyledInput
            ref={nameInputRef}
            name="name"
            type="text"
            id="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          {nameError && <S.ErrorMessage>{nameError}</S.ErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="cpf">CPF:</S.Label>
          <S.StyledInput
            ref={cpfInputRef}
            name="cpf"
            type="text"
            id="cpf"
            value={newUser.cpf}
            onChange={handleInputChange}
          />
          {cpfError && <S.ErrorMessage>{cpfError}</S.ErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="password">Senha:</S.Label>
          <S.StyledInput
            ref={passwordInputRef}
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
        </S.FormGroup>
        <S.CheckboxContainer>
          <S.CheckboxInput
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <S.CheckboxLabel htmlFor="showPassword">Mostrar senha</S.CheckboxLabel>
        </S.CheckboxContainer>
        <S.Button type="submit">Cadastrar</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default SingUp;
