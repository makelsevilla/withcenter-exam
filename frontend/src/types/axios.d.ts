// Extending axios type

import 'axios';

declare module 'axios' {   
    export interface AxiosRequestConfig {
        withAuth?: boolean;   
    } 
}