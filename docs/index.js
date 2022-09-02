let maP;
let miP;
let otP;
let want;
let isTest;
let numMa;
let numMi;
let isOther;
let numOt;
let doSave;
let majors;
let minors;
let others;

//TURNING SAVE TO TRUE OR FALSE
function save() {
    let save = document.getElementById("save");
    if (parseInt(save.className) % 2 != 0) {
        doSave = true;
        save.className = parseInt(save.className) + 1;
        save.value = "Saved";
    }
    else if (parseInt(save.className) % 2 == 0) {
        doSave = false;
        save.className = parseInt(save.className) - 1;
        save.value = "Save";
    }
}
//LOAD SAVED 
function loadSaved() {
    load = true;
    maP = parseFloat(localStorage.getItem("maP"));
    miP = parseFloat(localStorage.getItem("miP"));
    otP = parseFloat(localStorage.getItem("otP"));
    want = parseFloat(localStorage.getItem("want"));
    isTest = localStorage.getItem("isTest");
    document.getElementById("otP").value = otP;
    document.getElementById("maP").value = maP;
    document.getElementById("miP").value = miP;
    document.getElementById("want").value = want;
    document.getElementById("isTest").value = isTest;
}
// ADDING GRADES
function addGradesDiv() {
    numMa = document.getElementById("numMa").value;
    numMi = document.getElementById("numMi").value;
    
    document.getElementById("contain").style.visibility = "visible";

    var major = document.getElementById("majors");
    var minor = document.getElementById("minors");
    
    while (major.hasChildNodes()) {
        major.removeChild(major.lastChild);
    }

    while (minor.hasChildNodes()) {
        minor.removeChild(minor.lastChild);
    }

    if (numMa == 0 && numMi == 0) {
        document.getElementById("contain").style.visibility = "hidden";
        return;
    }

    for (let i = 0; i < numMa; i++) {
        var p = major.appendChild(document.createElement("label"));
            p.textContent = "Major Grade " + (i + 1);
            p.className = "label";
            major.appendChild(p);
        major.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "ma" + i;
        input.className = "input";
        input.placeholder = "Major Grade " + (i + 1);

        major.appendChild(input);
        major.appendChild(document.createElement("br"));
        if (i + 1 == numMa) {
            major.appendChild(document.createElement("br"));
        }
    }
    for (let i = 0; i < numMi; i++) {
        var p = minor.appendChild(document.createElement("label"));
            p.textContent = "Minor Grade " + (i + 1);
            p.className = "label";
            minor.appendChild(p);
        minor.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.type = "number";
        input.id = "mi" + i;
        input.className = "input";
        input.placeholder = "Minor Grade " + (i + 1);

        minor.appendChild(input);
        minor.appendChild(document.createElement("br"));
    }
}

//OTHER DIV
function addOtherDiv() {
    isOther = true;
    document.getElementById("containOther").style.visibility = "visible";
    var addOther = document.getElementById("addOther");

    while (addOther.hasChildNodes()) {
        addOther.removeChild(addOther.lastChild);
    }

    var inputOther = document.createElement("input");
    inputOther.type = "number";
    inputOther.id = "numOt";
    inputOther.className = "input";
    inputOther.placeholder = "Number of Other Grades";

    addOther.appendChild(inputOther);
    addOther.appendChild(document.createElement("br"));

    var submit = document.createElement("BUTTON");
    submit.id = "submitNumOther";
    submit.textContent = "Add Others";
    submit.onclick = function() {
        numOt = document.getElementById("numOt").value;

        var other = document.getElementById("others");
    
        while (other.hasChildNodes()) {
            other.removeChild(other.lastChild);
        }
    
        for (let i = 0; i < numOt; i++) {
            var p = other.appendChild(document.createElement("label"));
            p.textContent = "Other Grade " + (i + 1);
            p.className = "label";
            other.appendChild(p);
            other.appendChild(document.createElement("br"));
    
            var input = document.createElement("input");
            input.type = "number";
            input.id = "ot" + i;
            input.className = "input";
            input.placeholder = "Other Grade " + (i + 1);
    
            other.appendChild(input);
            other.appendChild(document.createElement("br"));
            if (i + 1 == numOt) {
                other.appendChild(document.createElement("br"));
            }
        }        
    }

    addOther.appendChild(submit);
    addOther.appendChild(document.createElement("br"));
    addOther.appendChild(document.createElement("br"));

    var remove = document.createElement("BUTTON");
    remove.textContent = "Remove Others"; 
    remove.onclick = function() {
        document.getElementById("containOther").style.visibility = "hidden";
        isOther = false;
        while (addOther.hasChildNodes()) {
            addOther.removeChild(addOther.lastChild);
        }
        while (addOther.hasChildNodes()) {
            addOther.removeChild(addOther.lastChild);
        }
    }
    addOther.appendChild(remove);
    addOther.appendChild(document.createElement("br"));
}

// SUBMIT
function Submit() {
    var gNeed = 0;
    majors = [numMa];
    minors = [numMi];
    maP = document.getElementById("maP").value;
    miP = document.getElementById("miP").value;
    otP = document.getElementById("otP").value;
    want = parseFloat(document.getElementById("want").value);
    isTest = document.getElementById("isTest").value;
    for (let i = 0; i < numMa; i++) {
        majors[i] = document.getElementById("ma" + i).value;
    }
    for (let i = 0; i < numMi; i++) {
        minors[i] = document.getElementById("mi" + i).value;
    }

    if (isOther) {
        others = [numOt];
        for (let i = 0; i < numOt; i++) {
            others[i] = document.getElementById("ot" + i).value;
        }
        otP = avg(others) * 0.001
    }

        if (isTest == "test") {
            let miAvg = avg(minors);
            for (let i = 0; i < 130; i++) {
                majors.push(i);
                if ((miAvg * miP) + (avg(majors) * maP) + (100 * otP) >= want) {
                    gNeed = i;
                    break;
                }
                majors.pop();
            }
        }

        if (isTest == "quiz") {
            let maAvg = avg(majors);
            for (let i = 0; i < 130; i++) {
                minors.push(i);
                if ((avg(minors) * miP) + (maAvg * maP) + (100 * otP) >= want) {
                    gNeed = i;
                    break;
                }
                minors.pop();
            }
        }
    document.getElementById("gNeeded").style.visibility = "visible";
    var grade = document.getElementById("grade");
    if (grade.hasChildNodes()) {
        grade.removeChild(grade.lastChild);
    }
    grade.appendChild(document.createTextNode(gNeed));
    if (doSave) {
        localStorage.setItem("maP", maP);
        localStorage.setItem("miP", miP);
        localStorage.setItem("otP", otP);
        localStorage.setItem("want", want);
        localStorage.setItem("isTest", isTest);
        localStorage.setItem("numMa", numMa);
        localStorage.setItem("numMi", numMi);
        localStorage.setItem("isOther", isOther);
        localStorage.setItem("numOt", numOt);
        localStorage.setItem("majorsArr", JSON.stringify(majors));
        localStorage.setItem("minorsArr", JSON.stringify(minors));
        localStorage.setItem("othersArr", JSON.stringify(others));
        console.log(localStorage);
    }
}

// let maP;
// let miP;
// let otP;
// let want;
// let isTest;
// let numMa;
// let numMi;
// let isOther;
// let numOt;
function avg(grades) {
    let sum = 0.0;
    for (let i = 0; i < grades.length; i++) {
        sum += parseInt(grades[i]);
    }
    return sum / grades.length;
}
