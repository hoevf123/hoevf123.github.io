/* items */
class ItemSlot{
    constructor(itemInfo, itemAmount, attatchedDOM){
        this.itemInfo=itemInfo;
        this.itemAmount=itemAmount; // integer or array of integer/object(with property) amount.
        this.attatchedDOM = attatchedDOM;
    }
    getAmount(){
        let sum_amount = 0;
        function getAmount_variant(value){
            let ret_val = 0;
            if(value instanceof Number)ret_val = itemAmount;
            else if(value instanceof String)ret_val = Number(itemAmount);
            else if(this.itemAmount instanceof Array){
                ret_val=this.itemAmount.reduce(function getSumofArray(a,c,i){
                    return a = a + getAmount_variant(c);
                })(0);
            }
            else if(value instanceof Object){
                if(value.amount !== undefined){
                    let value_getted = getAmount_variant(value.amount);
                    if(value_getted !== undefined) ret_val = value_getted;
                }
            }
            // no need else phrase.
            return ret_val;
        }
        
        sum_amount = getAmount_variant(this.itemAmount);
        return sum_amount;
    }
}

class Inventory {
    constructor(container, type = 'normal') {
        this.container = container;
        this.type = type; // 'normal' 또는 'equipment'
        this.items = []; // 아이템 정보를 저장하는 배열
        this.slots = [];
        this.rows = 6; // 6x6 배열로 변경
        this.columns = 6;
        this.initializeSlots();
    }

    initializeSlots() {
        // 기존 슬롯이 있는지 확인
        let slots = this.container.querySelectorAll('.ms2-item-slot');
        
        // 일반 인벤토리인 경우 슬롯이 없으면 생성
        if (this.type === 'normal' && slots.length === 0) {
            const inventoryContainer = this.container.querySelector('.ms2-inventory');
            if (inventoryContainer) {
                // 6x6 그리드 생성
                for (let row = 0; row < this.rows; row++) {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'inventory-row';
                    inventoryContainer.appendChild(rowDiv);
                    
                    for (let col = 0; col < this.columns; col++) {
                        const slot = document.createElement('div');
                        slot.className = 'ms2-item-slot';
                        slot.dataset.index = row * this.columns + col;
                        rowDiv.appendChild(slot);
                    }
                }
                slots = this.container.querySelectorAll('.ms2-item-slot');
            }
        }

        // 슬롯 초기화
        slots.forEach(slot => {
            this.slots.push(slot);
            slot.dataset.inventoryType = this.type;
        });
    }

    addItem(item, slot) {
        if (!slot) {
            // 빈 슬롯 찾기
            slot = this.slots.find(s => !s.querySelector('.ms2-item'));
        }
        
        if (slot) {
            const img = document.createElement('img');
            img.className = 'ms2-item';
            img.src = item.imgSrc;
            slot.innerHTML = '';
            slot.appendChild(img);
            
            // 모든 아이템 정보를 dataset에 저장
            slot.dataset.itemName = item.itemName;
            slot.dataset.imgSrc = item.imgSrc;
            slot.dataset.itemType = item.itemType;
            slot.dataset.itemGrade = item.itemGrade;
            slot.dataset.reqLv = item.reqLv;
            slot.dataset.displayName = JSON.stringify(item.displayName);
            slot.dataset.options = JSON.stringify(item.options || []);
            slot.dataset.additionalOptions = JSON.stringify(item.additionaloptions || []);
            
            // items 배열에도 아이템 정보 저장
            const slotIndex = this.slots.indexOf(slot);
            this.items[slotIndex] = {
                ...item,
                slotIndex: slotIndex
            };
            
            return true;
        }
        return false;
    }

