var myname = "Developer";
var score = 0;


function increasescore(points) {
    score = score + points;
    return score;
}

function getwelcomemessage() {
    return "Welcome " + myname;
}

//testing

increasescore(10);
console.log(getwelcomemessage());
console.log(score);