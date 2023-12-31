import axios from 'axios';
const API = axios.create({baseURL :'http://localhost:4000'});
API.interceptors.request.use((req) =>{
if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
}
return req;
});
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post( '/posts',newPost);
export const updatePost =(id ,updatePost) => API.patch(`/posts/${id}` ,updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost =(id) => API.patch(`posts/${id}/likePost`);

export const signIn =(FormData) => API.post('/user/signin',FormData);
export const signUp =(FormData) => API.post('/user/signup',FormData);