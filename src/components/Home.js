import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap'


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      favFruitArr: [],

    }
  }

  componentDidMount = () => {

    let url = 'http://localhost:3090/getFruit';

    axios

      .get(url).then(result => {
        this.setState({

          favFruitArr: result.data

        })

      })

  }

  addToFav = (item) => {

    const { user } = this.props.auth0;
    const obj = {

      name: item.name,
      image: item.image,
      price: item.price,
      email: user.email,
    }

    axios

      .post('http://localhost:3090/addToFav', obj)
      .then(result => {

        console.log('hello')
        
      })
  }


  render() {
    return (
      <>
        <h1>API Fruits</h1>
       
       {this.state.favFruitArr.map(item =>{

         return(
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.price}
                </Card.Text>
                <Button onClick={() => this.addToFav(item)} variant="primary">Add To Favorite</Button>
              </Card.Body>
            </Card>
         )
        })}

      </>

    )
  
}
}

export default withAuth0(Home);
