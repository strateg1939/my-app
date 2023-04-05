const URL = 'http://localhost:8080/api/books';

export default {
    getAll: async () => {
        const res = await fetch(URL);
        return await res.json();
    },

    post: async (book) => {
        const res = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok){
            const message = await res.json();
            throw new Error(message.message);
        }
        return await res.json();
    },

    put: async (book) => {
        const res = await fetch(`${URL}/${book._id}`, {
            method: 'PUT',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok){
            const message = await res.json();
            throw new Error(message.message);
        }
        return await res.json();
    },

    delete: async (id) => {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        });
        return res.ok;
    }
}