import React, { Component } from 'react';
import Card from '../components/Card';
import Thumbnail from '../components/Thumbnail';
import Button from '../components/Button';
import {List, ListItem} from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from '../utils/API';

class MainPg extends Component {

    state = {
        count: 0,
        pokedex: {},
        current: '',
        method: '',
        currentImg: ""
    }
    componentDidMount() {
        this.loadPokedex()
    };
    loadPokedex = () => {
        API.getAllMon()
        .then(res => 
            this.setState({
                pokedex: res.data.results
            })
        )
        .catch(err => console.log(err));
        this.logdex();
    };
    logdex(){
        console.log(this.state.pokedex)
    };
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
                    <Col size="md-4">
                        <div>
                            {this.state.pokedex.length ? (
                                <List>
                                    {this.state.pokedex.map((item, index) => {
                                       return <ListItem key={index}>{index+1}. {item.name}</ListItem>
                                    })}
                                </List>
                            ) : (
                                <p>Pokedex is Loading</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPg;
