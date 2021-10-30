import storage from './storage';

const OPENTDB_BASEURL = 'https://opentdb.com';
const QUESTIONS = 5;

const RESPONSE_CODE_SUCESS = 0;
// const RESPONSE_CODE_NO_RESULTS = 1;
// const RESPONSE_CODE_INVALID_PARAMETER = 2;
const RESPONSE_CODE_TOKEN_NOT_FOUND = 3;
// const RESPONSE_CODE_TOKEN_EMPTY = 4;

const opentdbAPI = {
  fetchToken: async () => {
    const OPENTDB_TOKEN = `${OPENTDB_BASEURL}/api_token.php?command=request`;
    try {
      const response = await (await fetch(OPENTDB_TOKEN)).json();
      switch (response.response_code) {
      case RESPONSE_CODE_SUCESS:
        storage.clear('token');
        storage.write('token', response.token);
        return;
      case RESPONSE_CODE_TOKEN_NOT_FOUND:
        storage.clear('token');
        this.fetchToken();
        return;
      default:
        throw new Error(`[fetchToken] error: response_code ${response.response_code}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchQuestions: async (amount = QUESTIONS, settings = {}) => {
    const token = storage.read('token');
    const OPENTDB_TRIVIA = `${OPENTDB_BASEURL}/api.php?amount=${amount}&token=${token}`;
    const request = Object.keys(settings)
    // o filtrer abaixo elimina as chaves quando não queremos especificar uma dificuldade ou tipo.
      .filter((curr) => !(
        (curr === 'category' && settings[curr] === 0)
        || (curr === 'difficulty' && settings[curr] === 'Any Difficulty')
        || (curr === 'type' && settings[curr] === 'Any Type')
      ))
    // o reduce monta a string da requisição conforme as chaves recebidas.
      .reduce((acc, curr) => (
        acc + (settings[curr] !== '' ? `&${curr}=${settings[curr]}` : '')
      ), OPENTDB_TRIVIA);
    try {
      const response = await (await fetch(request)).json();
      switch (response.response_code) {
      case RESPONSE_CODE_SUCESS:
        return response;
      case RESPONSE_CODE_TOKEN_NOT_FOUND:
        storage.clear('token');
        this.fetchToken();
        return await this.fetchQuestions(amount);
      default:
        throw new Error(`[fetchQuestion] error: response_code ${response.response_code}`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default opentdbAPI;
