const ws = new WebSocket("ws://127.0.0.1:5001");//c++ server
var username_show;
let k;
const chatMe= document.querySelector('.chat');


ws.addEventListener('open', function(event){
  ws.send('Welcome');
  console.log("data sent");
});
ws.addEventListener('message', function(event){
  console.log("server send something");
  let mess=event.data;
  console.log(mess);
  username_show=" ";
  for(let i =0; i<mess.length;i++){
    if(mess[i]===" "){
      k=i;
    }
  }
  for(let i=k+1;i<mess.length;i++){
    username_show+=mess[i];
  }
  console.log("username: ",username_show);
  if(username_show===null){
    console.log("*username is null*");
    username_show="web_user";
  }
  if(user===1){
    update_chat_mine(mess);
  }
  else{
    update_chat_other(mess);
  }
  chatMe.scrollTop = chatMe.scrollHeight;
});


function send_data(){
  username_send=localStorage.getItem("username")
  console.log("button clicked");
  ws.send(document.getElementById("input_text").value+" "+username_send);
  user=1;
  document.getElementById("input_text").value="";
  document.getElementById("input_text").focus();
};


function update_chat_mine(mess){
  let only_mess=" ", space;
  for(let i=0;i<mess.length;i++){
    if(mess[i]==" "){
      space=i;
      continue;
    }
  }
  for(let i=0;i<space;i++){
    only_mess+=mess[i];
  }
  user=0;
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var time = today.getHours()+":" + today.getMinutes();
  var dateTime = time+" "+date;
  console.log('I am going to update the chat room')
  const li = document.createElement('li');
  li.classList.add('me');
  li.innerHTML = `<div class="entete">
    <h3>${dateTime}</h3>
    <h2 style="color:white">${username_show}</h2>
    <span class="status blue"></span>
  </div>
  <div class="message">
    ${only_mess}
  </div>`;
  document.querySelector('.chat').appendChild(li);
}

function update_chat_other(mess){
  let only_mess=" ", space;
  for(let i=0;i<mess.length;i++){
    if(mess[i]==" "){
      space=i;
      continue;
    }
  }
  for(let i=0;i<space;i++){
    only_mess+=mess[i];
  }
  user=0;
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var time = today.getHours()+":" + today.getMinutes();
  var dateTime = date+' '+time;
  console.log('I am going to update the chat room')
  const li = document.createElement('li');
  li.classList.add('you');
  li.innerHTML = `<div class="entete">
    <h3>${dateTime}</h3>
    <h2 style="color:white">${username_show}</h2>
    <span class="status green"></span>
  </div>
  <div class="message" style="color:white">
    ${only_mess}
  </div>`;
  document.querySelector('.chat').appendChild(li);
}

function get_username(){
  localStorage.clear();
  let username = document.getElementById("username").value;
  localStorage.setItem("username", username);
  document.getElementById("show_username").innerHTML=localStorage.getItem("username");
}

function quit(){
  window.close();
}

function minimize(){
  window.minimize();
}
