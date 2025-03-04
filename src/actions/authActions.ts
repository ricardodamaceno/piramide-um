"use server"

import axios from 'axios';

interface SignupData {
    email: string;
    password: string;
}

export async function signup(userData: SignupData) {
    const baseURL = process.env.BASE_URL;

    try {
        const response = await axios.post(
            `${baseURL}/api/Auth/register`,
            userData,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                validateStatus: (status) => status >= 200 && status < 300
            }
        );
        return { 
            success: true, 
            redirect: true 
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Erro no cadastro';
            return { 
                success: false, 
                message: message 
            };
        }

        return { 
            success: false, 
            message: 'Erro desconhecido' 
        };
    }
}