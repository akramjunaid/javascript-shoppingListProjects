const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // validate Input
    if(newItem === ''){
        alert('Please add item');
        return;
    }

    //Create List Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to DOM
    itemList.appendChild(li);
    checkUI();

    itemInput.value = '';    
}

function createButton(classes){
    const button = document.createElement('button');
    button.className= classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e){
    if( e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}
function removeAllItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
}
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display ='flex';
        }else {
            item.style.display ='none';
        }
    })
    
}

function checkUI(){
const items = itemList.querySelectorAll('li');

    if(items.length === 0){
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', removeAllItems);
itemFilter.addEventListener('input', filterItems);

checkUI();