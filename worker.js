const MODEL = "@cf/google/gemma-4-26b-a4b-it";

const SYSTEM_PROMPT = `
You are Hilal AI Studio, a high-quality multilingual AI assistant.

LANGUAGE RULES:
1. Always reply in the same language as the user's latest message.
2. When the user writes Pashto, reply in natural Afghan Pashto.
3. Use proper Pashto Arabic script. Never write Pashto using Latin letters.
4. Use correct Pashto grammar, spelling and vocabulary.
5. Avoid unnecessary Dari, Persian or Urdu expressions.
6. Do not mix languages unless requested.
7. Keep answers clear, useful and concise.

ACCURACY RULES:
1. Never invent facts, sources or statistics.
2. If you do not know, say so.
3. Distinguish facts from estimates.
4. Correct mistakes.
5. Answer the actual question directly.

IDENTITY:
You are Hilal AI Studio, a helpful multilingual AI assistant.
Be respectful, accurate and friendly.
`;

const HTML = `<!DOCTYPE html>
<html lang="ps" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#080f20">
<title>Hilal AI Studio</title>

<style>
*{box-sizing:border-box}

body{
margin:0;
font-family:Arial,sans-serif;
background:
radial-gradient(ellipse at 50% 10%,#193b54 0%,transparent 45%),
linear-gradient(145deg,#080f20,#101b32 60%,#071321);
color:white;
min-height:100vh;
}

header{
text-align:center;
padding:18px 10px 5px;
}

header h2{
color:#75f4d1;
margin:0;
font-size:24px;
text-shadow:0 0 15px #36d9b5;
}

header p{
color:#a9bfd1;
font-size:13px;
}

main{
max-width:850px;
margin:auto;
padding:10px 14px 25px;
}

/* 3D Orb */

.orb-area{
height:205px;
display:flex;
align-items:center;
justify-content:center;
position:relative;
perspective:800px;
}

.orb{
width:112px;
height:112px;
border-radius:50%;
position:relative;
background:
radial-gradient(circle at 30% 25%,
#e5fff8 0%,
#72ffe0 9%,
#1bbdba 35%,
#07517c 70%,
#07182e 100%);
box-shadow:
0 0 20px #28e8c6,
0 0 50px #12b9ce,
0 0 90px #075c9b,
inset -12px -15px 25px #04162c;
animation:float 4s ease-in-out infinite;
}

.orb:before{
content:"";
position:absolute;
inset:-18px;
border-radius:50%;
border:2px solid #6af5df;
opacity:.7;
transform:rotateX(65deg) rotateZ(20deg);
box-shadow:0 0 15px #2be8ce;
animation:spin 7s linear infinite;
}

.orb:after{
content:"";
position:absolute;
inset:-29px;
border-radius:50%;
border:1px solid #3d9eff;
opacity:.6;
transform:rotateX(70deg) rotateZ(-35deg);
animation:spinReverse 10s linear infinite;
}

.orb.speaking{
animation:float .8s ease-in-out infinite,
pulse 1s ease-in-out infinite;
}

.orb.thinking{
animation:float 2s ease-in-out infinite,
pulse 1.5s ease-in-out infinite;
}

@keyframes float{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-12px)}
}

@keyframes spin{
from{transform:rotateX(65deg) rotateZ(0deg)}
to{transform:rotateX(65deg) rotateZ(360deg)}
}

@keyframes spinReverse{
from{transform:rotateX(70deg) rotateZ(360deg)}
to{transform:rotateX(70deg) rotateZ(0deg)}
}

@keyframes pulse{
0%,100%{filter:brightness(1)}
50%{filter:brightness(1.8)}
}

.orb-label{
position:absolute;
bottom:4px;
font-size:13px;
color:#8eead9;
letter-spacing:1px;
}

/* Chat */

#messages{
height:43vh;
min-height:260px;
overflow-y:auto;
padding:12px;
border:1px solid #29445e;
border-radius:18px;
background:rgba(13,27,46,.78);
backdrop-filter:blur(12px);
box-shadow:0 8px 30px #0005;
}

.message{
padding:13px;
margin:10px 0;
border-radius:13px;
line-height:1.9;
white-space:pre-wrap;
overflow-wrap:anywhere;
}

.user{
background:linear-gradient(120deg,#15506a,#1e415d);
margin-right:30px;
border:1px solid #287b91;
}

.ai{
background:linear-gradient(120deg,#202f49,#263c50);
margin-left:30px;
border:1px solid #3b6073;
}

.controls{
display:flex;
gap:8px;
margin-top:12px;
}

textarea{
flex:1;
min-width:0;
resize:vertical;
min-height:55px;
max-height:140px;
padding:13px;
border-radius:13px;
border:1px solid #3e7184;
background:#101e32;
color:white;
font-size:16px;
outline:none;
}

textarea:focus{
border-color:#5af0cf;
box-shadow:0 0 10px #25cbb455;
}

button{
border:0;
border-radius:12px;
padding:12px 15px;
background:linear-gradient(135deg,#54e6c2,#22b89e);
color:#06251f;
font-size:14px;
font-weight:bold;
cursor:pointer;
}

button:disabled{
opacity:.5;
cursor:not-allowed;
}

.tools{
display:flex;
flex-wrap:wrap;
gap:8px;
margin-top:12px;
}

.tools button{
background:#243a55;
color:#e5f7ff;
border:1px solid #42617c;
}

select{
padding:10px;
border-radius:10px;
background:#15263d;
color:white;
border:1px solid #42617c;
}

#status{
color:#9bc8d2;
font-size:13px;
padding:12px 3px;
}

@media(max-width:480px){
.orb-area{height:185px}
#messages{height:42vh}
.controls button{padding:10px}
}
</style>
</head>

<body>

<header>
<h2>🌙 Hilal AI Studio</h2>
<p>ستاسو هوښیار مرستیال | Your AI Assistant</p>
</header>

<main>

<div class="orb-area">
<div class="orb" id="orb"></div>
<div class="orb-label" id="orbLabel">HILAL AI READY</div>
</div>

<div id="messages">
<div class="message ai">
سلام! زه Hilal AI یم. څه ډول مرسته درسره وکړم؟
</div>
</div>

<div class="controls">
<textarea id="input"
placeholder="خپله پوښتنه ولیکئ..."></textarea>
<button id="send" onclick="sendMessage()">لېږل</button>
</div>

<div class="tools">

<button onclick="startMic()">🎤 مایکروفون</button>

<button onclick="readLastAnswer()">🔊 ځواب واوره</button>

<button onclick="stopSpeaking()">⏹ غږ بندول</button>

<button onclick="clearChat()">🗑 پاکول</button>

<select id="voiceLang">
<option value="ps-AF">پښتو</option>
<option value="fa-IR">دري</option>
<option value="en-US">English</option>
</select>

</div>

<div id="status">چمتو دی</div>

</main>

<script>
const messagesBox = document.getElementById("messages");
const input = document.getElementById("input");
const statusBox = document.getElementById("status");
const sendButton = document.getElementById("send");
const voiceLang = document.getElementById("voiceLang");
const orb = document.getElementById("orb");
const orbLabel = document.getElementById("orbLabel");

let conversation = [];
let lastAnswer = "";
let speechAllowed = false;
let recognition = null;

function setState(state,label){
orb.className = "orb";

if(state === "thinking"){
orb.classList.add("thinking");
}

if(state === "speaking"){
orb.classList.add("speaking");
}

orbLabel.textContent = label;
}

function addMessage(text,type){
const div = document.createElement("div");
div.className = "message " + type;
div.textContent = text;
messagesBox.appendChild(div);
messagesBox.scrollTop = messagesBox.scrollHeight;
return div;
}

function normalizeCommand(text){
return text
.toLowerCase()
.replace(/[؟?!،,.؛:]/g," ")
.replace(/\s+/g," ")
.trim();
}

function isDisableSpeechCommand(text){
const commands = [
"متن په غږ مه وایه",
"ته متن په غږ مه وایه",
"متن په غږ مه لوله",
"ځواب په غږ مه وایه",
"ځواب په غږ مه لوله",
"په غږ یې مه وایه",
"غږ بند کړه",
"غږ مه کوه",
"نور غږ مه کوه",
"یوازې متن",
"صرف متن",
"اتومات غږ بند کړه",
"غږیز لوستل بند کړه"
];

return commands.some(c => text.includes(c));
}

function isEnableSpeechCommand(text){
const commands = [
"غږیز لوستل فعال کړه",
"غږ فعال کړه",
"غږ چالان کړه",
"دا ځواب په غږ ووایه",
"وروستی ځواب په غږ ووایه",
"وروستی ځواب په غږ ولوله"
];

return commands.some(c => text.includes(c));
}

function handleVoiceCommand(originalText){
const text = normalizeCommand(originalText);

if(isDisableSpeechCommand(text)){
speechAllowed = false;
stopSpeaking();

const reply =
"سمه ده. له دې وروسته به ځوابونه یوازې په لیکلي متن کې وي. غږ به په خپله نه فعالېږي.";

conversation.push(
{role:"user",content:originalText},
{role:"assistant",content:reply}
);

addMessage(reply,"ai");
statusBox.textContent = "یوازې لیکلی متن فعال دی";
return true;
}

if(isEnableSpeechCommand(text)){
speechAllowed = true;

const reply =
"غږیز لوستل فعال شول. ځوابونه به په خپله نه لولم؛ د اورېدو لپاره د غږ تڼۍ وکاروه.";

conversation.push(
{role:"user",content:originalText},
{role:"assistant",content:reply}
);

addMessage(reply,"ai");
statusBox.textContent = "غږیز لوستل فعال شول";
return true;
}

return false;
}

/* Streaming response */

async function sendMessage(){

const text = input.value.trim();
if(!text || sendButton.disabled)return;

addMessage(text,"user");
input.value = "";

if(handleVoiceCommand(text))return;

sendButton.disabled = true;
statusBox.textContent = "ځواب چمتو کېږي...";
setState("thinking","HILAL AI THINKING");

conversation.push({
role:"user",
content:text
});

const aiMessage = addMessage("","ai");
let answer = "";

try{

const response = await fetch("/api/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
messages:conversation.slice(-12)
})
});

if(!response.ok){
let errorData = {};
try{errorData = await response.json()}catch{}
throw new Error(errorData.error || "د سرور ستونزه");
}

if(!response.body){
throw new Error("Streaming په دې براوزر کې نه فعالیږي.");
}

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = "";

while(true){

const {value,done} = await reader.read();

if(done)break;

buffer += decoder.decode(value,{stream:true});

const lines = buffer.split("\\n");
buffer = lines.pop() || "";

for(const line of lines){

const trimmed = line.trim();

if(!trimmed.startsWith("data:"))continue;

const raw = trimmed.slice(5).trim();

if(!raw || raw === "[DONE]")continue;

try{

const chunk = JSON.parse(raw);

let piece = "";

if(typeof chunk.response === "string"){
piece = chunk.response;
}
else if(typeof chunk.output_text === "string"){
piece = chunk.output_text;
}
else if(typeof chunk.choices?.[0]?.delta?.content === "string"){
piece = chunk.choices[0].delta.content;
}
else if(typeof chunk.choices?.[0]?.message?.content === "string"){
piece = chunk.choices[0].message.content;
}

if(piece){
answer += piece;
aiMessage.textContent = answer;
messagesBox.scrollTop = messagesBox.scrollHeight;
}

}catch(error){
// د SSE غیر JSON کرښې له پامه غورځول کېږي.
}

}

}

if(!answer.trim()){
throw new Error("د AI ځواب تش دی.");
}

conversation.push({
role:"assistant",
content:answer
});

lastAnswer = answer;

statusBox.textContent = "ځواب ترلاسه شو";
setState("ready","HILAL AI READY");

}catch(error){

aiMessage.textContent =
"بښنه غواړم، ستونزه پېښه شوه: " + error.message;

statusBox.textContent = "ستونزه پېښه شوه";
setState("ready","HILAL AI READY");

}finally{

sendButton.disabled = false;
input.focus();

}

}

input.addEventListener("keydown",function(event){
if(event.key === "Enter" && !event.shiftKey){
event.preventDefault();
sendMessage();
}
});

function clearChat(){

conversation = [];
lastAnswer = "";

messagesBox.innerHTML = "";

addMessage(
"سلام! زه Hilal AI یم. څه ډول مرسته درسره وکړم؟",
"ai"
);

stopSpeaking();
statusBox.textContent = "چمتو دی";
setState("ready","HILAL AI READY");

}

function readLastAnswer(){

if(!lastAnswer){
statusBox.textContent = "د اورېدو لپاره ځواب نشته.";
return;
}

if(!speechAllowed){
statusBox.textContent = "لومړی ولیکه: غږیز لوستل فعال کړه";
return;
}

speak(lastAnswer);

}

function speak(text){

if(!("speechSynthesis" in window)){
statusBox.textContent = "براوزر د غږ لوستلو ملاتړ نه کوي.";
return;
}

const synth = window.speechSynthesis;
synth.cancel();

const lang = voiceLang.value || "ps-AF";
const prefix = lang.split("-")[0].toLowerCase();

function startSpeaking(){

const voices = synth.getVoices();

const voice = voices.find(v =>
v.lang.toLowerCase().startsWith(prefix)
);

if(!voice && prefix === "ps"){
statusBox.textContent = "د پښتو غږ په موبایل کې ونه موندل شو.";
return;
}

const utterance = new SpeechSynthesisUtterance(text);

if(voice){
utterance.voice = voice;
utterance.lang = voice.lang;
}else{
utterance.lang = lang;
}

utterance.rate = 0.88;
utterance.pitch = 1;
utterance.volume = 1;

utterance.onstart = () => {
statusBox.textContent = "ځواب په غږ لوستل کېږي...";
setState("speaking","HILAL AI SPEAKING");
};

utterance.onend = () => {
statusBox.textContent = "چمتو دی";
setState("ready","HILAL AI READY");
};

utterance.onerror = event => {
statusBox.textContent = "د غږ ستونزه: " + event.error;
setState("ready","HILAL AI READY");
};

synth.speak(utterance);

}

if(synth.getVoices().length){
startSpeaking();
}else{

let started = false;

const onChanged = () => {
if(started)return;

if(synth.getVoices().length){
started = true;
synth.removeEventListener("voiceschanged",onChanged);
startSpeaking();
}
};

synth.addEventListener("voiceschanged",onChanged);

setTimeout(()=>{
if(!started){
started = true;
synth.removeEventListener("voiceschanged",onChanged);
startSpeaking();
}
},1500);

}

}

function stopSpeaking(){

if("speechSynthesis" in window){
window.speechSynthesis.cancel();
}

statusBox.textContent = "غږ بند شو";
setState("ready","HILAL AI READY");

}

function startMic(){

const Recognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!Recognition){
statusBox.textContent = "براوزر د مایکروفون ملاتړ نه کوي.";
return;
}

if(recognition){
try{recognition.stop()}catch{}
}

recognition = new Recognition();

recognition.lang = voiceLang.value || "ps-AF";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = () => {
statusBox.textContent = "غږ اورېدل کېږي...";
};

recognition.onresult = event => {
input.value = event.results[0][0].transcript;
statusBox.textContent = "غږ په متن بدل شو";
};

recognition.onerror = event => {
statusBox.textContent = "د مایکروفون ستونزه: " + event.error;
};

recognition.onend = () => {
recognition = null;
};

try{
recognition.start();
}catch(error){
statusBox.textContent = "مایکروفون پیل نه شو.";
}

}

</script>
</body>
</html>`;

