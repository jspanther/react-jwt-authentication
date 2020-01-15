//import config from 'config';
import * as globals from '../Global'
import { authHeader } from '../_helpers/auth-hearder';
import {handleResponse} from '../_helpers/handle-response';
export const userService = {
    getAll
};

const url = globals.url
function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${url}/users`, requestOptions).then(handleResponse);
}