const form = document.getElementById('registrar');
const input = form.querySelector('input'); //selects input inside form so we can read name typed into field

const mainDiv = document.querySelector('.main'); //to place the hide checkbox before the main div
const ul = document.getElementById('invitedList');  

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');
  
filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox); 
mainDiv.insertBefore(div, ul);  //to place the hide checkbox before the main div

filterCheckBox.addEventListener('change', (e) => {  // to make the hide checkbox work
 const isChecked = e.target.checked;  
 const lis = ul.children; 
  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];    
        if (li.className == 'responded') {
            li.style.display = ''; // to bring the display back on the screen
          } else {
            li.style.display = 'none'; // to hide the css property                      
          }  
         }
        } else {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];  
      li.style.display = ''; 
    }                                
  }
}); 

function createLI (text) {
  function createElement(elementName, property, value) {  //create element function
    const element = document.createElement(elementName);
    element[property] = value; 
    return element; 
    
  } 
  
  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value); 
    li.appendChild(element); 
    return element;      
  } 
  
  const li = document.createElement('li'); 
  appendToLI('span', 'textContent', text); 
  appendToLI('label', 'textContent', 'Confirmed!').appendChild(createElement('input', 'type', 'checkbox')); 
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove'); 
  return li; 
}


//submit handler, includes prevent duplicates and empty string/submit

form.addEventListener('submit', (e) => {
  e.preventDefault();  
  const text = input.value; 
  input.value = '';  
   for (i=0; i < ul.children.length; i++) {
      if (text == ul.children[i].children[0].textContent) {
        alert("That name has already been entered, try another.");
        return;
      }
    }
  if (text == 0) {
      alert("Please enter in a name, silly!");
    } else  {
  const li = createLI(text); 
  ul.appendChild(li);
 } 
});  
  
  
  
//this sets true-false values in console. use these values to set class 
ul.addEventListener('change', (e) => { 
  const checkbox = event.target;
  const checked = checkbox.checked; //checked variable is a boolean
  const listItem = checkbox.parentNode.parentNode; 

  
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className ='';  
  }
}); 
  
//remove handler
  
ul.addEventListener('click', (e) => {
  //if statement to filter out list items that aren't the remove button
  if (e.target.tagName === 'BUTTON') {
    const button = e.target; 
    const li = button.parentNode; 
    const ul = li.parentNode;  
    const action = button.textContent; //because they all use button.textContent, put them in const
    
    const nameActions = {
      remove: () => {
       ul.removeChild(li); 
        },
      edit: () => {
         const span = li.firstElementChild;
         const input = document.createElement('input');
         input.type = 'text'; 
         input.value = span.textContent; 
         li.insertBefore(input, span);
         li.removeChild(span); 
         button.textContent = 'done'; 
        },
      done: () => { 
         const input = li.firstElementChild;
         const span = document.createElement('span'); 
         span.textContent = input.value; 
         li.insertBefore(span, input); 
         li.removeChild(input);  
         button.textContent = 'edit'; 
       }
     };
  //select and run action in button's name
  nameActions[action]();    
     } 
 
 });                     
 