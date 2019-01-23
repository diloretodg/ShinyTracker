import React, { Component } from 'react';
import Card from '../components/Card';
import { Input, TextArea, FormBtn } from "../components/Form";
import Thumbnail from '../components/Thumbnail';
import Button from '../components/Button';
import {List, ListItem} from "../components/List";
import { Container, Row, Col } from "../components/Grid";
import API from '../utils/API';

class MainPg extends Component {

    state = {
        count: 0,
        pokedex: {},
        pokemon: {},
        current: {
            num: '',
            name: '',
            url: '',
            shinyCharm: true
        },
        num: '',
        name: '',
        method: '',
        currentImg: ""
    }
    componentDidMount() {
        this.loadPokedex();
        this.huntInfo()
    };

    huntInfo = (id) => {
        API.getThisMon(id || 1)
        .then(res => 
            this.setState({
                pokemon: res.data
            })
        )
    }

    loadPokedex = () => {
        API.getAllMon()
        .then(res => 
            this.setState({
                pokedex: res.data.results
            })
        )
        .catch(err => console.log(err));
    };
    
    increaseHunt(){
        this.setState({count: this.state.count +1})
    };

    decreaseHunt(){
        this.setState({count: this.state.count -1})
    };

    resetHunt(){
        this.setState({count: 0})
    };
    handleNumSubmit = (num) => {
        this.setState({
            current:{
                num: num
            }
        }) 
        this.huntInfo(num);
    }
    handleNameSubmit = (name) => {
        this.setState({
            current:{
                name: name
            }
        }) 
        this.huntInfo(name);
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
                    <Col size="md-6">
                        <div>
                            {this.state.pokedex.length ? (
                                <List>
                                    {this.state.pokedex.map((item, index) => {
                                       return <ListItem  key={index}>
                                       <a href={item.url}>{item.url}</a>
                                       <p className="cap">{index+1}. {item.name}</p>

                                       </ListItem>
                                    })}
                                </List>
                            ) : (
                                <p>Pokedex is Loading</p>
                            )}
                        </div>
                    </Col>
                    <Col size="md-6">
                       
                        {this.state.pokemon.sprites ? (
                            <Card
                                heading={'Looking for: '+this.state.pokemon.name || "Select a Pokemon"}
                             >
                                <Thumbnail src ={this.state.pokemon.sprites.front_shiny || "https://place-hold.it/300"}/>
                                {this.state.pokemon.abilities.map(ability =>{
                                    return(
                                        <p>{ability.is_hidden ?(<strong>HA: {ability.ability.name}</strong>):(<span>{ability.ability.name}</span>)}</p>
                                    )
                                })}
                                <div>{this.state.pokemon.types.map(type => {
                                    return (
                                        <p>{type.type.name}</p>
                                    )
                                })}</div>
                                <Button type='success' onClick={() => this.increaseHunt()} />
                                <Button type='danger' onClick={() => this.decreaseHunt()} />
                                <Button type='default' onClick={() => this.resetHunt()} />
                                <p>Current Count: {this.state.count}</p>
                                {this.state.pokemon.held_items ? (
                                    <div>{this.state.pokemon.held_items.map(item => {
                                        return(
                                            <p>{item.item.name}</p>
                                        )
                                    })}</div>
                                ) : (
                                    <p>No Held Items</p>
                                )}
                            </Card>
                            ) : (
                                <Card
                                    heading={this.state.pokemon.name || "Select a Pokemon"}
                                >
                                    <p>loading sprite ...</p>
                                </Card>
                            )}
                        <form>
                           <Input
                            type='number'
                            onChange={this.handleInputChange}
                            value={this.state.num}
                            name="num"
                            onClick={()=>this.handleNumSubmit(this.state.num)}
                           />
                           <Input
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            name="name"
                            onClick={()=>this.handleNameSubmit(this.state.name)}
                           />
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPg;
