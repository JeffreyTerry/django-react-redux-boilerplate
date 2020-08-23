import axios from 'axios';

export const fetchUserFromServer = async function () {
    try {
        let response = await axios.get('/api/users/current');
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No user received');
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
};
