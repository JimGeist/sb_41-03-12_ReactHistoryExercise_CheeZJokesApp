import React from "react";
import logo from './logo.svg';
import axios from "axios";

import "./JokeClass.css";

class JokeClass extends React.Component {
    constructor(props) {

        super(props);
        this.state = { jokes: [] };
        this.numJokesToGet = props.numJokesToGet || 10;

        this.setJokes = this.setJokes.bind(this);
        this.jokeVote = this.jokeVote.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);

    }

    setJokes(newJokes) {
        // set state to the the jokes passed in newJokes.

        this.setState({ jokes: [...newJokes] });

    }

    /**
     * getJokes() method calls the jokes api for jokes and saves the jokes to state. 
     * The getJokes() method requires nbrJokes, jokes, and setJokesFx arguments. getJokes() 
     * does not return values but it does call a function to alter state.
     * @param {*} nbrJoke is the number of jokes to retrieve.   
     * @param {*} jokes is an array that is either empty or it holds the jokes to keep
     *  (locked jokes). Lock joke functionality was not implemented.  
     * @param {*} setJokesFx is the function to use to add the jokes retrieved to 
     *  state.
     */
    async getJokes(nbrJokes, jokes, setJokesFx) {

        let j = [...jokes];

        // not sure why seenJokes is here an not a constructor value.
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
                } else {
                    console.error("duplicate found!");
                }
            }

            setJokesFx(j);

        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        // component mounted. This is a do once thing -- the the jokes.
        if (this.state.jokes.length === 0) this.getJokes(this.numJokesToGet, this.state.jokes, this.setJokes);

    }


    // componentDidUpdate() {
    //     console.log("componentDidUpdate");
    // }


    jokeVote(event) {

        // make a copy of the className and get the joke id from data.id. Copies were made because 
        //  I am not sure when event is recycled by React.
        const holdClassName = (event.target.className).slice();
        const holdJokeID = event.target.dataset.id;

        let ctrAdjust = 1;
        if (holdClassName.indexOf("fa-thumbs-down") > -1) ctrAdjust = -1

        // create a deep copy of state.jokes in jokesVote. Updates to the vote counter occur in the
        //  jokesVote array and that array is later saved to state.
        const jokesVote = [...this.state.jokes]

        // Find the array index for the joke associated with the joke.id that was saved in the button's 
        //  data-id argument.
        const idxJoke = jokesVote.findIndex((joke) => {
            return joke.id === holdJokeID
        });

        // Not sure if it is related to rapid button click, but sometimes a jokesVote[idxJoke] is undefined.
        // We'll do a truthy test on it.
        if (jokesVote[idxJoke]) {
            jokesVote[idxJoke].votes = jokesVote[idxJoke].votes + ctrAdjust;

            this.setState({ jokes: jokesVote });

        }

    }

    generateNewJokes() {
        this.getJokes(this.numJokesToGet, [], this.setJokes);
    }


    render() {

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
            return (
                <div>
                    {/* <i className="fas fa-cog App-logo" /> */}

                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            );

        }

    }
}

export default JokeClass;
