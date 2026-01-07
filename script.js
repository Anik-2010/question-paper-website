// Extracted from Easy-Exam.HTML

let cls="", sub="", board="";
const msg = document.getElementById("msg");
const robot = document.querySelector(".robot");
const pupils = document.querySelectorAll(".pupil");

/* Selection Logic */
function selectClass(v,e){
    cls=v;
    document.querySelectorAll(".class-card").forEach(c=>c.classList.remove("active"));
    e.classList.add("active");
}
function selectSubject(v,e){
    sub=v;
    document.querySelectorAll(".subject-card").forEach(c=>c.classList.remove("active"));
    e.classList.add("active");
}
function selectBoard(v,e){
    board=v;
    document.querySelectorAll(".board-card").forEach(c=>c.classList.remove("active"));
    e.classList.add("active");
}

/* Result / Paper Logic */
function viewPaper(){
    if(!cls||!sub||!board){
        msg.textContent="Please select class, subject and board.";
        return;
    }
    msg.style.color = "#065f46";
    msg.textContent="📘 Coming soon for students!";
}
function viewResult(){
    if(!cls||!board){
        msg.textContent="Please select class and board.";
        return;
    }
    msg.style.color = "#065f46";
    msg.textContent="📊 Result coming soon!";
}

/* Desktop Interaction */
document.addEventListener("mousemove",e=>{
    const lean=(e.clientX/window.innerWidth - 0.5) * 20;
    robot.style.transform=`rotate(${lean}deg)`;

    const dx=Math.max(-4,Math.min(4,(e.clientX/window.innerWidth - 0.5) * 8));
    pupils.forEach((p,i)=>p.setAttribute("cx",i?90+dx:70+dx));
});

/* Improved Mobile Tilt */
if(window.DeviceOrientationEvent){
    if(typeof DeviceOrientationEvent.requestPermission === "function"){
        document.body.addEventListener("click", () => {
            DeviceOrientationEvent.requestPermission().then(res => {
                if(res === "granted") window.addEventListener("deviceorientation", handleTilt);
            });
        }, {once: true});
    } else {
        window.addEventListener("deviceorientation", handleTilt);
    }
}

function handleTilt(e){
    const tilt = Math.max(-15, Math.min(15, e.gamma || 0));
    robot.style.transform = `rotate(${tilt}deg)`;
    const dx = tilt / 4;
    pupils.forEach((p, i) => p.setAttribute("cx", i ? 90 + dx : 70 + dx));
}