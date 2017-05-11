$(document).ready(function(){

var ammonium = {name:"Ammonium", formula:"NH4", charge:"+"};
var nitrite = {name:"Nitrite", formula:"NO2", charge:"-"};
var nitrate = {name:"Nitrate", formula:"NO3", charge:"-"};
var sulfite = {name:"Sulfite", formula:"SO3", charge:"2-"};
var sulfate = {name:"Sulfate", formula:"SO4", charge:"2-"};
var hydrogenSulfate = {name:"Hydrogen Sulfate", formula:"HSO4", charge:"-"};
var hydroxide = {name:"Hydroxide", formula:"OH", charge:"-"};
var cyanide = {name:"Cyanide", formula:"CN", charge:"-"};
var phosphate = {name:"Phosphate", formula:"PO4", charge:"3-"};
var hydrogenPhosphate = {name:"Hydrogen Phosphate", formula:"HPO4", charge:"2-"};
var dihydrogenPhosphate = {name:"Dihydrogen Phosphate", formula:"H2PO4", charge:"-"};
var carbonate = {name:"Carbonate", formula:"CO3", charge:"2-"};
var hydrogenCarbonate = {name:"Hydrogen Carbonate", formula:"HCO3", charge:"-"};
var hypochlorite = {name:"Hypochlorite", formula:"ClO", charge:"-"};
var chlorite = {name:"Chlorite", formula:"ClO2", charge:"-"};
var chlorate = {name:"Chlorate", formula:"ClO3", charge:"-"};
var perchlorate = {name:"Perchlorate", formula:"ClO4", charge:"-"};
var acetate = {name:"Acetate", formula:"C2H3O2", charge:"-"};
var permanganate = {name:"Permanganate", formula:"MnO4", charge:"-"};
var dichromate = {name:"Dichromate", formula:"Cr2O7", charge:"2-"};
var chromate = {name:"Chromate", formula:"CrO4", charge:"2-"};
var peroxide = {name:"Peroxide", formula:"O2", charge:"2-"};
var questionPool = [ammonium,
                    nitrite,
                    nitrate,
                    sulfite,
                    sulfate,
                    hydrogenSulfate,
                    hydroxide,
                    cyanide,
                    phosphate,
                    hydrogenPhosphate,
                    dihydrogenPhosphate,
                    carbonate,
                    hydrogenCarbonate,
                    hypochlorite,
                    chlorite,
                    chlorate,
                    perchlorate,
                    acetate,
                    permanganate,
                    dichromate,
                    chromate,
                    peroxide];

var boost = ["GOOD JOB!", "CORRECT!", "KEEP IT UP!", "AWESOME!", "THAT'S RIGHT!", "SWEET!", "You're doing GREAT!", "NICE!"];
var boostRand = boost[Math.floor(Math.random() * boost.length)];

var rand = questionPool[Math.floor(Math.random() * questionPool.length)];
var randomName = rand.name
var randomFormula = rand.formula
var randomCharge = rand.charge

var rightFx = $("#right")[0];
var wrongFX = $("#wrong")[0];


var correctCount = 0

function cleartext(){
     document.getElementById("userInput1").value="";
     document.getElementById("userInput2").value="";
};

function textborder(){
     $("#userInput1").css("border-color", "#00ccff");
     $("#userInput2").css("border-color", "#00ccff");
};

$("#question").append(randomName);
$("#userInput1").focus();

var next = function(){
     $("#question").empty();
     
     textborder();
     
     cleartext();

     var rand1 = questionPool[Math.floor(Math.random() * questionPool.length)];
     var boostRand1 = boost[Math.floor(Math.random() * boost.length)];
     
     randomName = rand1.name
     randomFormula = rand1.formula
     randomCharge = rand1.charge
     boostRand = boostRand1

     $("#question").append(randomName)
     $("#userInput1").focus();

}

function check(){

     var input = document.getElementById("userInput1").value
     var input2 = document.getElementById("userInput2").value


     $("#response").empty();

     if (input === randomFormula && input2 === randomCharge){
          $("#response").empty();
          correctCount++;
          $("#response").append("<h1>" + boostRand + "</h1>" + "<p>Current Streak</p>" + "<h2>" + correctCount + "</h2>")
          $("#response").removeClass("responseBad");
          $("#response").addClass("responseGood");
          rightFx.play();
          next();
     }else if(input === randomFormula && input2 != randomCharge){
          $("#response").empty();
          $("#response").append("<h1>WRONG CHARGE</h1>");
          $("#response").addClass("responseBad");
          $("#userInput2").css("border-color", "red");
          $("#userInput1").css("border-color", "#00ccff");
          wrongFX.play();
          correctCount = 0
          document.getElementById("userInput2").value="";
     }else if(input != randomFormula && input2 === randomCharge){
          $("#response").empty();
          $("#response").append("<h1>WRONG FORMULA</h1>");
          $("#response").addClass("responseBad");
          $("#userInput1").css("border-color", "red");
          $("#userInput2").css("border-color", "#00ccff");
          $("#userInput1").focus();
          wrongFX.play();
          correctCount = 0
          document.getElementById("userInput1").value="";
     }else{
          $("#response").empty();
          $("#response").append("<h1>TOTALLY WRONG</h1>")
          $("#response").addClass("responseBad");
          $("#userInput1").css("border-color", "red");
          $("#userInput2").css("border-color", "red");
          $("#userInput1").focus();
          wrongFX.play();
          correctCount = 0
          cleartext();
     };

     console.log(input);
     
}

$("#goButton").click(check);

$("#userInput1").keyup(function(event){
     if (event.keyCode == 13){
          $("#userInput2").focus();
     };
});

$("#userInput2").keyup(function(event){
     if (event.keyCode == 13){
          $("#goButton").click();
     };
});




});