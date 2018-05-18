import axios from "axios";

export default {
    getArticles: function(url) {
        return axios.get(url);
    },
    saveArticle: function(articleData){
        // console.log("inside client side API:", articleData);
        return axios.post("/api/articles", articleData);
    },
    getSavedArticles: function(){
        return axios.get("/api/articles");
    },
    deleteArticle: function(id){
        return axios.delete("/api/articles/"+id);
    }
}