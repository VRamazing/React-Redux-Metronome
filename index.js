const Header = ({val}) => ( <h1 className = "mainHeader">{val}</h1>);

const Slider = ({min, max, val, step, onChange}) => (<input className="beatSlider slider is-success is-circle" step={step} min={min} max={max} value={val} onChange={onChange} type="range" />);
class App extends React.Component{
  metroInterval;
  constructor(){
  	super();
  	this.state = { beats : 40};
  	this.beatInc = this.beatInc.bind(this);
  	this.beatDec = this.beatDec.bind(this);
  	this.playBeat = this.playBeat.bind(this);
  	this.pauseBeat = this.pauseBeat.bind(this);
  	this.sliderInputChange = this.sliderInputChange.bind(this);
  }

  beatInc(){
	this.setState({beats : this.state.beats + 1});
  }

  beatDec(){
	this.setState({beats : this.state.beats - 1});
  }

 playBeat(){
 	if(this.metroInterval!=null){
 		clearInterval(this.metroInterval);
 	}
 	this.metroInterval = setInterval(function(){
 		document.getElementById("audioLoop").play();
 	}, 1000 * 60/this.state.beats);
 }

 pauseBeat(){
 	if(this.metroInterval!=null){
 		clearInterval(this.metroInterval);
 	}
 }

 sliderInputChange(event){
	this.setState({beats : event.target.value});
	console.log(this.state);
 }

 render(){
    return(<div className = "mainDiv">

    			<Header val = "Metronome" />
					
				<div>
					<span style = {{fontSize: "30px"}}> {this.state.beats} </span> BPM 
					<button className="button play" onClick = {this.playBeat}>Play</button>  
					<button className="button info pause" onClick = {this.pauseBeat}>Pause</button>  
				</div>  

    			<br />

				<button className="button manip" onClick = {this.beatDec}>-</button>

    			<Slider min={40} max={218} val={this.state.beats} step = {1} onChange={this.sliderInputChange}/>
  
				<button className="button manip" onClick = {this.beatInc}  >+</button>

				<audio id="audioLoop" >
				  <source src="./kick.wav" type="audio/wav" id = "drumLoop"/>
				  Your browser does not support the audio element.
				</audio>
				
    	   </div>)
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