export default {

async fetch(request, env){

const url = new URL(request.url);

if(request.method === "OPTIONS"){
return new Response(null,{
headers:{
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods":"GET, POST, OPTIONS",
"Access-Control-Allow-Headers":"Content-Type"
}
});
}

if(url.pathname === "/" && request.method === "GET"){
return new Response(HTML,{
headers:{
"Content-Type":"text/html; charset=UTF-8"
}
});
}

if(url.pathname === "/api/chat" && request.method === "POST"){

try{

if(!env.AI){
throw new Error("Workers AI binding باید د AI په نوم وي.");
}

const body = await request.json();

if(!Array.isArray(body.messages) || !body.messages.length){
return Response.json({
error:"مهرباني وکړئ خپله پوښتنه ولیکئ."
},{status:400});
}

const allowedMessages = body.messages

.filter(m =>
m &&
["user","assistant"].includes(m.role) &&
typeof m.content === "string"
)

.slice(-12)

.map(m => ({
role:m.role,
content:m.content.slice(0,4000)
}));

if(
!allowedMessages.length ||
allowedMessages[allowedMessages.length-1].role !== "user"
){
return Response.json({
error:"د پوښتنې بڼه سمه نه ده."
},{status:400});
}

/* Workers AI Streaming */

const result = await env.AI.run(
MODEL,
{
messages:[
{
role:"system",
content:SYSTEM_PROMPT
},
...allowedMessages
],
stream:true,
max_tokens:900,
temperature:0.3
}
);

if(!result || typeof result.getReader !== "function"){
throw new Error(
"د ماډل Streaming ځواب ترلاسه نه شو. د دې ماډل Streaming ملاتړ باید تایید شي."
);
}

return new Response(result,{
headers:{
"Content-Type":"text/event-stream; charset=utf-8",
"Cache-Control":"no-cache, no-transform",
"Access-Control-Allow-Origin":"*",
"X-Accel-Buffering":"no"
}
});

}catch(error){

console.error("CHAT ERROR:",error);

return Response.json({
error:error.message || "د AI سرور کې ستونزه ده."
},{
status:500,
headers:{
"Access-Control-Allow-Origin":"*"
}
});

}

}

return new Response("Not Found",{status:404});

}

};