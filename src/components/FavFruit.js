import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap'
import Modal from './ModalUpdate'

class FavFruit extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

      favFruitArr: [],
      id: '',
      showModal: false
    }
  }

  componentDidMount = () => {

    const { user } = this.props.auth0;

    let email = user.email;

    axios

      .get(`http://localhost:3090/getFav?email=${email}`).then(result => {
        this.setState({

          favFruitArr: result.data

        })

      })

  }

  delete = (id) => {
    const { user } = this.props.auth0;
    let email = user.email;

    axios
      .delete(`http://localhost:3090/delete/${id}?email=${email}`)
      .then(result => {
        this.setState({
          favFruitArr: result.data
        })
      })

  }

  update = (event) => {

    event.preventDefault();

    const { user } = this.props.auth0;

    const object = {

      name: event.target.name.value,
      image: event.target.image.value,
      price: event.target.price.value,
      email: user.email
    }

    axios
      .put(`http://localhost:3090/update/${this.state.id}`, object)
      .then(result => {
        this.setState({

          favFruitArr: result.data

        })
      })
  }
  handleClose = () => {

    this.setState({

      showModal: false
    })
  }

  handleShow = () => {

    this.setState({

      showModal: true
    })
  }

  showUpdatedForm = (item) => {

    this.setState({
      showModal: true,
      name: item.name,
      image: item.image,
      price: item.price,
      id: item._id
    })
  }
  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>

        {this.state.favFruitArr.map((item, index) => {

          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.price}
                </Card.Text>
                <Button onClick={() => this.showUpdatedForm(item)} variant="primary">Update</Button>
                <Button onClick={() => this.delete(item._id)} variant="danger">Delete</Button>

              </Card.Body>
            </Card>
          )
        })}
        {this.state.showModal &&
          <Modal
            name={this.state.name}
            image={this.state.image}
            price={this.state.price}
            update={this.update}
            show={this.state.showModal}
            close={this.handleClose}
          />
        }
      </>
    )
  }
}

export default withAuth0(FavFruit);
