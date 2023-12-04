import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.68.107:8000/api/'
: baseURL = 'http://192.168.68.107:8000/api/'
}

export default baseURL;