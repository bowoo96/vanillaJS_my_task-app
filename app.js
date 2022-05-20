// button Element, Array ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let groceryForm = document.querySelector('.grocery-form');
let data = [];
let clickObj;
let inputEl;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Date YYYYMMDDHHMSS 로 출력하기 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Date.prototype.YYYYMMDDHHMMSS = function(){
    let yyyy = this.getFullYear().toString();
    let MM = pad(this.getMonth() +1,2);
    let dd = pad(this.getDate() ,2);
    let hh = pad(this.getHours() ,2);
    let mm = pad(this.getMinutes() ,2);
    let ss = pad(this.getSeconds() ,2);

    return yyyy + MM + dd + hh + mm + ss
}

function pad(number, length) {
    let str = ''+ number;
    while(str.length < length){
        str = "0" + str; 
    }
    return str;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// - 버튼을 클릭
// - grocery-container의 class이름을 show-container 바꾸기
// - grocery-list안에 item들 생성
//      - new Date로 시간을 데이터 코드로 변환
//      - 변환된 데이터를 article 안에 data-id로 넣어줌
//      - input text를 가져와서 p태그에 넣어줌
//      - 생성된 article을 data-id와 title의 text로 이루어진 객체로 만들어줌. > 배열에 추가
// - 가져온 값을 show-container안에 article에 넣어주기

// - 수정 버튼 클릭
// - 클릭한 article의 data-id와 같은 배열객체의 title 값을 input에 넣어줌
//      - data-id를 찾기 위해서 배열 객체를 filter를 통해 불러온다
//      - 불러온 배열객체의 id,title을 변수에 넣어준다.
//      - title변수를 input에 출력.
// - 내용수정 후 edit 버튼 클릭
// - 배열객체를 돌면서 불러온 id가 담긴 변수와 같은 객체를 찾는다.
// - 찾은 객체에 input에 입력된 값을 article의 title 값에 넣어줌.




// list를 가져오는 변수 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let listContainer = document.querySelector('.grocery-container')
let list = document.querySelector('.grocery-list');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// submitBtn click ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
groceryForm.addEventListener('submit',createList);


function createList(event){
    // submit 이라는 이벤트 타입은 서버로 데이터를 보내주고 새로고침이 되기 때문에 그 동작 이벤트를 막아주는 코드가 preventDefault이다.
    // form안에 있는 버튼을 누르면 form안에 정보가 전송이 되어서 form 안에 있는 버튼에 preventDefault를 걸어준다.
    event.preventDefault();

    if(document.querySelector('.form-control > button').textContent == "submit"){
        listContainer.className = 'grocery-container show-container'; // className 변경

        // html el 생성 변수
        const articleEl = document.createElement('article');
        const pEl = document.createElement('p');
        const divEl = document.createElement('div');
        const buttonEl1 = document.createElement('button');
        const buttonEl2 = document.createElement('button');
        const iEl1 = document.createElement('i');   
        const iEl2 = document.createElement('i');   

        // html el className, type 추가
        articleEl.className = "grocery-item";
        pEl.className = "title";
        divEl.className = "btn-container";
        buttonEl1.className = "edit-btn";
        buttonEl2.className = "delete-btn";
        iEl1.className = "fas fa-edit";
        iEl2.className = "fas fa-trash";
        buttonEl1.type = "button";
        buttonEl2.type = "button";

        // html el appendchild 시키기
        list.appendChild(articleEl);
        articleEl.appendChild(pEl);
        articleEl.appendChild(divEl);
        divEl.appendChild(buttonEl1);
        divEl.appendChild(buttonEl2);
        buttonEl1.appendChild(iEl1);
        buttonEl2.appendChild(iEl2);

        // input의 value를 가져오기
        inputEl = document.querySelector('#grocery');
        let inputValue = inputEl.value;
        let title = document.querySelector('.title');
        pEl.textContent = inputValue;
        inputEl.value = null;
        // 왜 class를 선택한 변수의 textcontent는 안변하고 p태그를 선택한 변수의 textcontent는 변할까?

        // 시간데이터 생성
        let date = new Date();
        let nowDate = date.YYYYMMDDHHMMSS();

        // 생성된 시간 데이터 data-id에 넣어주고, id값 변수로 가져오기
        articleEl.setAttribute('data-id',nowDate);

        // input value와 data-id로 객체 만들기
        let articleObj = {
            id : `${nowDate}`,
            value : `${inputValue}`,
        }

        // data 배열에 객체 푸시(추가)
        data.push(articleObj);


        // edit icon click
        
        buttonEl1.addEventListener('click', editList);
        
        function editList(){
            // submit button의 text를 edit으로 변경
            document.querySelector('.form-control > button').textContent = "edit";
            
            // 누른 item의 id 값을 가지고 있는 객체를 가져온다.
            clickObj =  data.filter( dataID => dataID.id == articleObj.id );
            
            // 객체의 value를 input에 넣어줌.
            inputEl.value = clickObj[0].value;
        }

    // edit btn click    
    }else if(document.querySelector('.form-control > button').textContent == "edit"){
        
        // 수정한 input.value를 다시 clickObj 객체 value에 넣어줌
        clickObj[0].value = inputEl.value;

        // clickObj를 다시 data배열에 push해줌. 근데 어떤 순서로..?
        console.log(clickObj);
        console.log(data);

        // 수정한 객체를 배열에 넣어주는건 됐고, 그 객체를 찾아서 화면에 수정된 값이 보이게 해야함..
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




