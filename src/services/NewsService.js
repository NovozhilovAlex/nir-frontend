import axios from "axios";

const NEWS_BASE_REST_API_URL = 'http://localhost:8080/news';

class NewsService {
    getAllNews() {
        return axios.get(NEWS_BASE_REST_API_URL)
    }

    createNews(news) {
        return axios.post(NEWS_BASE_REST_API_URL, news);
    }

    updateNews(news) {
        console.log(news);
        return axios.put(NEWS_BASE_REST_API_URL, news);
    }

    deleteNews(id) {
        return axios.delete(NEWS_BASE_REST_API_URL + `/${id}`);
    }
}

export default new NewsService();