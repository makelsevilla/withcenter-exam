// Extending axios type

import 'axios';

declare module 'axios' {   
    interface AxiosRequestConfig {
        withAuth?: boolean;   
    } 
}