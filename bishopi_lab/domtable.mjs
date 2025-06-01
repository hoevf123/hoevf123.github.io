//DOM 감지
export class DOMTable{
    constructor(target_tag, target_objectArray){
        this.representDivTag = target_tag;
        this.setTargetObjectArray(target_objectArray); // repaint 기능 동봉 메서드
    }
    getFromDOM(isRemoveVoidRow = true) {
        console.log("=== getFromDOM 시작 ===");
        console.log("대상 요소:", this.representDivTag);
        
        // 테이블 구조 확인
        let isTableStructure = this.representDivTag.querySelector("table") !== null;
        console.log("테이블 구조 여부:", isTableStructure);
        
        let result = [];
        let headers = [];
        
        if (isTableStructure) {
            // 테이블 구조에서 데이터 읽기
            console.log("테이블 구조에서 데이터 읽기 시작");
            let tbody = this.representDivTag.querySelector("tbody");
            if (!tbody) {
                console.log("tbody를 찾을 수 없음");
                return [];
            }

            // 헤더 읽기
            headers = Array.from(this.representDivTag.querySelectorAll("thead th"))
                .map(th => th.textContent)
                .filter(key => key !== "작업");
            console.log("테이블 헤더:", headers);

            // 행 데이터 읽기
            let rows = Array.from(tbody.querySelectorAll("tr"));
            console.log("발견된 행 수:", rows.length);

            rows.forEach((row, rowIndex) => {
                let rowData = {};
                let cells = Array.from(row.querySelectorAll("td"));
                console.log(`행 ${rowIndex + 1}의 셀 수:`, cells.length);
                
                // 마지막 셀(작업 버튼)을 제외한 모든 셀 처리
                cells.slice(0, -1).forEach((cell, cellIndex) => {
                    if (cellIndex < headers.length) {
                        let input = cell.querySelector("input");
                        if (input) {
                            let value = input.value.trim();
                            if (value) {
                                rowData[headers[cellIndex]] = value;
                            }
                        }
                    }
                });

                if (!isRemoveVoidRow || Object.keys(rowData).length > 0) {
                    result.push(rowData);
                }
            });
        } else {
            // div 구조에서 데이터 읽기
            console.log("div 구조에서 데이터 읽기 시작");
            let rows = Array.from(this.representDivTag.getElementsByClassName("row-content"));
            console.log("발견된 div 행 수:", rows.length);

            if (rows.length > 0) {
                // 첫 번째 행에서 헤더 정보 가져오기
                let firstRowInputs = Array.from(rows[0].getElementsByTagName("input"));
                headers = firstRowInputs.map(input => input.value).filter(Boolean);
                console.log("div 헤더:", headers);

                // 나머지 행 데이터 읽기
                rows.slice(1).forEach((row, rowIndex) => {
                    let rowData = {};
                    let inputs = Array.from(row.getElementsByTagName("input"));
                    console.log(`div 행 ${rowIndex + 1}의 입력 필드 수:`, inputs.length);

                    inputs.forEach((input, inputIndex) => {
                        if (inputIndex < headers.length) {
                            let value = input.value.trim();
                            if (value) {
                                rowData[headers[inputIndex]] = value;
                            }
                        }
                    });

                    if (!isRemoveVoidRow || Object.keys(rowData).length > 0) {
                        result.push(rowData);
                    }
                });
            }
        }

        console.log("=== 최종 결과 ===");
        console.log("읽은 데이터:", result);
        console.log("데이터 행 수:", result.length);
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
        let table = document.createElement("table");
        table.className = "option-table";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        
        // 헤더 생성
        let headerRow = document.createElement("tr");
        dict_tablekeys.forEach(element => {
            let th = document.createElement("th");
            th.textContent = element;
            headerRow.appendChild(th);
        });
        // 삭제 버튼 헤더 추가
        let deleteHeader = document.createElement("th");
        deleteHeader.textContent = "작업";
        headerRow.appendChild(deleteHeader);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 컬럼 데이터 내용 넣기
        const makeRowInput = (target_array, target_className) => {
            let tr = document.createElement("tr");
            tr.className = target_className;
            
            for(let i = 0; i < target_array.length; i++){
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.value = target_array[i] || "";
                
                // 헤더 텍스트에 따라 다른 placeholder 설정
                const headerText = dict_tablekeys[i];
                if (headerText === "optionName" || headerText === "name") {
                    input.placeholder = "추가 옵션 이름을 입력하세요 (예: 보스 몬스터 공격 시 대미지 증가)";
                } else if (headerText === "probability") {
                    input.placeholder = "확률을 소수점으로 입력하세요 (예: 0.05 = 5%)";
                } else if (headerText === "optionGroup") {
                    input.placeholder = "옵션 그룹을 입력하세요 (선택사항)";
                }
                
                td.appendChild(input);
                tr.appendChild(td);
            }
            
            //행 삭제 버튼 생성
            let td = document.createElement("td");
            let btn_delete = document.createElement("input");
            btn_delete.type = "button";
            btn_delete.value = "삭제";
            btn_delete.className = "delete-btn";
            btn_delete.addEventListener("click", function(e){
                tbody.removeChild(tr);
            });
            td.appendChild(btn_delete);
            tr.appendChild(td);
            
            return tr;
        }

        for(let row_array = 0; row_array <= this.target_objectArray.length; row_array++){
            let row_content_array = [];
            for(let prop_name of dict_tablekeys){
                let col_text = dict_tablecontents[prop_name][row_array];
                if(col_text == undefined) col_text = "";
                row_content_array.push(col_text);
            }
            tbody.appendChild(makeRowInput(row_content_array, "row-content"));
        }

        table.appendChild(tbody);
        root_div.appendChild(table);

        // 열 추가 버튼 만들기
        let btn_create_row = document.createElement("input");
        btn_create_row.type = "button";
        btn_create_row.value = "열 추가";
        btn_create_row.className = "add-column-btn";
        btn_create_row.addEventListener("click", function(e) {
            let voidArray = Array(dict_tablekeys.length).fill("");
            tbody.appendChild(makeRowInput(voidArray, "row-content"));
        });
        root_div.appendChild(btn_create_row);
    }
}