import React from "react";
import logo from './logo.svg';
import axios from "axios";

import "./Joke.css";

class JokeClass extends React.Component {
    constructor(props) {
        console.log("constructor: props");
        console.dir(props);

        super(props);
        this.state = { count: props.numJokesToGet, jokes: [] };
        this.numJokesToGet = props.numJokesToGet || 10;
        // this.jokes = [];
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setJokes = this.setJokes.bind(this);
        this.jokeVote = this.jokeVote.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);

    }

    setJokes(newJokes) {
        // this.jokes = [...newJokes];
        this.setState({ jokes: [...newJokes] });
        console.log("JokeClass - setJokes: jokes=");
        console.dir(this.state.jokes);
        console.log("JokeClass - end");
    }


    async getJokes(nbrJokes, jokes, setJokesFx) {
        console.log(`getJokes: getting ${nbrJokes} jokes`);
        let j = [...jokes];
        let seenJokes = new Set();
        try {
            while (j.length < nbrJokes) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                let { status, ...jokeObj } = res.data;

                if (!seenJokes.has(jokeObj.id)) {
                    seenJokes.add(jokeObj.id);
                    j.push({ ...jokeObj, votes: 0 });
                    // console.dir(jokeObj);
                } else {
                    console.error("duplicate found!");
                }
            }
            console.log("getJokes: jokes(j)=");
            console.dir(j);
            // this.setState({ jokes: [...j] });
            setJokesFx(j);
            // return (j);
            // this.jokes = [...j];
            // console.dir(this.jokes);
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        console.log("componentDidMount");
        console.log(`   jokes.length:${this.state.jokes.length}`);



        if (this.state.jokes.length === 0) this.getJokes(this.numJokesToGet, this.state.jokes, this.setJokes);


        // console.log("   jokes:");
        // console.dir(this.jokes);

        console.log("componentDidMount - end");
    }


    // componentDidMount() {
    //     console.log("componentDidMount");
    //     console.log(`   jokes.length:${this.jokes.length}`);

    //     async function getJokes(nbrJokes, jokes, setJokesFx) {
    //         console.log(`   getting ${nbrJokes} jokes`);
    //         let j = [...jokes];
    //         let seenJokes = new Set();
    //         try {
    //             while (j.length < nbrJokes) {
    //                 let res = await axios.get("https://icanhazdadjoke.com", {
    //                     headers: { Accept: "application/json" }
    //                 });
    //                 let { status, ...jokeObj } = res.data;

    //                 if (!seenJokes.has(jokeObj.id)) {
    //                     seenJokes.add(jokeObj.id);
    //                     j.push({ ...jokeObj, votes: 0 });
    //                     // console.dir(jokeObj);
    //                 } else {
    //                     console.error("duplicate found!");
    //                 }
    //             }
    //             console.log("componentDidMount - getJokes: jokes(j)=");
    //             console.dir(j);
    //             // this.setState({ jokes: [...j] });
    //             setJokesFx(j);
    //             // return (j);
    //             // this.jokes = [...j];
    //             // console.dir(this.jokes);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }

    //     if (this.state.jokes.length === 0) getJokes(this.numJokesToGet, this.state.jokes, this.setJokes);


    //     // console.log("   jokes:");
    //     // console.dir(this.jokes);

    //     console.log("componentDidMount - end");
    // }



    componentDidUpdate() {
        console.log("componentDidUpdate");
    }



    jokeVote(event) {
        console.log("jokeVote: event=");
        // fidn the classname fa-thumbs-up or fa-thumbs-down
        // find the data id from dataset
        const holdClassName = (event.target.className).slice();
        const holdJokeID = event.target.dataset.id;

        let ctrAdjust = 1;
        if (holdClassName.indexOf("fa-thumbs-down") > -1) ctrAdjust = -1

        // console.log(`jokeVote: ctrAdjust=${ctrAdjust}, jokeId=${holdJokeID}\n`);

        const jokesVote = [...this.state.jokes]

        // const idxJoke = this.state.jokes.findIndex((joke) => {
        const idxJoke = jokesVote.findIndex((joke) => {
            return joke.id === holdJokeID
        });

        // console.log(`jokeVote: ctrAdjust=${ctrAdjust}, jokeId=${holdJokeID}, idxJoke=${idxJoke}, currCount=${this.state.jokes[idxJoke].votes}\n`);
        // this.state.jokes[idxJoke].votes = this.state.jokes[idxJoke].votes + ctrAdjust;
        // console.log(`jokeVote: ctrAdjust=${ctrAdjust}, jokeId=${holdJokeID}, idxJoke=${idxJoke}, currCount=${this.state.jokes[idxJoke].votes}\n`);

        console.log(`jokeVote: ctrAdjust=${ctrAdjust}, jokeId=${holdJokeID}, idxJoke=${idxJoke}, currCount=${jokesVote[idxJoke].votes}\n`);
        jokesVote[idxJoke].votes = jokesVote[idxJoke].votes + ctrAdjust;
        console.log(`jokeVote: ctrAdjust=${ctrAdjust}, jokeId=${holdJokeID}, idxJoke=${idxJoke}, currCount=${jokesVote[idxJoke].votes}\n`);

        // this.setState({ alter: Date.now() });
        this.setState({ jokes: jokesVote });
        // console.dir(event);
    }

    generateNewJokes() {
        this.getJokes(this.numJokesToGet, [], this.setJokes);
    }



    render() {
        console.log("rendering");
        // const { count } = this.state;

        if (this.state.jokes.length > 0) {
            let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

            return (
                <div>
                    <button className="JokeClass-getmore" onClick={this.generateNewJokes}>
                        Get New Jokes (Class)
                    </button>
                    {sortedJokes.map(joke => {
                        return (
                            <div className="Joke" key={joke.id}>
                                <div className="Joke-votearea">
                                    {/* <button onClick={upVote}> */}
                                    <button onClick={this.jokeVote}>
                                        <i data-id={joke.id} className="fas fa-thumbs-up" />
                                    </button>

                                    <button onClick={this.jokeVote}>
                                        <i data-id={joke.id} className="fas fa-thumbs-down" />
                                    </button>

                                    <span className="JokeClass-votes">{joke.votes}</span>
                                </div>

                                <div className="Joke-text">{joke.joke}</div>
                            </div>
                        )
                    })
                    }

                </div>
            );

        } else {
            // return null;
            return (
                <div>
                    {/* <i className="fas fa-cog App-logo" /> */}

                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            );

        }



        // return (
        //     <div>
        //         <button className="JokeClass-getmore" onClick={this.generateNewJokes}>
        //             Get New Jokes
        //         </button>
        //         {/* <p>Number of Jokes: {this.state.jokes.length}</p> */}
        //         {this.state.jokes.length === 0
        //             ? <p>no joke</p>
        //             : sortedJokes.map(joke => {
        //                 return (
        //                     <div className="Joke" key={joke.id}>
        //                         <div className="Joke-votearea">
        //                             {/* <button onClick={upVote}> */}
        //                             <button onClick={this.jokeVote}>
        //                                 <i data-id={joke.id} className="fas fa-thumbs-up" />
        //                             </button>

        //                             <button onClick={this.jokeVote}>
        //                                 <i data-id={joke.id} className="fas fa-thumbs-down" />
        //                             </button>

        //                             <span className="JokeClass-votes">{joke.votes}</span>
        //                         </div>

        //                         <div className="Joke-text">{joke.joke}</div>
        //                     </div>
        //                 )
        //             })
        //         }
        //         {/* <div>Current count: {count}</div>
        //         <div>
        //             <button onClick={() => this.setState({ count: count - 1 })}>
        //                 -
        //             </button>
        //             <button onClick={() => this.setState({ count: count + 1 })}>
        //                 +
        //             </button>
        //         </div> */}
        //     </div>
        // );
    }
}

export default JokeClass;
