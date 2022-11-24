import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("I am a constructor of news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2123eecdcde14cabae76ee3b50698dc9&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  handlePrevClick =  async ()=>{
    console.log("prev");
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2123eecdcde14cabae76ee3b50698dc9&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
  })
  }
  handleNextClick =  async ()=>{
    console.log("next");
    if(!(this.state.page+1 >Math.ceil(this.state.totalResults/20))){
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2123eecdcde14cabae76ee3b50698dc9&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
  })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'40px 0px'}}>News Monkey - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title?element.title:" "}
              desc={element.description?element.description:" "}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
            />
          </div>  
        })} {/*md-4 --> 4 cols i medium devices */}
        </div>
        
        <div className="container d-flex justify-content-between">
        <button disabled= {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous </button>
        <button disabled= {this.state.page+1 >Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