    removeItem(slot) {
        if (slot && slot.querySelector('.ms2-item')) {
            // 모든 아이템 정보를 복사
            const item = {
                itemName: slot.dataset.itemName,
                imgSrc: slot.dataset.imgSrc,
                itemType: slot.dataset.itemType,
                itemGrade: slot.dataset.itemGrade,
                reqLv: slot.dataset.reqLv,
                displayName: JSON.parse(slot.dataset.displayName || '{}'),
                options: JSON.parse(slot.dataset.options || '[]'),
                additionaloptions: JSON.parse(slot.dataset.additionalOptions || '[]')
            };
            
            // 슬롯 초기화
            slot.innerHTML = '';
            delete slot.dataset.itemName;
            delete slot.dataset.imgSrc;
            delete slot.dataset.itemType;
            delete slot.dataset.itemGrade;
            delete slot.dataset.reqLv;
            delete slot.dataset.displayName;
            delete slot.dataset.options;
            delete slot.dataset.additionalOptions;
            
            // items 배열에서도 아이템 제거
            const slotIndex = this.slots.indexOf(slot);
            delete this.items[slotIndex];
            
            return item;
        }
        return null;
    }

    getEmptySlot() {
        return this.slots.find((slot, index) => this.items[index] === undefined); // null 대신 undefined 체크
    }

    isFull() {
        // 빈 슬롯이 하나도 없으면 true 반환
        return !this.slots.some(slot => !slot.querySelector('.ms2-item'));
    }

    getInventoryStatus() {
        const status = {
            totalSlots: this.slots.length,
            emptySlots: 0,
            filledSlots: 0,
            items: []
        };

        this.items.forEach((item, index) => {
            if (item !== undefined) { // null 대신 undefined 체크
                status.filledSlots++;
                status.items.push({
                    ...item,
                    slotIndex: index
                });
            } else {
                status.emptySlots++;
            }
        });

        return status;
    }

    printInventoryStatus() {
        const status = this.getInventoryStatus();
        console.log('=== 인벤토리 상태 ===');
        console.log(`전체 슬롯: ${status.totalSlots}`);
        console.log(`사용 중인 슬롯: ${status.filledSlots}`);
        console.log(`빈 슬롯: ${status.emptySlots}`);
        console.log('\n=== 보유 아이템 목록 ===');
        status.items.forEach(item => {
            console.log(`- ${item.name} (슬롯: ${item.slotIndex})`);
        });
    }

    debugInventoryStatus() {
        console.log('=== 인벤토리 디버그 정보 ===');
        console.log(`전체 슬롯 수: ${this.slots.length}`);
        
        this.slots.forEach((slot, index) => {
            console.log(`\n슬롯 ${index}:`);
            console.log('- DOM 요소:', slot);
            console.log('- 데이터셋:', slot.dataset);
            
            const item = slot.querySelector('.ms2-item');
            if (item) {
                console.log('- 아이템 정보:', {
                    name: slot.dataset.itemName,
                    image: slot.dataset.imgSrc,
                    element: item
                });
            } else {
                console.log('- 빈 슬롯');
            }
        });
    }

    moveItem(targetSlotIndex, targetInventory) {
        if (!targetInventory) {
            console.error('대상 인벤토리가 지정되지 않았습니다.');
            return false;
        }

        // 소스 슬롯 찾기 (현재 아이템이 있는 슬롯)
        const sourceSlot = this.slots.find(slot => slot.querySelector('.ms2-item'));
        if (!sourceSlot) {
            console.error('이동할 아이템이 없습니다.');
            return false;
        }

        const targetSlot = targetInventory.slots[targetSlotIndex];
        if (!targetSlot) {
            console.error('잘못된 슬롯 인덱스입니다.');
            return false;
        }

        if (targetSlot.querySelector('.ms2-item')) {
            console.error('타겟 슬롯이 이미 아이템을 가지고 있습니다.');
            return false;
        }

        const item = this.removeItem(sourceSlot);
        if (item) {
            targetInventory.addItem(item, targetSlot);
            console.log(`아이템 이동 성공: ${item.itemName}`);
            return true;
        }
        return false;
    }

    deleteItem(slotIndex) {
        const slot = this.slots[slotIndex];
        if (!slot) {
            console.error('잘못된 슬롯 인덱스입니다.');
            return false;
        }

        if (!slot.querySelector('.ms2-item')) {
            console.error('해당 슬롯이 비어있습니다.');
            return false;
        }

        const item = this.removeItem(slot);
        if (item) {
            console.log(`아이템 삭제 성공: ${item.itemName}`);
            return true;
        }
        return false;
    }

