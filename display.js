const params=new URLSearchParams(location.search);
const room=params.get("room");
const defaultState={
  league:"ENDER LEAGUE",status:"EN DIRECTO",
  home:{name:"ENDER FC",short:"END",logo:"https://placehold.co/96x96/6d28d9/ffffff?text=EL",score:0,yellow:0,red:0},
  away:{name:"NETHER FC",short:"NTH",logo:"https://placehold.co/96x96/6d28d9/ffffff?text=EL",score:0,yellow:0,red:0},
  clock:0,running:true
};
let state=defaultState,last=Date.now(),conn=null;
const $=id=>document.getElementById(id);

function render(){
  $("league").textContent=state.league;
  $("status").textContent=state.status;
  $("homeName").textContent=state.home.name;
  $("awayName").textContent=state.away.name;
  $("homeShort").textContent=state.home.short||state.home.name.slice(0,3).toUpperCase();
  $("awayShort").textContent=state.away.short||state.away.name.slice(0,3).toUpperCase();
  $("homeLogo").src=state.home.logo;
  $("awayLogo").src=state.away.logo;
  $("homeScore").textContent=state.home.score;
  $("awayScore").textContent=state.away.score;
  $("homeYellow").textContent=state.home.yellow;
  $("homeRed").textContent=state.home.red;
  $("awayYellow").textContent=state.away.yellow;
  $("awayRed").textContent=state.away.red;
  renderClock();
}
function renderClock(){
  const t=Math.max(0,Math.floor(state.clock));
  $("clock").textContent=String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0");
}
function goal(team){
  $("goalTeam").textContent=state[team]?.name||"ENDER FC";
  const e=$("goal");
  e.classList.remove("active"); void e.offsetWidth; e.classList.add("active");
  setTimeout(()=>e.classList.remove("active"),3000);
}

if(room){
  // IMPORTANT: the OBS/display page connects TO the control page.
  // The control page owns the PeerJS ID contained in ?room=...
  const peer=new Peer(undefined,{debug:0});

  peer.on("open",()=>{
    conn=peer.connect(room,{reliable:true});
    conn.on("open",()=>{
      conn.send({type:"REQUEST_STATE"});
    });
    conn.on("data",(msg)=>{
      if(msg.type==="STATE"){
        state=JSON.parse(JSON.stringify(msg.state));
        last=Date.now();
        render();
      }
      if(msg.type==="GOAL"){
        // State is normally sent immediately before this event.
        goal(msg.team);
      }
    });
    conn.on("close",()=>{conn=null});
  });

  peer.on("error",(err)=>{
    console.warn("PeerJS display error:",err);
  });
}

setInterval(()=>{
  if(state.running){
    state.clock+=(Date.now()-last)/1000;
    last=Date.now();
    renderClock();
  }else{
    last=Date.now();
  }
},1000);

render();
