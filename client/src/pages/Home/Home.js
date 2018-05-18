import React, {Component} from "react";
import "./Home.css";
import {Input, FormBtn} from "../../components/Form";
import {List, ListItem} from "../../components/List";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import ResultsHeader from "../../components/ResultsHeader";
import SavedHeader from "../../components/SavedHeader";
import API from "../../utils/API";

class Home extends Component {
  state ={
    articles: [],
    topic: "",
    startYear:"",
    endYear:"",
    savedArticles:[]
  };

  componentDidMount(){
    this.loadArticles();
  }

  loadArticles=()=>{
    API.getSavedArticles().then(res =>{
      console.log(res.data);
      this.setState({
        savedArticles:res.data
      });
    }).catch(err => console.log(err));
  }

  handleInputChange = event => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSave = ({title,url,date}) =>{
    const newArticle = {
      title: title,
      url:url,
      date:date,
      saved:true
    }
    console.log(newArticle);
    API.saveArticle(newArticle).then(()=>{
      console.log("Article Saved");
      this.loadArticles();
    }).catch(err => console.log(err));
  }

  handleDelete = ({id}) =>{
    API.deleteArticle(id).then(()=>{
      console.log("Article Deleted");
      this.loadArticles();
    }).catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const baseQueryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=43b922c34a0d40018416ffa5e5ee17ce&q=';
    this.queryBuilder(baseQueryURL);
  }

  queryBuilder = (baseQueryURL) =>{
    const searchTerm = this.state.topic;
    console.log("search term: "+searchTerm);

    let queryURL = baseQueryURL + searchTerm;
    if (this.state.startYear !== '') {

        let start = this.state.startYear + '0101';
        console.log("start date: "+start);
        queryURL = queryURL + "&begin_date=" + start;
    }
    if (this.state.endYear !== '') {

        let end = this.state.endYear + '0101';
        console.log("end date: "+end);

        queryURL = queryURL + "&end_date=" + end;
    }
    this.callAPI(queryURL);
  }

  callAPI = (queryURL) =>{
    console.log(queryURL);
    API.getArticles(queryURL).then(res =>{
      console.log(res.data.response.docs);
      this.setState({
        articles: res.data.response.docs,
        topic:"",
        startYear:"",
        endYear:""
      })
    }).catch(err => console.log(err));
  }
  render(){
    return (
      <div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title"><span className="fas fa-search"></span> Search Parameters</h4>
        </div>
        <div className="card-block">
          <form> 
            <label className="row-title">Search Term:</label>
            <Input value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                  placeholder="Topic (required)"/>
            <label className="row-title">Start Year (Optional):</label>
            <Input value={this.state.startYear}
                  onChange={this.handleInputChange}
                  name="startDate"
                  placeholder="Start Year"/>
            <label className="row-title">End Year (Optional):</label>
            <Input value={this.state.endYear}
                  onChange={this.handleInputChange}
                  name="endDate"
                  placeholder="End Year"/>
            <FormBtn onClick={this.handleFormSubmit}> Search Article </FormBtn>
          </form>
        </div>
        </div>
        <br/>
        <div>
        <ResultsHeader/>
          {this.state.articles.length ? (
          <List>
            {this.state.articles.map(article => (
              <ListItem key={article.web_url}>
              <div>
                <a href={article.web_url} target="_blank">
                <h4>
                  {article.headline.main}
                </h4>
                </a>
                <SaveBtn onClick={() => this.handleSave({title:article.headline.main, url:article.web_url, date: article.pub_date})}/>
                </div>
                <p> Date: {article.pub_date} </p>
              </ListItem>
            ))}
          </List>
            ) : (
              <div>
              <br/>
              <h3>No Results to Display</h3>
              </div>
            )}
        </div>
        <br/>
        <div>
          {/*/<SavedArticles articles={this.state.savedArticles} delete={this.handleDelete} />*/}
        <SavedHeader />
        {this.state.savedArticles.length ? (
          <List>
            {this.state.savedArticles.map(article => (
              <ListItem key={article._id}>
              <div>
                <a href={article.url} target="_blank">
                <h4>
                  {article.title}
                </h4>
                </a>
                <DeleteBtn onClick={() => this.handleDelete({id:article._id})}/>
                </div>
                <p> Date: {article.date} </p>
              </ListItem>
            ))}
          </List>
            ) : (
              <div>
              <br/>
              <h3>No Results to Display</h3>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Home;