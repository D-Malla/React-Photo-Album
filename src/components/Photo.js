import React from 'react'
import axios from 'axios'
import App from './App'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import 'normalize.css/normalize.css'
import '../styles/App.css'

class Photo extends React.Component {  
  state = {
    photos: [],
    photoName: ''

  }


  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/photos/${id}`).then(resp => {
      this.setState({
       photoName:resp.data.name,
       photos: resp.data
      })
    })
  }

  componentWillReceiveProps(newprops){
    const id = newprops.match.params.id
    axios.get(`/api/photos/${id}`).then(resp => {
      console.log(axios)
      this.setState({
       photoName:resp.data.name,
       photos: resp.data
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
              <Link to={'/SelectedAlbum/' + this.state.photos.albumId}><span id='selectedAlbumArrow'><MaterialIcon icon="arrow_back" /></span></Link>
            <h1>{this.state.photoName}</h1>
            </div>
          </header>
                <div className="singlePicture">      
                <div>
                <img src={this.state.photos.id} alt='pic'/>
              </div>
                <span className='changePhoto left'><MaterialIcon icon="chevron_left" /></span>
                <span className='changePhoto right'><MaterialIcon icon="chevron_right" /></span>
            </div>
        </section>
        </div>
      </div>
    )
  }
}

export default Photo