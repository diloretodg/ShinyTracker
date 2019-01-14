import React, { Component } from 'react';
import Card from '../Card/';
import Thumbnail from '../Thumbnail';
import Button from '../Button';
import { Container, Row, Col } from "../Grid";


class MainPg extends Component {

    state = {
        count: 0,
        current: 'Pikipek',
        method: 'SOS',
        currentImg: "https://i.imgur.com/i6UWH3c.gif"
    }

    increaseHunt(){
        this.setState({count: this.state.count +1})
    };

    decreaseHunt(){
        this.setState({count: this.state.count -1})
    };

    resetHunt(){
        this.setState({count: 0})
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    render () {
        return(
            <Container>
                <Row>
                    <Col size='md-4' >
                        <Card
                            heading={'Looking for: '+this.state.current || 'What are we hunting?'}
                        >
                            <Thumbnail src={this.state.currentImg}/>
                            <Button type='success' onClick={() => this.increaseHunt()} />
                            <Button type='danger' onClick={() => this.decreaseHunt()} />
                            <Button type='default' onClick={() => this.resetHunt()} />
                            <p>Current Count: {this.state.count}</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPg;
