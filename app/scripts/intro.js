'use strict';

var introContainer = document.querySelector('#intro-container');
var introContent = introContainer.querySelector('.intro-content');
// There's always a button to the next step
var introButton = introContainer.querySelector('.intro-button')

function init(){
	var title;
	var content = createContentNode();
	// Set up
	
	// Display choice1's options
	// 
	// Title: Een nieuwe zee om te bevaren!
	title = document.createElement('h2');
	title.appendChild(document.createTextNode('Een nieuwe zee om te bevaren!'));
	
	content.appendChild(title);
	content.appendChild

	replaceTheNode(content);
	introButton.setAttribute('onclick','choice1()');
}

function choice1(){
	var title;
	var options;
	// Not really a choice so no input
	 
	// Display choice2's options
	// 
	// Title: Ik ben een ...
	title = document.createElement('h2');
	title.appendChild(document.createTextNode('Ik ben een ...'));
	// Startup -- Incubator -- Investor
	options = document.createElement('div');

	var radioInput1 = document.createElement('input');
    var radioLabel1 = document.createElement('label');
        
    radioInput1.setAttribute('type', 'radio');
    radioInput1.setAttribute('name', 'choice');
    radioInput1.setAttribute('value', 'startup');
        
    radioLabel1.innerHTML='Startup';
    radioLabel1.setAttribute('for', 'startup');

    var radioInput2 = radioInput1.cloneNode(true);
    var radioLabel2 = radioLabel1.cloneNode(true);

	var radioInput3 = radioInput1.cloneNode(true);
    var radioLabel3 = radioLabel1.cloneNode(true);

    radioInput2.setAttribute('value', 'incubator');
    radioLabel2.innerHTML='Incubator';
    radioLabel2.setAttribute('for', 'incubator');

    radioInput3.setAttribute('value', 'investor');
    radioLabel3.innerHTML='Investor';
    radioLabel3.setAttribute('for', 'investor');

    options.appendChild(radioInput1);
    options.appendChild(radioLabel1);

    options.appendChild(radioInput2);
    options.appendChild(radioLabel2);

    options.appendChild(radioInput3);
    options.appendChild(radioLabel3);
	
    var content = createContentNode();
    content.appendChild(title);
    content.appendChild(options);

	replaceTheNode(content);
	introButton.setAttribute('onclick','choice2()');

}

function choice2(input){
	var title;
	var options;

	// User selects what they are
	// Radio choice
	// 1, 2 or 3
	
	// Display choice3's options
	// 
	// Title: Ik zoek een ...
	title = document.createElement('h2');
	title.appendChild(document.createTextNode('Ik zoek een ...'));
	// Startup -- Incubator -- Investor
	options = document.createElement('div');

	var checkboxInput1 = document.createElement('input');
    var checkboxLabel1 = document.createElement('label');
        
    checkboxInput1.setAttribute('type', 'checkbox');
    checkboxInput1.setAttribute('name', 'startup');
        
    checkboxLabel1.innerHTML='Startup';
    checkboxLabel1.setAttribute('for', 'startup');

    var checkboxInput2 = checkboxInput1.cloneNode(true);
    var checkboxLabel2 = checkboxLabel1.cloneNode(true);

	var checkboxInput3 = checkboxInput1.cloneNode(true);
    var checkboxLabel3 = checkboxLabel1.cloneNode(true);

    checkboxInput2.setAttribute('name', 'incubator');
    checkboxLabel2.innerHTML='Incubator';
    checkboxLabel2.setAttribute('for', 'incubator');

    checkboxInput3.setAttribute('name', 'investor');
    checkboxLabel3.innerHTML='Investor';
    checkboxLabel3.setAttribute('for', 'investor');

    options.appendChild(checkboxInput1);
    options.appendChild(checkboxLabel1);

    options.appendChild(checkboxInput2);
    options.appendChild(checkboxLabel2);

    options.appendChild(checkboxInput3);
    options.appendChild(checkboxLabel3);
	
    var content = createContentNode();
    content.appendChild(title);
    content.appendChild(options);

	replaceTheNode(content);
	introButton.setAttribute('onclick','choice3()');

}

function choice3(input){
	var title;
	var info;
	var form;
	// User selects what they are looking for
	// Checklist choice
	// 1, 2 and/or 3

	// Display choice4's options
	// 
	// Title: Een nieuwe stip op de radar
	title = document.createElement('h2');
	title.appendChild(document.createTextNode('Een nieuwe stip op de radar'));
	// Vul onderstaande info in en wij laten je gezicht zien aan StarterSub. Deze gegevens vormen de basis voor jouw profiel, maar kunnen nog aangepast worden
	info = document.createElement('p');
	info.appendChild(document.createTextNode('Vul onderstaande info in en wij laten je gezicht zien aan StarterSub. Deze gegevens vormen de basis voor jouw profiel, maar kunnen nog aangepast worden'));
	
	var content = createContentNode();
	content.appendChild(title);
	content.appendChild(info);

	replaceTheNode(content);
	introButton.setAttribute('onclick','choice4()');
}

function choice4(input){
	// User fills in details
	// - Crewnaam
	// - Telefoon
	// - Mail

	// Go to Map
	window.location.href = '/map.html';
}

function createContentNode () {
	var tmp = document.createElement('div');
	tmp.className = 'intro-content';

	return tmp;
}

function replaceTheNode(newChild){
	var old = introContainer.querySelector('.intro-content');
	if(old === null){
		introContainer.appendChild(newChild);
	}
	else{
		introContainer.replaceChild(newChild, old);
	}
}

init();