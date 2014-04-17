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
	introContainer.querySelector('.bar').setAttribute('data-index', '2');
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
	introContainer.querySelector('.bar').setAttribute('data-index', '3');
	introButton.setAttribute('onclick','choice3()');

}

function choice3(input){
	var title;
	var info;
	var pic;
	var picContainer;
	var fields;
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
	
	pic = document.createElement('img');
	pic.setAttribute('src', '/images/intro/profile.png');
	picContainer = document.createElement('div');
	picContainer.className = 'profile';
	picContainer.appendChild(pic);

	fields = document.createElement('div');

	var textInput1 = document.createElement('input');
        
    textInput1.setAttribute('type', 'text');
    textInput1.setAttribute('placeholder', 'Crewnaam');
        
    var textInput2 = textInput1.cloneNode(true);
	var textInput3 = textInput1.cloneNode(true);
	var textInput4 = textInput1.cloneNode(true);

    textInput2.setAttribute('placeholder', 'Bedrijfsadres');
    textInput3.setAttribute('placeholder', 'Mail');
    textInput4.setAttribute('placeholder', 'Telefoon');

    fields.appendChild(textInput1);
    fields.appendChild(textInput2);
    fields.appendChild(textInput3);
    fields.appendChild(textInput4);

	var content = createContentNode();
	content.appendChild(title);
	content.appendChild(info);
	content.appendChild(picContainer);
	content.appendChild(fields);

	replaceTheNode(content);
	introContainer.querySelector('.bar').setAttribute('data-index', '4');
	introButton.setAttribute('onclick','choice4()');
}

function choice4(input){
	// User fills in details
	// - Crewnaam
	// - Bedrijfsadres
	// - Mail
	// - Telefoon

	var title;
	var info;

	title = document.createElement('h2');
	title.appendChild(document.createTextNode('Welkom aan boord!'));
	info = document.createElement('p');
	info.appendChild(document.createTextNode('Uw profiel verschijnt nu in anderen hun vizier. We hebben uw zoekvoorkeur opgeslagen, zodat u recht op uw doel af kunt varen. U kunt nu direct door naar de radar om te beginnen met zoeken of u kunt uw zoekvoorkeuren verder aanscherpen'));
	
	var content = createContentNode();
	content.appendChild(title);
	content.appendChild(info);

	replaceTheNode(content);
	introContainer.querySelector('.bar').setAttribute('data-index', '5');
	introButton.setAttribute('onclick','choice5()');
}

function choice5(input){

	// Go to Map
	window.location.href = '/maps.html';
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
		$(newChild).css('opacity','1');
	}
	else{
		$(old).css('opacity','0');
		setTimeout(function(){
			introContainer.replaceChild(newChild, old);
			setTimeout(function(){
				$(newChild).css('opacity','1');
			}, 100);
		}, 200);
	}
}

init();