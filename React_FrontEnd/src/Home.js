import React, { useState, Component } from 'react';
import { AppBar, TextField, Button, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Async from "react-async"
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './App.css';
import Maps from "./maps"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myValue: '',
            myValue1: '',
            myPosts: [],
            myPosts2: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(lat, long) {
        var string = "http://localhost:8080/json?" + "latitude=" + lat + "&longitude=" + long;
        let header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
        });
        let sentData = {
            mode: 'cors',
            header: header,
        };
        axios.get(string)
            .then((res) => {
                //console.log(res.data);
                this.setState({ myPosts: res.data.today, myPosts2: res.data.lastYear })
                console.log(this.state.myPosts.date)
                console.log(this.state.myPosts2)
            })
        //window.location.reload();
    };



    handleChange = (e) => this.setState({
        myValue: e.target.value
    })
    handleChange1 = (e) => this.setState({
        myValue1: e.target.value
    })

    // Render Function      
    render() {
        const mystyle = {
            root: {
                minWidth: 275,
                marginTop: 25
            },
        }
        const post = () => {
            // console.log(posts)
            if (this.state.myPosts.length == 0) {
                return (
                    <div></div>
                )
            } else {
                return (
                    <div>
                        <TableContainer component={Paper} style={{ marginTop: 20 }}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell align="right">Today</TableCell>
                                        <TableCell align="right" >Last Year Today</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>date</TableCell>
                                        <TableCell align="right">{this.state.myPosts.date}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.date}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>time</TableCell>
                                        <TableCell align="right">{this.state.myPosts.time}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.time}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>temperature</TableCell>
                                        <TableCell align="right">{this.state.myPosts.temperature}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.temperature}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>sunriseTime</TableCell>
                                        <TableCell align="right">{this.state.myPosts.sunriseTime}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.sunriseTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>sunsetTime</TableCell>
                                        <TableCell align="right">{this.state.myPosts.sunsetTime}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.sunsetTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>temperatureHigh</TableCell>
                                        <TableCell align="right">{this.state.myPosts.temperatureHigh}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.temperatureHigh}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>temperatureHighTime</TableCell>
                                        <TableCell align="right">{this.state.myPosts.temperatureHighTime}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.temperatureHighTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>temperatureLow</TableCell>
                                        <TableCell align="right">{this.state.myPosts.temperatureLow}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.temperatureLow}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>temperatureLowTime</TableCell>
                                        <TableCell align="right">{this.state.myPosts.temperatureLowTime}</TableCell>
                                        <TableCell align="right">{this.state.myPosts2.temperatureLowTime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Maps latitude={this.state.myValue} longitude={this.state.myValue1} />
                    </div>
                )
            }
        }



        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                        </Typography>
                    </Toolbar>
                </AppBar>
                <header className="App-header">
                    <div className="Newsfeed">
                        <TextField
                            id="standard-multiline-flexible"
                            label="Latitude"
                            value="42.335190"
                            multiline
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Longitude"
                            multiline
                            value="-83.049190"
                            onChange={this.handleChange1}
                        />
                        <Button
                            onClick={this.handleSubmit.bind(this, this.state.myValue, this.state.myValue)}

                            variant="contained">Submit Post</Button>
                        {post()}



                    </div>
                </header>
            </div>
        )
    }
}
export default Home;
