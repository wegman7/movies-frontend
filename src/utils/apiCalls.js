import axiosInstance from './axios';

export const login = (email, password) => {
    return axiosInstance.post('auth/signin/', {
        usernameOrEmail: email,
        password: password
    });
}

export const signup = (email, username, name, password) => {
    return axiosInstance.post('auth/signup/', {
        email: email,
        username: username,
        name: name,
        password: password
    });
}

export const getUserDetails = () => {
    return axiosInstance.get('auth/info/');
}

export const getPosts = () => {
    return axiosInstance.get('/post/');
}

export const createPost = (content, movieTagIds, userTagIds) => {
    return axiosInstance.post('/post/', {
        content: content,
        movieTagIds: movieTagIds,
        userTagIds: userTagIds
    });
}

export const editPost = (id, content, movieTagIds, userTagIds) => {
    return axiosInstance.patch('/post/' + id, {
        content: content,
        movieTagIds: movieTagIds,
        userTagIds: userTagIds
    });
}

export const deletePost = (id) => {
    return axiosInstance.delete('/post/' + id);
}

export const searchAll = (query) => {
    return axiosInstance.get('/movies/search/multi/' + query);
}

export const getTrending = () => {
    return axiosInstance.get('/movies/trending');
}

export const likeMovie = (id) => {
    return axiosInstance.post('/profile/add-movie', {
        likedMovieId: id
    });
}

export const addToWatched = (id) => {
    return axiosInstance.post('/profile/add-movie', {
        watchedMovieId: id
    });
}

export const addToWatchlist = (id) => {
    return axiosInstance.post('/profile/add-movie', {
        watchlistMovieId: id
    });
}