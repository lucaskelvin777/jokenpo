import React, { useState, useRef } from 'react';
import { Layout, Box, BoxInput, Input, BoxButton, ButtonMedium, Redirect } from '../components';
import { useHistory} from 'react-router-dom';
const Login = () => {
  const [name, setName] = useState('');
  const inputName = useRef(null);
  const history = useHistory();
  const goHome = () => history.push('/home');
  const handleFormSubmit = e =>{
    e.preventDefault();
    localStorage.setItem('name', name);
    goHome();
  }
  return (
    <Layout>
      <Box>
        <form onSubmit={handleFormSubmit}>
          <BoxInput>
            <label onClick={() => {
              inputName.current.focus();
            }} >Digite seu nome</label>
            <Input  ref={inputName} 
            onChange={e => setName(e.target.value)
            } required />
          </BoxInput>
          <BoxButton>
            <ButtonMedium>Jogar</ButtonMedium>
          </BoxButton>
        </form>
      </Box>


    </Layout>
  );
}

export default Login;
