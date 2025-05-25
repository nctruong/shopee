// lib/get-current-user.ts
import buildClient from '../api/build-client';

export const getCurrentUser = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentUser');
    return data.currentUser || null;
};
