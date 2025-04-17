
const API_URL = 'http://localhost:5259/api/auth';

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  return await response.json();
};


export const loginUser = async (Username: string, email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:5259/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username, email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Dados retornados:', responseData);

    return responseData;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};


export const listarHoteis = async () => {
  try {
    const response = await fetch(`http://localhost:5259/api/Accommodation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const hoteisData = await response.json();
    console.log('Dados dos hotéis:', hoteisData);

    return hoteisData;
  } catch (error) {
    console.error('Erro ao buscar hotéis:', error);
    throw error;
  }
};


export const listarVoos = async () => {
  try {
    const response = await fetch(`http://localhost:5259/api/Flight`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const hoteisData = await response.json();
    console.log('Dados dos Voos:', hoteisData);

    return hoteisData;
  } catch (error) {
    console.error('Erro ao buscar Voos:', error);
    throw error;
  }
};

export const listarCars = async () => {
  try {
    const response = await fetch(`http://localhost:5259/api/Cars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const hoteisData = await response.json();
    console.log('Dados dos Cars:', hoteisData);

    return hoteisData;
  } catch (error) {
    console.error('Erro ao buscar Cars:', error);
    throw error;
  }
};
