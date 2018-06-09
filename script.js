class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            isRunning: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        }
    }
    reset() {
        if (!this.state.running) {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }
    start() {
        if (!this.state.isRunning) {
            this.setState({ isRunning: true });
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() { 
        if (!this.state.isRunning) return;
        this.calculate(); 
    }
    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;

        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({ times }); 
    }
    stop() { 
        this.setState({ isRunning: false });
        clearInterval(this.watch);
    }
    save() {
        this.setState(prevState => ({
            results: [...prevState.results, format(this.state.times)]
        }));
    }
    delete() { 
      const x = confirm("Are you sure ?");
        if (x) {
            this.setState({results: []});
        }
    }
    getList() {
        return (
            this.state.results.map((item, index) => {
                return (<li key={index}>{`${index + 1}. ${item}`}</li>);
            })
        );
    }
    render() {
        return (
            <div>
                <nav className='controls'>
                    <button type="button" className='btn btn-success' onClick={() => this.start()}>Start</button>
                    <button type="button" className='btn btn-danger' onClick={() => this.stop()}>Stop</button>
                    <button type="button" className='btn btn-secondary ' onClick={() => this.reset()}>Reset</button>
                    <button type="button" className='btn btn btn-info' onClick={() => this.save()}>Save</button>
                    <button type="button" className='btn btn-warning' onClick={() => this.delete()}>Delete Results</button>
                </nav>
                <div className='stopwatch'>{format(this.state.times)}</div>
                <p>THE RESULTS</p>
                <ul className='list-result'>{this.getList()}</ul>
            </div>
        );
    }
}

const pad0 = (value) => {
    const result = value.toString();
    return result.length < 2 ? `0${result}` : result;
};
const format = times => `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

ReactDOM.render(<Stopwatch />, document.getElementById('app'));


