import React from 'react'
import axios from 'axios'
import App from './App'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import 'normalize.css/normalize.css'
import '../styles/App.css'

class Photo extends React.Component {  
  state = {
    albums: [],
    photos: [],
    photoName: ''
}


componentDidMount() {
  const name = this.props.match.params.name
  axios.get(`/api/photos/${name}?_embed=albums`).then(resp => {
    this.setState({
      albums: resp.data.albums,
      photos: resp.data.photos,
      photoName:resp.data.name

    })
  })

  // axios.get("/api/albums").then(resp => {
  //   this.setState({
  //    photos: resp.data
  //   })
  // })

}
componentWillReceiveProps(newprops){
  const name = newprops.match.params.name
  axios.get(`/api/photos/${name}?_embed=albums`).then(resp => {
    this.setState({
     photoName:resp.data.name,
     photos: resp.data.photos
    })
  })
}

  render() {
    return (
      <div>
        <section>
        <header id='picHeader'>
        {this.state.photos.map(photo=> (
          <div>       
            <Link to={'/SelectedAlbum/' + photo.albumId}><span id='selectedAlbumArrow'><MaterialIcon icon="arrow_back" /></span></Link>
          <h1>{photo.id}</h1>
          </div>
        ))}
        </header>
              <div className="singlePicture">
            {this.state.photos.map(photo => (
            <div>
              <img src={photo.photo} alt='pic'/>
            </div>
              ))}
              <span className='changePhoto left'><MaterialIcon icon="chevron_left" /></span>
              <span className='changePhoto right'><MaterialIcon icon="chevron_right" /></span>
          </div>
        </section>
      </div>
    )
  }
}

export default Photo