/*
 * people2groups.js
 * 
 * Copyright 2014 Alex Bueno ( @Phoenix_alx )
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */
 //https://rawgit.com/PhoenixAlx/People2Group/master/
// Variables globales
var Temporizador2 = 0; // ID del Temporizador2
var Context;          // Contexto gráfico
var PosX = 80;         // Posición X del texto
var PosY = 100;        // Posición Y del texto
var PosTexto = 0;     // Caracter actual
var Texto = "";       // Cadena de texto a animar
var maxGroup=0;
var personInGroup=1;


window.onload = initShow;
function initShow(){
	var divElectionGroup= document.getElementById("divElectionGroup");
	divElectionGroup.style.display="none";
	var bSAddPerson= document.getElementById("bSAddPerson");
	bSAddPerson.style.display="none";
}
function randomElectionGroup(){
	//check incomplete group and select incomplete group
	var inGroup=0;
	for (i=0;i<maxGroup;i++){
		var tnumP=document.getElementById("igroup"+(i+1));
		var thnumP=document.getElementById("hgroup"+(i+1));
		var numP=parseInt(tnumP.value);
		var hnumP=parseInt(thnumP.value);
		if(hnumP<numP){
			inGroup=inGroup+1;
		}
	}
	// select incomplete groups
	var vectorNum=new Array(inGroup);
	posVectorNum=0;
	for (i=0;i<maxGroup;i++){
		var tnumP=document.getElementById("igroup"+(i+1));
		var thnumP=document.getElementById("hgroup"+(i+1));
		var numP=parseInt(tnumP.value);
		var hnumP=parseInt(thnumP.value);
		if(hnumP<numP){
			vectorNum[posVectorNum]=i+1;
			posVectorNum=posVectorNum+1;
		}
	}
	//select random incomplete group
	aleatorio = Math.floor(Math.random()*(vectorNum.length)); 
	numElection = vectorNum[aleatorio];
	//show groupSelect and update input and output
	var numFin=-1;
	var Txt="";
	for (var i=0;(i<vectorNum.length && numFin!=numElection);i++){
		if (vectorNum[i] != numElection){
			Txt = Txt+""+vectorNum[i]+"\n";
		}else{
			Txt = Txt+""+vectorNum[i];
		}
		
		
		numFin=vectorNum[i];
	}
	
		AnimarTexto(Txt);
		var groupName="group"+numElection;
		addPersonRandom(groupName);


	
}


// Función que inicia la animación
function AnimarTexto(Txt) {
    clearInterval(Temporizador2);
    var Canvas = document.getElementById("canvasElectionGroup");
    if (Canvas.getContext) { Context = Canvas.getContext("2d");                          }
    else                   { alert("Your browser doesn't support canvas"); return; }
    PosX = 80;
    PosY = 100;
    PosTexto = 0;
    Texto = Txt;
    Context.fillStyle = "#FFFFFF";
    Context.fillRect(0, 0, Context.canvas.width, Context.canvas.height);
    Context.font = 'normal 400 102px sans-serif';
    Temporizador2 = setInterval("PintarCaracter()", 10);
}

// Función que pinta un caracter del texto
// NOTA si se encuentra un salto de linea, calcula la posicion de la nueva linea.
function PintarCaracter() {
    // Si llegamos al final del texto desactivamos el Temporizador2 o el texto es igual al valor que buscamos y salimos
    if (PosTexto == Texto.length) {
        clearInterval(Temporizador2);

        return;
    }
    
    Caracter = Texto.charAt(PosTexto ++);
    // Si el caracter es un salto de linea ajustamos la posición y salimos
    if (Caracter == "\n" || Caracter.charCodeAt(0) == 13) {
		Context.fillStyle = "#FFFFFF";
		Context.fillRect(0, 0, Context.canvas.width, Context.canvas.height);
        PosY = 100;
        PosX = 80;
        return;
    }
    // Pintamos el caracter actual con un color aleatorio
    else {
        // Creamos un color aleatorio
        //ColR = Math.round(200 * Math.random()) + 55;
        //ColG = Math.round(200 * Math.random()) + 55;
        //ColB = Math.round(200 * Math.random()) + 55;
        Context.fillStyle = "#000000";
        // Pintamos el borde del caracter actual
        Context.fillText(Caracter, PosX, PosY);
        // Medimos el caracter actual y sumamos su tamaño a la posición X
        Tam = Context.measureText(Caracter);
        PosX += Tam.width;
    }
}
function showElectionGroup(){
	if (checkPeople()){
		var divElectionGroup= document.getElementById("divElectionGroup");
		divElectionGroup.style.display="block";
	}
	
}
function showElectionStart(){
	var bSAddPerson= document.getElementById("bSAddPerson");
	bSAddPerson.style.display="block";
	
	
}
function resetAll(){
	
	var divElectionGroup= document.getElementById("divElectionGroup");
	
	divElectionGroup.style.display="none";
	maxGroup=0;
	personInGroup=1;
	document.getElementById("numGroups").value="0";
	document.getElementById("numPeople").value="0";
    var node = document.getElementById("dgroup");
	if (node.parentNode) {
	  node.parentNode.removeChild(node);
	}
	
}


