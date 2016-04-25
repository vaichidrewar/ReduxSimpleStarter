import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = "AIzaSyA9hiYV6PO8WLYPn9qdVzMbuclChLPuN3E";


// Create a new constmponent. This component should produce
// some HTML
//This is a class and it needs to be instantiated before it can be rendered.
// <App /> is its instantiation
class App extends Component {
  constructor(props) {
    super(props);
    //State is a an array of videos
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfBoards');
  }

  videoSearch(term) {
    // YTSearch api takes two arguments,
    // Fisrt is an object that contains key and search term
    // Second argument is a function that gets called with some response data
    // This looks similar to JQuery Ajax function

    // We are using arrow function for callback
    // {videos:videos} is equivalent to {videos} [In ES6 when key and value are
    // same variable name we can use just one varable name in curly braces]
    YTSearch({key: API_KEY, term: term}, (videos) => {
      //this.setState({videos});
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });

    });
  }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
	  return (
		  <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        {/* onVideoSelect is a function which is modifying its state by using argument received */}
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
		  </div>
	  );
  }
}


// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
