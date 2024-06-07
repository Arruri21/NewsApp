import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
      

    }
    document.title = `Newsapp-${this.captilizeFirst(this.props.category)}`;
  }
  captilizeFirst = (ele) => {
    const word = ele;

    const firstLetter = word.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = word.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;

  }
  async updateNews() {
    //console.log("prev");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11ffaf7402ba4e30856f8af98fe47347&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ loading: true })
    console.log(parsedata)
    this.setState({
      page: this.state.page,
      articles: parsedata.articles,
      totalResults: parsedata.articles.totalResults,
      loading: false
      
    })
  }


  async componentDidMount() {
    this.updateNews();
  }
  handlePrev = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handleNext = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }
  upperCase = (ele) => {
    let word = ele;
    return word.toUpperCase();

  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=11ffaf7402ba4e30856f8af98fe47347&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata)
    this.setState({
      page: this.state.page,
      articles: this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.articles.totalResults
    })


  }
  render() {

    return (
      <>

        <h1 className="text-center" style={{marginTop:"50px"}}><b>TOP HEADLINES FROM {this.upperCase(this.props.category)}</b></h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}

        >
          <div className="container">
            <div className="row" >
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 24) : ""} description={element.description ? element.description.slice(0, 88) : ""} author={element.author ? element.author : "unknown"} date={element.publishedAt} imgUrl={element.urlToImage} source={element.source.name} newsUrl={element.url} />
                </div>
              }
              )
              }

            </div>
          </div>
        </InfiniteScroll>


      </>



    )
  }
}