    addItemToInventory(item, slotIndex = null) {
        if (slotIndex !== null) {
            const slot = this.slots[slotIndex];
            if (!slot) {
                console.error('잘못된 슬롯 인덱스입니다.');
                return false;
            }
            if (slot.querySelector('.ms2-item')) {
                console.error('해당 슬롯이 이미 아이템을 가지고 있습니다.');
                return false;
            }
            return this.addItem(item, slot);
        } else {
            if (this.isFull()) {
                console.error('인벤토리가 가득 찼습니다.');
                return false;
            }
            return this.addItem(item);
        }
    }
}

class InventoryManager {
    constructor() {
        this.normalInventory = new Inventory(
            document.querySelector('.ms2-character-equipment-generating-area'),
            'normal'
        );
        this.equipmentInventory = new Inventory(
            document.querySelector('.equipped-inventory.equipment'),
            'equipment'
        );
        this.skinInventory = new Inventory(
            document.querySelector('.equipped-inventory.skin'),
            'skin'
        );
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 모든 인벤토리 슬롯에 우클릭 이벤트 추가
        [...this.normalInventory.slots, ...this.equipmentInventory.slots, ...this.skinInventory.slots].forEach(slot => {
            slot.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.handleItemTransfer(slot);
            });
        });
    }

    handleItemTransfer(sourceSlot) {
        // 빈 슬롯이거나 유효하지 않은 아이템이 있는 슬롯인 경우 처리하지 않음
        if (!sourceSlot || !sourceSlot.dataset.itemName || !sourceSlot.querySelector('.ms2-item')) {
            return;
        }

        const sourceInventory = this.getInventoryFromSlot(sourceSlot);
        if (!sourceInventory) return;

        // 아이템 정보를 완전히 복사
        const item = {
            ...sourceSlot.dataset,
            displayName: JSON.parse(sourceSlot.dataset.displayName || '{}'),
            options: JSON.parse(sourceSlot.dataset.options || '[]'),
            additionaloptions: JSON.parse(sourceSlot.dataset.additionalOptions || '[]'),
            meta: {
                ...sourceSlot.dataset,
                options: JSON.parse(sourceSlot.dataset.options || '[]'),
                additionaloptions: JSON.parse(sourceSlot.dataset.additionalOptions || '[]')
            }
        };

        // 아이템 타입에 따라 적절한 인벤토리 선택
        let targetInventory;
        if (sourceInventory.type === 'normal') {
            // 일반 인벤토리에서 장비/스킨 인벤토리로 이동
            targetInventory = this.isSkinItem(item.itemName) ? this.skinInventory : this.equipmentInventory;
            
            // 장비/스킨 슬롯에 맞는 위치 찾기
            const targetSlot = this.findAppropriateSlot(targetInventory, item.itemName);
            if (targetSlot) {
                // 한벌 의상인 경우 상의와 하의 슬롯 모두에서 아이템 제거
                if (item.itemName === 'shine_star_stage_outfit') {
                    const shirtSlot = targetInventory.container.querySelector('.shirt');
                    const pantsSlot = targetInventory.container.querySelector('.pants');
                    
                    if (shirtSlot) {
                        const existingItem = targetInventory.removeItem(shirtSlot);
                        if (existingItem) {
                            sourceInventory.addItem(existingItem);
                        }
                        // 상의 슬롯의 데이터셋도 모두 제거
                        delete shirtSlot.dataset.itemName;
                        delete shirtSlot.dataset.imgSrc;
                        delete shirtSlot.dataset.itemType;
                        delete shirtSlot.dataset.itemGrade;
                        delete shirtSlot.dataset.reqLv;
                        delete shirtSlot.dataset.displayName;
                        delete shirtSlot.dataset.options;
                        delete shirtSlot.dataset.additionalOptions;
                    }
                    if (pantsSlot) {
                        const existingItem = targetInventory.removeItem(pantsSlot);
                        if (existingItem) {
                            sourceInventory.addItem(existingItem);
                        }
                        // 하의 슬롯의 데이터셋도 모두 제거
                        delete pantsSlot.dataset.itemName;
                        delete pantsSlot.dataset.imgSrc;
                        delete pantsSlot.dataset.itemType;
                        delete pantsSlot.dataset.itemGrade;
                        delete pantsSlot.dataset.reqLv;
                        delete pantsSlot.dataset.displayName;
                        delete pantsSlot.dataset.options;
                        delete pantsSlot.dataset.additionalOptions;
                        // 하의 슬롯의 더미 이미지도 제거
                        const dummyImg = pantsSlot.querySelector('.ms2-item');
                        if (dummyImg) {
                            dummyImg.remove();
                        }
                    }
                } else {
                    // 일반 아이템은 해당 슬롯에서만 제거
                    sourceInventory.removeItem(sourceSlot);
                }

                // 타겟 슬롯에 아이템이 있는 경우 교환
                if (targetSlot.querySelector('.ms2-item')) {
                    const existingItem = targetInventory.removeItem(targetSlot);
                    if (existingItem) {
                        sourceInventory.addItem(existingItem);
                    }
                }

                targetInventory.addItem(item, targetSlot);
                
                // 한벌 의상인 경우 하의 슬롯에도 이미지 표시
                if (item.itemName === 'shine_star_stage_outfit') {
                    const pantsSlot = targetInventory.container.querySelector('.pants');
                    if (pantsSlot && !pantsSlot.querySelector('.ms2-item')) {
                        const pantsImg = document.createElement('img');
                        pantsImg.className = 'ms2-item';
                        pantsImg.src = item.imgSrc;
                        pantsSlot.appendChild(pantsImg);
                    }
                }
                return;
            } else {
                // 장비/스킨 슬롯이 없거나 모두 찬 경우
                alert('해당 장비/스킨 슬롯이 없거나 모두 찼습니다!');
                return;
            }
        } else {
            // 장비/스킨 인벤토리에서 일반 인벤토리로 이동
            targetInventory = this.normalInventory;

            // 한벌 의상인 경우 상의와 하의 슬롯 모두에서 아이템 제거
            if (item.itemName === 'shine_star_stage_outfit') {
                const shirtSlot = sourceInventory.container.querySelector('.shirt');
                const pantsSlot = sourceInventory.container.querySelector('.pants');
                
                if (shirtSlot) {
                    const existingItem = sourceInventory.removeItem(shirtSlot);
                    if (existingItem) {
                        targetInventory.addItem(existingItem);
                    }
                    // 상의 슬롯의 데이터셋도 모두 제거
                    delete shirtSlot.dataset.itemName;
                    delete shirtSlot.dataset.imgSrc;
                    delete shirtSlot.dataset.itemType;
                    delete shirtSlot.dataset.itemGrade;
                    delete shirtSlot.dataset.reqLv;
                    delete shirtSlot.dataset.displayName;
                    delete shirtSlot.dataset.options;
                    delete shirtSlot.dataset.additionalOptions;
                }
                if (pantsSlot) {
                    const existingItem = sourceInventory.removeItem(pantsSlot);
                    if (existingItem) {
                        targetInventory.addItem(existingItem);
                    }
                    // 하의 슬롯의 데이터셋도 모두 제거
                    delete pantsSlot.dataset.itemName;
                    delete pantsSlot.dataset.imgSrc;
                    delete pantsSlot.dataset.itemType;
                    delete pantsSlot.dataset.itemGrade;
                    delete pantsSlot.dataset.reqLv;
                    delete pantsSlot.dataset.displayName;
                    delete pantsSlot.dataset.options;
                    delete pantsSlot.dataset.additionalOptions;
                    // 하의 슬롯의 더미 이미지도 제거
                    const dummyImg = pantsSlot.querySelector('.ms2-item');
                    if (dummyImg) {
                        dummyImg.remove();
                    }
                }
            } else {
                // 일반 아이템은 해당 슬롯에서만 제거
                sourceInventory.removeItem(sourceSlot);
            }
        }

        if (targetInventory.isFull()) {
            // 인벤토리가 가득 찼으면 원래 위치로 되돌림
            sourceInventory.addItem(item, sourceSlot);
            alert('인벤토리가 가득 찼습니다!');
            return;
        }

        targetInventory.addItem(item);
    }

    findAppropriateSlot(inventory, itemName) {
        // 장비/스킨 타입에 따른 슬롯 매핑
        const slotMapping = {
            // 장비 아이템
            'fire_prism_scepter': 'right-hand weapon',
            'fire_prism_codex': 'left-hand weapon',
            'fire_prism_hat': 'headgear',
            'fire_prism_shirt': 'shirt',
            'fire_prism_pants': 'pants',
            'fire_prism_gloves': 'gloves',
            'fire_prism_shoes': 'shoes',
            'geork_kai_earings': 'earings',
            'geork_kai_necklace': 'necklace',
            'geork_kai_rings': 'rings',
            'geork_kai_cape': 'cape',
            'geork_kai_belt': 'belt',
            // 스킨 아이템
            'cherry_blossom_scepter': 'right-hand weapon',
            'cherry_blossom_bouquet': 'left-hand weapon',
            'shine_star_beremo': 'headgear',
            'shine_star_stage_outfit': ['shirt', 'pants'], // 한벌 의상
            'shine_star_bracelet': 'gloves',
            'shine_star_walker': 'shoes',
            'shine_heart_wing': 'cape',
            'shine_star_deco': 'eyedeco',
            'egg_toast': 'facedeco'
        };

        const targetSlotName = slotMapping[itemName];
        if (!targetSlotName) return null;

        if (Array.isArray(targetSlotName)) {
            // 한벌 의상처럼 여러 슬롯에 적용되는 경우
            const slots = targetSlotName.map(slotName => {
                const slot = inventory.container.querySelector(`.${slotName}`);
                if (slot) {
                    return slot;
                }
                return null;
            }).filter(slot => slot !== null);

            // 모든 슬롯이 비어있는 경우에만 첫 번째 슬롯 반환
            if (slots.length > 0 && slots.every(slot => !slot.querySelector('.ms2-item'))) {
                return slots[0];
            }
            return null;
        } else {
            // 단일 슬롯에 적용되는 경우
            const slot = inventory.container.querySelector(`.${targetSlotName}`);
            if (slot) {
                // 무기 슬롯인 경우 항상 해당 슬롯 반환 (교환을 위해)
                if (targetSlotName === 'right-hand weapon' || targetSlotName === 'left-hand weapon') {
                    return slot;
                }
                // 다른 슬롯의 경우 비어있을 때만 반환
                if (!slot.querySelector('.ms2-item')) {
                    return slot;
                }
            }
            return null;
        }
    }

    getInventoryFromSlot(slot) {
        const type = slot.dataset.inventoryType;
        switch (type) {
            case 'normal':
                return this.normalInventory;
            case 'equipment':
                return this.equipmentInventory;
            case 'skin':
                return this.skinInventory;
            default:
                return null;
        }
    }

    isSkinItem(itemName) {
        const skinItems = [
            'cherry_blossom_scepter',
            'cherry_blossom_bouquet',
            'shine_star_beremo',
            'shine_star_stage_outfit',
            'shine_star_bracelet',
            'shine_star_walker',
            'shine_heart_wing',
            'shine_star_deco',
            'egg_toast'
        ];
        return skinItems.includes(itemName);
    }

    moveItem(sourceSlotIndex, targetSlotIndex, sourceInventoryType, targetInventoryType) {
        const sourceInventory = this[`${sourceInventoryType}Inventory`];
        const targetInventory = this[`${targetInventoryType}Inventory`];
        
        if (!sourceInventory || !targetInventory) {
            console.error('잘못된 인벤토리 타입입니다. (normal, equipment, skin)');
            return false;
        }

        return sourceInventory.moveItem(targetSlotIndex, targetInventory);
    }

    deleteItem(slotIndex, inventoryType) {
        const inventory = this[`${inventoryType}Inventory`];
        if (!inventory) {
            console.error('잘못된 인벤토리 타입입니다. (normal, equipment, skin)');
            return false;
        }

        return inventory.deleteItem(slotIndex);
    }

    addItemToInventory(item, slotIndex = null, inventoryType) {
        const inventory = this[`${inventoryType}Inventory`];
        if (!inventory) {           
            console.error('잘못된 인벤토리 타입입니다. (normal, equipment, skin)');
            return false;
        }

        // 아이템 추가 전 상태 출력
        console.log('\n=== 아이템 추가 전 인벤토리 상태 ===');
        inventory.printInventoryStatus();

        // 아이템 객체 정보 출력
        console.log('\n=== 추가할 아이템 정보 ===');
        console.log(JSON.stringify(item, null, 2));

        const result = inventory.addItemToInventory(item, slotIndex);

        // 아이템 추가 후 상태 출력
        console.log('\n=== 아이템 추가 후 인벤토리 상태 ===');
        inventory.printInventoryStatus();

        return result;
    }

    // 장비/스킨 선택 시 아이템 추가를 위한 메서드
    addSelectedItem(itemName, type) {
        console.log(`\n=== ${type === 'equipment' ? '장비' : '스킨'} 선택으로 인한 아이템 추가 ===`);
        
        // ITEM_DATABASE에서 아이템 찾기
        const itemData = ITEM_DATABASE[itemName];
        if (!itemData) {
            console.error(`아이템 데이터베이스에서 ${itemName}을(를) 찾을 수 없습니다.`);
            return false;
        }

        // 아이템 데이터의 깊은 복사
        const newItem = JSON.parse(JSON.stringify(itemData));
        
        // 메타데이터 추가
        newItem.meta = {
            itemName: newItem.itemName,
            imgSrc: newItem.imgSrc,
            itemType: newItem.itemType,
            itemGrade: newItem.itemGrade,
            reqLv: newItem.reqLv,
            options: newItem.options || [],
            additionaloptions: newItem.additionaloptions || []
        };

        console.log('생성된 아이템:', newItem);
        
        // 일반 인벤토리에 아이템 추가
        return this.addItemToInventory(newItem, null, 'normal');
    }
}

