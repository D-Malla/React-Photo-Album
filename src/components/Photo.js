import React from 'react'
import axios from 'axios'
import App from './App'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import 'normalize.css/normalize.css'
import '../styles/App.css'

class Photo extends React.Component {  
  state = {
    photo: '',
    photoName: '',
    albumId: '',
    left:'',
    right: ''

  }
  
  componentDidMount() {
    let id = this.props.match.params.id
    axios.get(`/api/photos/${id}`).then(resp => {
      this.setState({
       photoName:resp.data.name,
       photo: resp.data.photo,
       albumId: resp.data.albumId
      })
    })
  }

  componentWillReceiveProps(newprops){
    const id = newprops.match.params.id
    axios.get(`/api/photos/${id}`).then(resp => {
      this.setState({
       photoName:resp.data.name,
       photo: resp.data
      })
    })
  }

  render() {
    return (
      <div>
        <div>
        <section>
          <header id='picHeader'>
            <div>       
              <Link to={'/selectedalbum/' + this.state.albumId}><span id='selectedAlbumArrow'><MaterialIcon icon="arrow_back" /></span></Link>
            <h1>{this.state.photoName}</h1>
            </div>
          </header>
                <div className="singlePicture">      
                <div>
                <img src={this.state.photo} alt='pic'/>
              </div>
            </div>
        </section>
        </div>
      </div>
    )
  }
}

export default Photo