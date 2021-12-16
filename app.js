const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')

const screen = document.querySelector('.screen')
const numberBtn = document.querySelectorAll('.number')
const allBtn = document.querySelectorAll('.btn')
const all = []

const screenCover = document.querySelector('.screen-cover')
let screenSize = 0


const config = {
    attributes: true,
    childList: true,
    characterData: true
  };

const screenObserver = new MutationObserver(function(mutations) {
    let screenSize = 100; 
    screenCover.style.cssText = 'font-size:' + screenSize + '%';
    while(screen.offsetWidth > screenCover.offsetWidth) {
        screenSize = screenSize - 1;
        screenCover.style.cssText = 'font-size:' + screenSize + '%';  
    } 
});
  
screenObserver.observe(screen, config);
  
let num1 = '';
let num2 = '';
let op = '';
let finish = false;
let flag = ''

const digit = ['1','2','3','4','5','6','7','8','9','0','.'];
const action = ['+','–','×','÷'];



// clear Button
clearBtn.addEventListener('click' , () =>{
    clearAll()
})

// delete Button
deleteBtn.addEventListener('click', event =>{ 
    deleteFunc(screen, event)
})

function startCalc(){
    screen.textContent = "0"
}

function deleteFunc(value, event){
    value.textContent = value.textContent.slice(0, value.textContent.length - 1)
    if (flag === '1'){
        num1 = num1.slice(0, num1.length - 1)
        
    } else if(flag === '2'){
        num2 = num2.slice(0, num2.length - 1)
    }
    else {
        event.preventDefault()
    }
    
}

function clearAll(){
    num1 = ''
    num2 = '';
    op = '';
    finish = false;
    screen.textContent = "";

}

// add event to each button
function massBtn(){
    for( let i = 0; i < allBtn.length; i++){
        allBtn[i].addEventListener('click', event => {
            return getBtn(allBtn[i],event)
        })
    }
}


function getBtn(Sign, event){
    // get keydown
    const key = event.target.textContent;

    // if pressed '0-9' or '.'
    if (digit.includes(key)){
        
        if (num2 === '' && op === ''){
            if (num1.length < 12 ){
                flag = '1'
                
                if (key === '.'){
                    a = num1.split('')
                    if (a.filter(item => item =='.').length < 1 ){
                        num1 += key
                        if (num1[0] === '.'){
                            num1 = '0.'
                        }
                        screen.textContent = num1
                    }
                } else {
                    num1 += key
                    screen.textContent = num1
                    
                }
          
            }   
        }
        
        else if (num1 !== '' && num2 !== '' && finish){
            flag = '2'
            num2 = key
            finish = false
            screen.textContent = num2
        }

    else{
        if (num2.length < 12){
            flag = '2'
            if (key === '.'){
                b = num2.split('')
                if (b.filter(item => item =='.').length < 1 ){
                    num2 += key
                    if (num2[0] === '.'){
                        num2 = '0.'
                    }
                    screen.textContent = num2
                }
            } else {
                num2 += key
                screen.textContent = num2
            }
            
        }
    }
        console.log(num1+' | '+ num2+' | '+ op+' | '+ finish)
        return;
    }

    // if any operator is pressed
    if (action.includes(key)){
        op = key
        screen.textContent = op
        console.log(num1+' | '+ num2+' | '+ op+' | '+ finish)
        return;
    }

    // if pressed '='
    if (key === '=' ){
        flag = '3'
        if (num2 === '') num2 = num1
            switch(op){
            case '+':
                num1 = +num1 + +num2
                break;
            case '–':
                num1 = +num1 - +num2
                break;
            case '×':
                num1 = +num1 * +num2
                break;
            case '÷':
                if (num2 === '0'){
                    screen.textContent = 'Error'
                    num1 = ''
                    num2 = '';
                    op = '';
                    return
                }
                num1 = +num1 / +num2
                break;
        }
        finish = true
        screen.textContent = num1
        console.log(num1+' | '+ num2+' | '+ op+' | '+ finish)
    }
}


massBtn()
startCalc()