// 인벤토리 매니저 초기화
const inventoryManager = new InventoryManager();

// 아이템 데이터베이스 정의
const ITEM_DATABASE = {
    // 장비 아이템
    'fire_prism_scepter': {
        itemName: 'fire_prism_scepter',
        displayName: {
            ko: '파이어 프리즘 홀',
            en: 'Fire Prism Scepter'
        },
        imgSrc: './pictogram/item_fire_prism_scepter.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 100 },
            { type: 'magic_attack_percent', value: 10 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 50 },
            { type: 'magic_attack_percent', value: 5 }
        ]
    },
    'fire_prism_codex': {
        itemName: 'fire_prism_codex',
        displayName: {
            ko: '파이어 프리즘 법전',
            en: 'Fire Prism Codex'
        },
        imgSrc: './pictogram/item_fire_prism_codex.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 80 },
            { type: 'magic_attack_percent', value: 8 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 40 },
            { type: 'magic_attack_percent', value: 4 }
        ]
    },
    'fire_prism_hat': {
        itemName: 'fire_prism_hat',
        displayName: {
            ko: '파이어 프리즘 모자',
            en: 'Fire Prism Hat'
        },
        imgSrc: './pictogram/item_fire_prism_hat.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 50 },
            { type: 'magic_attack_percent', value: 5 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 25 },
            { type: 'magic_attack_percent', value: 3 }
        ]
    },
    'fire_prism_shirt': {
        itemName: 'fire_prism_shirt',
        displayName: {
            ko: '파이어 프리즘 상의',
            en: 'Fire Prism Shirt'
        },
        imgSrc: './pictogram/item_fire_prism_shirt.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 80 },
            { type: 'magic_attack_percent', value: 8 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 40 },
            { type: 'magic_attack_percent', value: 4 }
        ]
    },
    'fire_prism_pants': {
        itemName: 'fire_prism_pants',
        displayName: {
            ko: '파이어 프리즘 하의',
            en: 'Fire Prism Pants'
        },
        imgSrc: './pictogram/item_fire_prism_pants.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 70 },
            { type: 'magic_attack_percent', value: 7 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 35 },
            { type: 'magic_attack_percent', value: 3 }
        ]
    },
    'fire_prism_gloves': {
        itemName: 'fire_prism_gloves',
        displayName: {
            ko: '파이어 프리즘 장갑',
            en: 'Fire Prism Gloves'
        },
        imgSrc: './pictogram/item_fire_prism_gloves.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 60 },
            { type: 'magic_attack_percent', value: 6 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 30 },
            { type: 'magic_attack_percent', value: 3 }
        ]
    },
    'fire_prism_shoes': {
        itemName: 'fire_prism_shoes',
        displayName: {
            ko: '파이어 프리즘 신발',
            en: 'Fire Prism Shoes'
        },
        imgSrc: './pictogram/item_fire_prism_shoes.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 50 },
            { type: 'magic_attack_percent', value: 5 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 25 },
            { type: 'magic_attack_percent', value: 2 }
        ]
    },
    'geork_kai_earings': {
        itemName: 'geork_kai_earings',
        displayName: {
            ko: '거크 카이 귀걸이',
            en: 'Geork Kai Earrings'
        },
        imgSrc: './pictogram/item_geork_kai_earings.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 50 },
            { type: 'magic_attack_percent', value: 5 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 25 },
            { type: 'magic_attack_percent', value: 2 }
        ]
    },
    'geork_kai_necklace': {
        itemName: 'geork_kai_necklace',
        displayName: {
            ko: '거크 카이 목걸이',
            en: 'Geork Kai Necklace'
        },
        imgSrc: './pictogram/item_geork_kai_necklace.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 60 },
            { type: 'magic_attack_percent', value: 6 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 30 },
            { type: 'magic_attack_percent', value: 3 }
        ]
    },
    'geork_kai_rings': {
        itemName: 'geork_kai_rings',
        displayName: {
            ko: '거크 카이 반지',
            en: 'Geork Kai Rings'
        },
        imgSrc: './pictogram/item_geork_kai_rings.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 40 },
            { type: 'magic_attack_percent', value: 4 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 20 },
            { type: 'magic_attack_percent', value: 2 }
        ]
    },
    'geork_kai_cape': {
        itemName: 'geork_kai_cape',
        displayName: {
            ko: '거크 카이 카프',
            en: 'Geork Kai Cape'
        },
        imgSrc: './pictogram/item_geork_kai_cape.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 50 },
            { type: 'magic_attack_percent', value: 5 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 25 },
            { type: 'magic_attack_percent', value: 2 }
        ]
    },
    'geork_kai_belt': {
        itemName: 'geork_kai_belt',
        displayName: {
            ko: '거크 카이 벨트',
            en: 'Geork Kai Belt'
        },
        imgSrc: './pictogram/item_geork_kai_belt.png',
        itemType: 'equipment',
        itemGrade: 'epic',
        reqLv: 60,
        options: [
            { type: 'magic_attack', value: 30 },
            { type: 'magic_attack_percent', value: 3 }
        ],
        additionaloptions: [
            { type: 'magic_attack', value: 15 },
            { type: 'magic_attack_percent', value: 1 }
        ]
    },
    // 스킨 아이템
    'cherry_blossom_scepter': {
        itemName: 'cherry_blossom_scepter',
        displayName: {
            ko: '벚꽃 홀',
            en: 'Cherry Blossom Scepter'
        },
        imgSrc: './pictogram/item_cherry_blossom_scepter.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'cherry_blossom_bouquet': {
        itemName: 'cherry_blossom_bouquet',
        displayName: {
            ko: '체리 블로섬 홀 (홀)',
            en: 'Cherry Blossom Bouquet (Scepter)'
        },
        imgSrc: './pictogram/item_cherry_blossom_bouquet.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_star_beremo': {
        itemName: 'shine_star_beremo',
        displayName: {
            ko: '샤인 스타 베레모',
            en: 'Shine Star Beremo'
        },
        imgSrc: './pictogram/item_shine_star_beremo.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_star_stage_outfit': {
        itemName: 'shine_star_stage_outfit',
        displayName: {
            ko: '샤인 스타 무대 의상',
            en: 'Shine Star Stage Outfit'
        },
        imgSrc: './pictogram/item_shine_star_stage_outfit.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_star_bracelet': {
        itemName: 'shine_star_bracelet',
        displayName: {
            ko: '샤인 스타 브레이슬릿',
            en: 'Shine Star Bracelet'
        },
        imgSrc: './pictogram/item_shine_star_bracelet.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_star_walker': {
        itemName: 'shine_star_walker',
        displayName: {
            ko: '샤인 스타 워커',
            en: 'Shine Star Walker'
        },
        imgSrc: './pictogram/item_shine_star_walker.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_heart_wing': {
        itemName: 'shine_heart_wing',
        displayName: {
            ko: '샤인 하트 윙',
            en: 'Shine Heart Wing'
        },
        imgSrc: './pictogram/item_shine_heart_wing.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'shine_star_deco': {
        itemName: 'shine_star_deco',
        displayName: {
            ko: '샤인 스타 데코',
            en: 'Shine Star Deco'
        },
        imgSrc: './pictogram/item_shine_star_deco.png',
        itemType: 'skin',
        itemGrade: 'excellent',
        reqLv: 1,
        options: [],
        additionaloptions: []
    },
    'egg_toast': {
        itemName: 'egg_toast',
        displayName: {
            ko: '에그 토스트',
            en: 'Egg Toast'
        },
        imgSrc: './pictogram/item_egg_toast.png',
        itemType: 'skin',
        itemGrade: 'normal',
        reqLv: 1,
        options: [],
        additionaloptions: []
    }
};

// 초기 아이템 추가
const initialItems = [
    {...ITEM_DATABASE['fire_prism_scepter']},
    {...ITEM_DATABASE['fire_prism_scepter']},
    {...ITEM_DATABASE['fire_prism_scepter']},
    {...ITEM_DATABASE['fire_prism_scepter']},
    {...ITEM_DATABASE['fire_prism_codex']},
    {...ITEM_DATABASE['fire_prism_codex']}
];

initialItems.forEach(item => {
    inventoryManager.normalInventory.addItem(item);
});

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .ms2-inventory {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    }
    .inventory-row {
        display: flex;
        gap: 2px;
    }
    .ms2-item-slot {
        width: 50px;
        height: 50px;
        border: 1px solid #666;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ms2-item-slot:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #888;
    }
    .ms2-item-slot img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .ms2-item-slot.dragging {
        opacity: 0.5;
    }
    .ms2-item-slot.drag-over {
        border: 2px dashed #ff0;
        background-color: rgba(255, 255, 0, 0.1);
    }
`;
document.head.appendChild(style);

// 개발자 콘솔에서 사용할 수 있도록 전역 함수로 등록
window.getInventoryStatus = () => inventoryManager.normalInventory.getInventoryStatus();
window.printInventoryStatus = () => inventoryManager.normalInventory.printInventoryStatus();
window.debugInventoryStatus = () => inventoryManager.normalInventory.debugInventoryStatus();

// 사용 예시 출력
console.log(`
=== 인벤토리 관리 명령어 ===
1. 아이템 이동: inventoryManager.moveItem(sourceSlotIndex, targetSlotIndex, sourceInventoryType, targetInventoryType)
   예: inventoryManager.moveItem(0, 1, 'normal', 'equipment')

2. 아이템 삭제: inventoryManager.deleteItem(slotIndex, inventoryType)
   예: inventoryManager.deleteItem(0, 'normal')

3. 아이템 추가: inventoryManager.addItemToInventory(item, slotIndex, inventoryType)
   예: inventoryManager.addItemToInventory(ITEM_DATABASE['fire_prism_scepter'], 0, 'normal')

4. 인벤토리 상태 확인:
   - getInventoryStatus()
   - printInventoryStatus()
   - debugInventoryStatus()
`);

// 장비/스킨 선택 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    // 장비 선택 이벤트
    const gearSelect = document.getElementById('gear-select');
    if (gearSelect) {
        gearSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            if (selectedOption.value) {
                const itemName = selectedOption.value;
                console.log('선택된 장비:', itemName);
                inventoryManager.addSelectedItem(itemName, 'equipment');
            }
        });
    }

    // 스킨 선택 이벤트
    const skinSelect = document.getElementById('skin-select');
    if (skinSelect) {
        skinSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            if (selectedOption.value) {
                const itemName = selectedOption.value;
                console.log('선택된 스킨:', itemName);
                inventoryManager.addSelectedItem(itemName, 'skin');
            }
        });
    }
});
        
