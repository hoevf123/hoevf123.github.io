//DOM 감지
export class DOMTable{
    constructor(target_tag, target_objectArray){
        this.representDivTag = target_tag;
        this.setTargetObjectArray(target_objectArray); // repaint 기능 동봉 메서드
    }
    getFromDOM(isRemoveVoidRow = true) {
        function isInputLabel(target_input){
            let ret_bool = false;
            if(target_input instanceof HTMLInputElement)
                if(target_input.type === "text") ret_bool = true;   //input 태그 중 값 입력을 받는 Element는 text 타입으로만 반환됩니다.
            return ret_bool;
        }
        // div - input DOM 태그를 row-column 2차원 배열로 변환하는 코드
        let rows = Array.from(this.representDivTag.getElementsByClassName("row-content"));  //div를 배열 형태로 변환
        rows = rows.map((row)=>{
            let columns = Array.from(row.getElementsByTagName("input")).filter(isInputLabel).map(e=>e.value);   //열 정보를 배열로 반환하여 열 하나를 만듦.
            return columns; //열 정보 추가
        });
        let dict_tablekeys = rows.shift();  //맨 첫 줄은 key 값. rows 변수에는 각 key 값에 대응하는 row의 column 데이터가 들어가 있다.
        console.log(dict_tablekeys);
        console.log(rows);
        
        function assembleObject(keys, values, isSkipEmptyValue = true){
            let ret_obj = {};
            for(let key_idx in keys){
                let key = keys[key_idx];
                if(key == "" || key == undefined) continue;
                let value = values[key_idx];
                if((isSkipEmptyValue && value == "") || value == undefined) continue; // 빈 값은 함수 인자값 선택에 의해 스킵, undefined가 값인 경우도 스킵.
                if(!(isNaN(value))) value = Number(value);
                ret_obj[key] = value;
            }
            return ret_obj;
        }


        let result = [];
        // row-comlum을 각 object에 맵핑. row 열은 버림(빈 배열을 포함한 결과로 내용 변경)
        rows.map(row => {
            let rowData = assembleObject(dict_tablekeys, row);
            if(isRemoveVoidRow && Object.values(rowData).length <= 0);
            else result.push(rowData);  //반환할 열 개체 넣기
            return rowData;
        });

        return result;
    }
    setTargetObjectArray(target_objectArray){
        this.target_objectArray = target_objectArray;
        if(this.representDivTag instanceof HTMLDivElement) this.repaint();
    }

    repaint(isHeaderReadonly = true){
        this.representDivTag.innerHTML="";
        //행과 열 생성
        let dict_tablecontents = {};
        for(let array_row of this.target_objectArray){
            for(let prop_name in array_row){
                if(dict_tablecontents?.[prop_name] == undefined) dict_tablecontents[prop_name] = [];
                dict_tablecontents[prop_name].push(array_row[prop_name]);
            }
        }
        let dict_tablekeys = Object.keys(dict_tablecontents);   // 키 뽑기

        let root_div = this.representDivTag;
        let row_div = document.createElement("div");
        
        // 헤더 쑤셔넣기
        row_div.className = "row-header";
        dict_tablekeys.forEach(element => {
            let col_label = document.createElement("input");
            //col_label.type="label";
            col_label.value = element;
            if(isHeaderReadonly) col_label.readOnly = true;
            row_div.appendChild(col_label);
        });
        root_div.appendChild(row_div);

        // 컬럼 데이터 내용 넣기
        function makeRowInput(target_array, target_className){
            let _row_div = document.createElement("div");
            if(target_className != undefined) _row_div.className = target_className;
            for(let a of target_array){
                let _col_input = document.createElement("input");
                _col_input.value = a;
                if(_col_input.value == undefined) _col_input.value = "";
                _row_div.appendChild(_col_input);
            }
            //행 삭제 버튼 생성
            let btn_delete = document.createElement("input");
            btn_delete.type = "button";
            btn_delete.value = "삭제";
            btn_delete.addEventListener("click", function(e){root_div.removeChild(this)}.bind(_row_div));
            _row_div.appendChild(btn_delete);   //행 삭제 버튼 삽입
            return _row_div;
        }
        for(let row_array = 0; row_array<= this.target_objectArray.length ; row_array++){
            let row_content_array = [];
            row_div.className = "row-content";
            for(let prop_name of dict_tablekeys){
                let col_text = dict_tablecontents[prop_name][row_array];
                if(col_text == undefined) col_text = "";
                row_content_array.push(col_text);     //배열에 열 정보 삽입
            }
            root_div.appendChild(makeRowInput(row_content_array,"row-content"));  //최상위 div 태그에 행 정보 삽입
        }
        // 열 추가 버튼 만들기
        function makeCreateButton() {
            let _btn_create_row = document.createElement("input");
            _btn_create_row.type = "button";
            _btn_create_row.value = "열 추가";
            _btn_create_row.addEventListener("click", function(e) {
                let length_props = dict_tablekeys.length; // 열의 개수
                let voidArray = Array(length_props).fill(""); // 빈 배열 생성
                let newRow = makeRowInput(voidArray, "row-content"); // 새로운 행 생성
                root_div.insertBefore(newRow, _btn_create_row); // 새로운 행 삽입
            });
            return _btn_create_row;
        }
        let btn_create_row = makeCreateButton(); //
        root_div.appendChild(btn_create_row);
    }
}