function addFields(){
            // Number of inputs to create
            var tNumber = document.getElementById("numGroups").value;
            var number=parseInt(tNumber);
            // Container <div> where dynamic content will be placed
            var container = document.getElementById("listGroups");
            
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            var divG = document.createElement("div");
            divG.name = "dgroup";
            divG.id = "dgroup";
            container.appendChild(divG);
            container = document.getElementById("dgroup");
            for (i=0;i<number;i++){
                // Append a node with a random text
                container.appendChild(document.createTextNode("Size Group " + (i+1)));
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("input");
                input.type = "number";
                input.name = "igroup" + (i+1);
                input.id = "igroup" + (i+1);
                input.value=0;
                input.min=0;
                var posGroup=i+1;
                input.setAttribute('oninput', "addPerson('group"+posGroup+"')");
                container.appendChild(input);
                
                // Create an < input hidden> element, set its type and name attributes
                var hinput = document.createElement("input");
                hinput.type = "hidden";
                hinput.name = "hgroup" + (i+1);
                hinput.id = "hgroup" + (i+1);
                hinput.value=input.value;
                container.appendChild(hinput);
                // Create an <output> element, set its type and name attributes
                var ouput = document.createElement("output");
                ouput.name = "ogroup" + (i+1);
                ouput.id = "ogroup" + (i+1);
                ouput.for="hgroup" +(i+1);
                ouput.value="0/"+input.value;
                container.appendChild(ouput);
                // Append a line break 
                container.appendChild(document.createElement("br"));
               

            }
            maxGroup=number;
} 
function checkPeople(){
	var textTotalnumP= document.getElementById("numPeople");
	var totalnumP=parseInt(textTotalnumP.value);
	var tp=0;
	var state=false;
	for (i=0;i<maxGroup;i++){
		var tnumP=document.getElementById("igroup"+(i+1));
		var numP=parseInt(tnumP.value);
		tp=tp+numP;
	}
	if (tp>totalnumP){
		alert("you  have too many people in the groups");
		state=false;
	}else{
		state=true;
	}
	return state;
}
function addPerson(groupName){
	 var nameI="i"+groupName;
	 var nameO="o"+groupName;
	 var nameH="h"+groupName;
	 var igroup = document.getElementById(nameI);
	 var ogroup = document.getElementById(nameO);
	 var hgroup = document.getElementById(nameH);	 
	 ogroup.value=hgroup.value+"/"+igroup.value;
	 showElectionStart();

}
function addPersonRandom(groupName){
	 var nameI="i"+groupName;
	 var nameO="o"+groupName;
	 var nameH="h"+groupName;
	 var igroup = document.getElementById(nameI);
	 var ogroup = document.getElementById(nameO);
	 var hgroup = document.getElementById(nameH);
	 var textTotalnumP= document.getElementById("numPeople");
	 totalNumP=parseInt(textTotalnumP.value);
	 if (personInGroup>totalNumP){
		alert("All people in groups");
	 }else{
		 hgroup.value=parseInt(hgroup.value)+1;	 
		 ogroup.value=hgroup.value+"/"+igroup.value;
		 personInGroup=personInGroup+1;
	}

}
