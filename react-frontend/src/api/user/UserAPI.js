import axios from 'axios';

export const fetchUserFromServer = async function () {
    try {
        let response = await axios.get('/api/users');
        if (response.data?.user) {
            return { user: response.data.user };
        } else {
            throw new Error('No user received');
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
};
