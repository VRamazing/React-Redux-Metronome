const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Header = ({val}) => ( <h1 className = "mainHeader">{val}</h1>);

const Slider = ({min, max, val, step, onChange}) => (<input className="beatSlider slider is-success is-circle"
															 step={step} min={min} max={max} value={val} 
															 onChange={onChange} type="range" />);
const initialState = {
  beats : 40
};

const INC = 'INC';
const DEC = 'DEC';
const CHANGE = 'CHANGE';




function reducer(state, action) {
	switch(action.type) {
		case INC:
			return { beats: state.beats + 1 };
		case DEC:
			return { beats: state.beats - 1 };
		case CHANGE:
			return { beats: parseInt(action.value)};
		default:
			return state;	
	}
}

const store = Redux.createStore(reducer, initialState);

const mapStateToProps = (state) => { return {state: state}} 

const mapDispatchToProps = (dispatch) => {
  return {
    incBeatCount: function(){
      dispatch({type: INC});
    },
    decBeatCount: () => {
      dispatch({type: DEC});
    },
	changeBeatCount: (value) => {
      dispatch({type: CHANGE, value: value});
    }
  }
};

class App extends React.Component{
  metroInterval;
  playing : false;
  constructor(props){
  	super(props);  	
  	this.playBeat = this.playBeat.bind(this);
  	this.pauseBeat = this.pauseBeat.bind(this);
  	this.sliderInputChange = this.sliderInputChange.bind(this);
  	this.incBeat = this.incBeat.bind(this);
  	this.decBeat = this.decBeat.bind(this);
  }

 playBeat(){
 	if(this.metroInterval  !=null){
 		clearInterval(this.metroInterval);
 	}
 	this.playing = true;
 	this.metroInterval = setInterval(function(){
 		document.getElementById("audioLoop").play();
 	}, 1000 * 60/store.getState().beats);
 }

 pauseBeat(){
 	if(this.metroInterval!=null){
 		this.playing = false;
 		clearInterval(this.metroInterval);
 	}
 }

 sliderInputChange(event){
	this.props.changeBeatCount(event.target.value);
	if(this.metroInterval != undefined && this.playing){
		this.playBeat();
 	}
 }

 incBeat(){
 	this.props.incBeatCount();
 	if(this.metroInterval != undefined && this.playing){
		this.playBeat();
 	}
 }

 decBeat(){
 	this.props.decBeatCount();
	if(this.metroInterval != undefined && this.playing){
		this.playBeat();
 	}
 }


 render(){
    return(<div className = "mainDiv">

    			<Header val = "Metronome" />

				<div>
					<span style = {{fontSize: "30px"}}> {this.props.state.beats} </span> BPM 
					<button className="button play" onClick = {this.playBeat}>Play</button>  
					<button className="button info pause" onClick = {this.pauseBeat}>Pause</button>  
				</div>  

    			<br />

				<button className="button manip" onClick = {this.decBeat}>-</button>

    			<Slider min={10} max={250} val={store.getState().beats} step = {1} 
    			onChange={this.sliderInputChange}/>
  
				<button className="button manip" onClick = {this.incBeat}  >+</button>

				<audio id="audioLoop" >
				  <source src="./metronome.wav" type="audio/wav" id = "drumLoop"/>
				  Your browser does not support the audio element.
				</audio>
				
    	   </div>)
	  }
}

const AppWrapper = connect(
					mapStateToProps,
					mapDispatchToProps
				)(App);

ReactDOM.render(<Provider store={store}><AppWrapper /></Provider>, document.getElementById("app"));
