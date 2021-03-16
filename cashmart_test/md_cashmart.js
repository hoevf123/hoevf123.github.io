/* Cashmart Arbeit Independent Running Module */
/* This Source Requires ES6 Specifications!! */
/* File Created 2018-09-13 by "Day of Bishop (DongYeong Kim)" */


class Product{
    constructor(_productName,_imgSrc){
        this.name=_productName;
        this.imgSrc=_imgSrc;
    }
}
class Npc{
    constructor(_npcName,_imgSrc){
        this.name=_npcName;
        this.imgSrc=_imgSrc;
    }
}

/* used for npc-product sets relationships */
class NpcRequires{
    constructor(_npc, ..._Products){
        this.npc=_npc;
        this.requiredProduct=[];
        if(_Products.length>1){
            for(let idx_arg=0;idx_arg<_Products.length;idx_arg++){
                let foundProduct = findProductByName(_Products[idx_arg]);
                if(foundProduct instanceof Product)
                    this.requiredProduct.push(foundProduct);
            }
        }    
    }
}


/* this class is used for gaming */
class CashMart_Customer{
    constructor(_Npc,_requiredProduct=null,_isRequiringProduct=false){
        this.npc=((_Npc instanceof Npc)?_Npc:null);
        this.requiredProduct=((_requiredProduct instanceof Product)?_requiredProduct:null);
        this.isRequiringProduct=_isRequiringProduct;
    }
}



class Maple2CashMart{
    constructor(){
        this.stages=[1,2,3];
        this.idx_currentStage=0;
        this.idx_nextCustomerSet=0;
        this.arbeit_start_time=0;
        this.arbeit_end_time=0;
        this.products=[];
        this.npcs=[];
        this.npcRequires=[];
        this.players=[];
        this.remainingCustomers=[];
        this.stage_productRequires=[]; //used for cashmart play
        this.default_cashmart_customers=[
            /* Npcs(Customers) : total 96 Persons*/
            /* NPC Group List
            1 : Only One Product Requires : 28 Persons
            2 : Specific of A(Some) Group(s) Requires : 40 Persons
            3 : All Random Products Requires : 29 Persons
            */

            /* 1 - Only One Product Required NPCs : 28 Persons */
            /* Estimated Group 1 : 7 People */
            ["홀슈타트","res/images/cust/홀슈타트.jpg"],
            ["칼","res/images/cust/칼.jpg"],
            ["프레이","res/images/cust/프레이.jpg"],
            ["자베스","res/images/cust/자베스.jpg"],
            ["앤디","res/images/cust/앤디.jpg"],
            ["그루몽","res/images/cust/그루몽.jpg"],
            ["미엘","res/images/cust/미엘.jpg"],

            /* Estimated Group 2 : 7 People */
            ["유페리아","res/images/cust/유페리아.jpg"],
            ["알론","res/images/cust/알론.jpg"],
            ["바닐라","res/images/cust/바닐라.jpg"],
            ["브라보","res/images/cust/브라보.jpg"],
            ["노숙자","res/images/cust/노숙자.jpg"],
            ["로봇","res/images/cust/로봇.jpg"],
            ["빨간코 통통한 남자","res/images/cust/빨간코 통통한 남자.jpg"],

            /* Estimated Group 3 : 7 People */

            ["렌듀비앙","res/images/cust/렌듀비앙.jpg"],
            ["준타","res/images/cust/준타.jpg"],
            ["페르시카","res/images/cust/페르시카.jpg"],
            ["민트","res/images/cust/민트.jpg"],
            ["고양이","res/images/cust/고양이.jpg"],
            ["망토두른 남자","res/images/cust/망토두른 남자.jpg"],
            ["앞치마 두른 아주머니","res/images/cust/앞치마 두른 아주머니.jpg"],
            
            /* Estimated Group 4 : 7 People */
            ["틴차이","res/images/cust/틴차이.jpg"],
            ["루아나","res/images/cust/루아나.jpg"],
            ["케이","res/images/cust/케이.jpg"],
            ["어흥이","res/images/cust/어흥이.jpg"],
            ["바사라 첸","res/images/cust/바사라 첸.jpg"],
            ["페리온 무도가","res/images/cust/페리온 무도가.jpg"],
            ["피아","res/images/cust/피아.jpg"],


            
            /* 2 -  Specific of A(Some) Group(s) Required NPCs : 40 Persons */
            
            /* Group 1 : 11 People */
            ["마법사","res/images/cust/마법사.jpg"],
            ["스타츠","res/images/cust/스타츠.jpg"],
            ["공돌이(소)", "res/images/NPC_test.png"],
            ["모자를 쓴 여자꼬마","res/images/cust/모자를 쓴 여자꼬마.jpg"],
            ["털보 아저씨","res/images/cust/털보 아저씨.jpg"],
            ["농장 아주머니","res/images/cust/농장 아주머니.jpg"],
            ["할아버지","res/images/cust/할아버지.jpg"],
            ["할머니","res/images/cust/할머니.jpg"],
            ["양갈래머리 여자꼬마","res/images/cust/양갈래머리 여자꼬마.jpg"],
            ["붉은머리 남자꼬마","res/images/cust/붉은머리 남자꼬마.jpg"],
            ["민머리 남자꼬마","res/images/cust/민머리 남자꼬마.jpg"],


            /* Group 2 : 11 People */
            ["핑크머리 연주가","res/images/cust/핑크머리 연주가.jpg"],
            ["하얀머리 연주가","res/images/cust/하얀머리 연주가.jpg"],
            ["디디","res/images/cust/디디.jpg"],
            ["레이","res/images/cust/레이.jpg"],
            ["피치","res/images/cust/피치.jpg"],
            ["레이첼","res/images/cust/레이첼.jpg"],
            ["둔바","res/images/cust/둔바.jpg"],
            ["연구원","res/images/cust/연구원.jpg"],
            ["빵모자를 쓴 아주머니","res/images/cust/빵모자를 쓴 아주머니.jpg"],
            ["여도적","res/images/cust/여도적.jpg"],
            ["메이드","res/images/cust/메이드.jpg"],

            /* Group 3 : 8 People */
            ["근위대원","res/images/cust/근위대원.jpg"],
            ["마녀","res/images/cust/마녀.jpg"],
            ["혁이","res/images/cust/혁이.jpg"],
            ["공돌이(대)", "res/images/NPC_test.png"],
            ["박사","res/images/cust/박사.jpg"],
            ["알리바 회장","res/images/cust/알리바 회장.jpg"],
            ["뚜왈렛 여사","res/images/cust/뚜왈렛 여사.jpg"],
            ["교도관","res/images/cust/교도관.jpg"],

            /* Group 4 : 10 People */
            ["슈반다","res/images/cust/슈반다.jpg"],
            ["의사","res/images/cust/의사.jpg"],
            ["쉐도우월드 의사","res/images/cust/쉐도우월드 의사.jpg"],
            ["타라","res/images/cust/타라.jpg"],
            ["루비","res/images/cust/루비.jpg"],
            ["바비","res/images/cust/바비.jpg"],
            ["붉은머리 통통한 남자꼬마","res/images/cust/붉은머리 통통한 남자꼬마.jpg"],
            ["청록머리 여자꼬마","res/images/cust/청록머리 여자꼬마.jpg"],
            ["선장","res/images/cust/선장.jpg"],
            ["가죽모자 아저씨","res/images/cust/가죽모자 아저씨.jpg"],


            /* 3 - All Random Product(s) Required NPCs : 29 Persons */

            /* Group 1 : 6 People */
            ["갈색머리 보부상","res/images/cust/갈색머리 보부상.jpg"],
            ["주황머리 보부상","res/images/cust/주황머리 보부상.jpg"],
            ["청록썬캡 아주머니","res/images/cust/청록썬캡 아주머니.jpg"],
            ["파마머리 아주머니","res/images/cust/파마머리 아주머니.jpg"],
            ["남자 엘프 요정","res/images/cust/남자 엘프 요정.jpg"],
            ["여자 엘프 요정","res/images/cust/여자 엘프 요정.jpg"],
            
            /* Group 2 : 8 People */
            ["남청머리 아주머니","res/images/cust/남청머리 아주머니.jpg"],
            ["붉은머리 아주머니","res/images/cust/붉은머리 아주머니.jpg"],
            ["미나르 아주머니","res/images/cust/미나르 아주머니.jpg"],
            ["미나르 통통한 아저씨","res/images/cust/미나르 통통한 아저씨.jpg"],
            ["미나르 여자꼬마","res/images/cust/미나르 여자꼬마.jpg"],
            ["초록모자 남자꼬마","res/images/cust/초록모자 남자꼬마.jpg"],
            ["모자를 쓴 남자꼬마","res/images/cust/모자를 쓴 남자꼬마.jpg"],
            ["남청머리 숙녀","res/images/cust/남청머리 숙녀.jpg"],

            /* Group 3 : 8 People */
            ["털복숭이","res/images/cust/털복숭이.jpg"],
            ["가죽모자 난장이","res/images/cust/가죽모자 난장이.jpg"],
            ["물방울모양 요정","res/images/cust/물방울모양 요정.jpg"],
            ["흑발 숙녀","res/images/cust/흑발 숙녀.jpg"],
            ["금발 숙녀","res/images/cust/금발 숙녀.jpg"],
            ["은발 숙녀","res/images/cust/은발 숙녀.jpg"],
            ["인디안 아주머니","res/images/cust/인디안 아주머니.jpg"],
            ["인디안 여자꼬마","res/images/cust/인디안 여자꼬마.jpg"],

            /* Group 4 : 7 People */
            ["흰머리 잡상인","res/images/cust/흰머리 잡상인.jpg"],
            ["노랑머리 잡상인","res/images/cust/노랑머리 잡상인.jpg"],
            ["핑크머리 썬캡 아주머니","res/images/cust/핑크머리 썬캡 아주머니.jpg"],
            ["미나르 아저씨","res/images/cust/미나르 아저씨.jpg"],
            ["대머리 촌장","res/images/cust/대머리 촌장.jpg"],
            ["사진작가","res/images/cust/사진작가.jpg"],
            ["노란모자 통통한 아저씨","res/images/cust/노란모자 통통한 아저씨.jpg"],


            /* Others */
            ["테스트용 마네킹","res/images/cust/테스트용 마네킹.jpg"],
            ["비숍의하루","res/images/bishop.png"]
            
        ];
        this.default_cashmart_products=[
            /* total : 100 products */
            /* Group List
            ---ㅁ--ㅁ---ㅁ--ㅁ---
            _____ㅁ_______ㅁ_____
            L  1  2  3  4   5  R
            S  6  7  8  9  10  S
            _____________________
            */

            /* Section 1 : 8 Products */
            ["옐로우 포크레인","res/images/prod/옐로우 포크레인.jpg"],
            ["레드 레이싱 머신","res/images/prod/레드 레이싱 머신.jpg"],
            ["갱스터 엔필라르","res/images/prod/갱스터 엔필라르.jpg"],
            ["플라잉 스타 쵸퍼","res/images/prod/플라잉 스타 쵸퍼.jpg"],
            ["루디브리엄 로켓","res/images/prod/루디브리엄 로켓.jpg"],
            ["경비행기 모형","res/images/prod/경비행기 모형.jpg"],
            ["미니 보트","res/images/prod/미니 보트.jpg"],
            ["나룻배","res/images/prod/나룻배.jpg"],

            /* Section 2 : 8 Products */
            ["붉은색 빈티지 트렁크","res/images/prod/붉은색 빈티지 트렁크.jpg"],
            ["갈색 클래식 트렁크","res/images/prod/갈색 클래식 트렁크.jpg"],
            ["나무 절단기","res/images/prod/나무 절단기.jpg"],
            ["세공용 드릴","res/images/prod/세공용 드릴.jpg"],
            ["대용량 컨테이너","res/images/prod/대용량 컨테이너.jpg"],
            ["캠핑용 텐트","res/images/prod/캠핑용 텐트.jpg"],
            ["아이스박스","res/images/prod/아이스박스.jpg"],
            ["블루 라인 해먹","res/images/prod/블루 라인 해먹.jpg"],
            ["원","res/images/prod/원.jpg"],

            /* Section 3 : 8 Products */
            ["철제 2층 침대","res/images/prod/철제 2층 침대.jpg"],
            ["럭셔리 원형 쿠션 침대","res/images/prod/럭셔리 원형 쿠션 침대.jpg"],
            ["두툼 스트라이프 쿠션 소파","res/images/prod/두툼 스트라이프 쿠션 소파.jpg"],
            ["전통 나무 시소","res/images/prod/전통 나무 시소.jpg"],
            ["수면 캡슐","res/images/prod/수면 캡슐.jpg"],
            ["바디 릴렉싱 안마 의자","res/images/prod/바디 릴렉싱 안마 의자.jpg"],
            ["핑크 쿠션 의자","res/images/prod/핑크 쿠션 의자.jpg"],
            ["붉은 방석","res/images/prod/붉은 방석.jpg"],

            /* Section 4 : 8 Products */
            ["전신 거울","res/images/prod/전신 거울.jpg"],
            ["엔틱 옷장","res/images/prod/엔틱 옷장.jpg"],
            ["모던 원목 화장대","res/images/prod/모던 원목 화장대.jpg"],
            ["게스트북 데스크","res/images/prod/게스트북 데스크.jpg"],
            ["수술용 조명","res/images/prod/수술용 조명.jpg"],
            ["수술용 침대 의자","res/images/prod/수술용 침대 의자.jpg"],
            ["수술용품 트레이","res/images/prod/수술용품 트레이.jpg"],
            ["링거 고정대","res/images/prod/링거 고정대.jpg"],

            /* Section 5 : 8 Products */
            ["트레이닝 샌드백","res/images/prod/트레이닝 샌드백.jpg"],
            ["블루 트램펄린","res/images/prod/블루 트램펄린.jpg"],
            ["야구공 바구니","res/images/prod/야구공 바구니.jpg"],
            ["핸드볼 바구니","res/images/prod/핸드볼 바구니.jpg"],
            ["다이나믹 러닝머신","res/images/prod/다이나믹 러닝머신.jpg"],
            ["미니 농구대","res/images/prod/미니 농구대.jpg"],
            ["미니 골 포스트","res/images/prod/미니 골 포스트.jpg"],
            ["농구공 바구니","res/images/prod/농구공 바구니.jpg"],

            /* Section 6 : 8 Products */
            ["스탠다드 싱크대","res/images/prod/스탠다드 싱크대.jpg"],
            ["스탠다드 가스레인지","res/images/prod/스탠다드 가스레인지.jpg"],
            ["럭셔리 세면대","res/images/prod/럭셔리 세면대.jpg"],
            ["드럼 세탁기","res/images/prod/드럼 세탁기.jpg"],
            ["디럭스 샤워 부스","res/images/prod/디럭스 샤워 부스.jpg"],
            ["천연 나무 목욕탕","res/images/prod/천연 나무 목욕탕.jpg"],
            ["세라믹 심플 욕조","res/images/prod/세라믹 심플 욕조.jpg"],
            ["눈누비데 좌변기","res/images/prod/눈누비데 좌변기.jpg"],

            /* Section 7 : 8 Products */
            ["프린세스 스윙","res/images/prod/프린세스 스윙.jpg"],
            ["럭셔리 샹들리에","res/images/prod/럭셔리 샹들리에.jpg"],
            ["문양 힌지 스탠드","res/images/prod/문양 힌지 스탠드.jpg"],
            ["향 단지","res/images/prod/향 단지.jpg"],
            ["전문가용 앰프","res/images/prod/전문가용 앰프.jpg"],
            ["업라이트 피아노","res/images/prod/업라이트 피아노.jpg"],
            ["비브라폰","res/images/prod/비브라폰.jpg"],
            ["고구마 화로","res/images/prod/고구마 화로.jpg"],

            /* Section 8 : 8 Products */
            ["힐링 약초 화분","res/images/prod/힐링 약초 화분.jpg"],
            ["3단 타이어","res/images/prod/3단 타이어.jpg"],
            ["바다용 튜브","res/images/prod/바다용 튜브.jpg"],
            ["정돈된 닻줄","res/images/prod/정돈된 닻줄.jpg"],
            ["스마트 화분","res/images/prod/스마트 화분.jpg"],
            ["미니 어항","res/images/prod/미니 어항.jpg"],
            ["스노우 빌리지","res/images/prod/스노우 빌리지.jpg"],
            ["포션 정수기","res/images/prod/포션 정수기.jpg"],

            /* Section 9 : 8 Products*/
            ["벽난로","res/images/prod/벽난로.jpg"],
            ["숯불 오븐","res/images/prod/숯불 오븐.jpg"],
            ["바베큐용 그릴","res/images/prod/바베큐용 그릴.jpg"],
            ["제도용 책상","res/images/prod/제도용 책상.jpg"],
            ["간이 용광로","res/images/prod/간이 용광로.jpg"],
            ["담금질 화로","res/images/prod/담금질 화로.jpg"],
            ["풀무","res/images/prod/풀무.jpg"],
            ["모루","res/images/prod/모루.jpg"],

            /* Section 10 : 8 Products */
            ["마법의 물약병","res/images/prod/마법의 물약병.jpg"],
            ["가정용 미싱기","res/images/prod/가정용 미싱기.jpg"],
            ["무인 감시 카메라","res/images/prod/무인 감시 카메라.jpg"],
            ["뉴스 카메라","res/images/prod/뉴스 카메라.jpg"],
            ["보석 조립 테이블","res/images/prod/보석 조립 테이블.jpg"],
            ["간이 공구함","res/images/prod/간이 공구함.jpg"],
            ["전문가용 미술용품","res/images/prod/전문가용 미술용품.jpg"],
            ["이젤","res/images/prod/이젤.jpg"],

            /* Section Left Side : 10 Products */
            ["비취용의 눈물","res/images/prod/비취용의 눈물.jpg"],
            ["수호자의 방패","res/images/prod/수호자의 방패.jpg"],
            ["영웅의 장검","res/images/prod/영웅의 장검.jpg"],
            ["캐시 앤 로얄 쥬얼리 세트","res/images/prod/캐시 앤 로얄 쥬얼리 세트.jpg"],
            ["빨간 미니 냉장고","res/images/prod/빨간 미니 냉장고.jpg"],
            ["오렌지 콤팩트 냉장고","res/images/prod/오렌지 콤팩트 냉장고.jpg"],
            ["양문형 메탈 냉장고","res/images/prod/양문형 메탈 냉장고.jpg"],
            ["레트로 TV","res/images/prod/레트로 TV.jpg"],
            ["화이트 슬림 TV","res/images/prod/화이트 슬림 TV.jpg"],
            ["레드 2단 선풍기","res/images/prod/레드 2단 선풍기.jpg"],

            /* Section Right Side : 10 Products */
            ["대전 게임 오락기","res/images/prod/대전 게임 오락기.jpg"],
            ["아케이드 오락기","res/images/prod/아케이드 오락기.jpg"],
            ["포토스티커 머신","res/images/prod/포토스티커 머신.jpg"],
            ["인형뽑기 기계","res/images/prod/인형뽑기 기계.jpg"],
            ["댄스댄스 머신","res/images/prod/댄스댄스 머신.jpg"],
            ["미니 당구대","res/images/prod/미니 당구대.jpg"],
            ["미니 탁구대","res/images/prod/미니 탁구대.jpg"],
            ["미니 축구게임 테이블","res/images/prod/미니 축구게임 테이블.jpg"],
            ["DJ 머신","res/images/prod/DJ 머신.jpg"],
            ["야옹 캣타워","res/images/prod/야옹 캣타워.jpg"],

            /* Others */
            ["테스트용 천연 나무 욕조", "res/images/product_natural_wooden_bath.png"]
        ];
        this.default_cashmart_npc_requires=[
            /* 1 - Only One Product Required NPCs : 28 Persons */
            /* Estimated Group 1 : 7 People */
            ["홀슈타트","전신 거울"],
            ["칼","게스트북 데스크"],
            ["프레이","수호자의 방패"],
            ["자베스","갱스터 엔필라르"],
            ["앤디","화이트 슬림 TV"],
            ["그루몽","가정용 미싱기"],
            ["미엘","스노우 빌리지"],

            /* Estimated Group 2 : 7 People */
            ["유페리아","링거 고정대"],
            ["알론","영웅의 장검"],
            ["바닐라","모던 원목 화장대"],
            ["브라보","미니 당구대"],
            ["노숙자","캠핑용 텐트"],
            ["로봇","수면 캡슐"],
            ["빨간코 통통한 남자","벽난로"],

            /* Estimated Group 3 : 7 People */

            ["렌듀비앙","천연 나무 목욕탕"],
            ["준타","블루 트램펄린"],
            ["페르시카","비취용의 눈물"],
            ["민트","핑크 쿠션 의자"],
            ["고양이","야옹 캣타워"],
            ["망토두른 남자","무인 감시 카메라"],
            ["앞치마 두른 아주머니","드럼 세탁기"],
            
            /* Estimated Group 4 : 7 People */
            ["틴차이","블루 라인 해먹"],
            ["루아나","바디 릴렉싱 안마 의자"],
            ["케이","전문가용 앰프"],
            ["어흥이","전문가용 미술용품"],
            ["바사라 첸","트레이닝 샌드백"],
            ["페리온 무도가","다이나믹 러닝머신"],
            ["피아","붉은 방석"],


            
            /* 2 -  Specific of A(Some) Group(s) Required NPCs : 40 Persons */
            
            /* Group 1 : 11 People */
            ["마법사","힐링 약초 화분","포션 정수기","마법의 물약병","보석 조립 테이블"],
            ["스타츠","양문형 메탈 냉장고","스탠다드 싱크대","스탠다드 가스레인지","숯불 오븐"],
            ["공돌이(소)", "나무 절단기","세공용 드릴","제도용 책상","간이 공구함"],
            ["모자를 쓴 여자꼬마","포토스티커 머신","인형뽑기 기계","미니 당구대","미니 탁구대","미니 축구게임 테이블"],
            ["털보 아저씨","포토스티커 머신","인형뽑기 기계","미니 당구대","미니 탁구대","미니 축구게임 테이블"],
            ["농장 아주머니","포토스티커 머신","인형뽑기 기계","미니 당구대","미니 탁구대","미니 축구게임 테이블"],
            ["할아버지","레트로 TV","두툼 스트라이프 쿠션 소파","바디 릴렉싱 안마 의자","향 단지"],
            ["할머니","레트로 TV","두툼 스트라이프 쿠션 소파","바디 릴렉싱 안마 의자","향 단지"],
            ["양갈래머리 여자꼬마","루디브리엄 로켓","전통 나무 시소","블루 트램펄린","야구공 바구니","핸드볼 바구니","미니 농구대","미니 골 포스트","농구공 바구니","스노우 빌리지","대전 게임 오락기","아케이드 오락기"],
            ["붉은머리 남자꼬마","루디브리엄 로켓","전통 나무 시소","블루 트램펄린","야구공 바구니","핸드볼 바구니","미니 농구대","미니 골 포스트","농구공 바구니","스노우 빌리지","대전 게임 오락기","아케이드 오락기"],
            ["민머리 남자꼬마","루디브리엄 로켓","전통 나무 시소","블루 트램펄린","야구공 바구니","핸드볼 바구니","미니 농구대","미니 골 포스트","농구공 바구니","스노우 빌리지","대전 게임 오락기","아케이드 오락기"],


            /* Group 2 : 11 People */
            ["핑크머리 연주가","전문가용 앰프","업라이트 피아노","비브라폰"],
            ["하얀머리 연주가","전문가용 앰프","업라이트 피아노","비브라폰"],
            ["디디","전문가용 앰프","댄스댄스 머신","DJ 머신"],
            ["레이","전문가용 앰프","댄스댄스 머신","DJ 머신"],
            ["피치","간이 용광로","담금질 화로","풀무","모루"],
            ["레이첼","간이 용광로","담금질 화로","풀무","모루"],
            ["둔바","고구마 화로","바베큐용 그릴"],
            ["연구원","철제 2층 침대","두툼 스트라이프 쿠션 소파","힐링 약초 화분","스마트 화분","미니 어항","포션 정수기","제도용 책상"],
            ["빵모자를 쓴 아주머니","빨간 미니 냉장고","오렌지 콤팩트 냉장고","양문형 메탈 냉장고","레트로 TV","화이트 슬림 TV","레드 2단 선풍기","스탠다드 싱크대","스탠다드 가스레인지","럭셔리 세면대","드럼 세탁기","디럭스 샤워 부스","천연 나무 목욕탕","세라믹 심플 욕조","눈누비데 좌변기"],
            ["여도적","빨간 미니 냉장고","오렌지 콤팩트 냉장고","양문형 메탈 냉장고","레트로 TV","화이트 슬림 TV","레드 2단 선풍기","스탠다드 싱크대","스탠다드 가스레인지","럭셔리 세면대","드럼 세탁기","디럭스 샤워 부스","천연 나무 목욕탕","세라믹 심플 욕조","눈누비데 좌변기"],
            ["메이드","빨간 미니 냉장고","오렌지 콤팩트 냉장고","양문형 메탈 냉장고","레트로 TV","화이트 슬림 TV","레드 2단 선풍기","스탠다드 싱크대","스탠다드 가스레인지","럭셔리 세면대","드럼 세탁기","디럭스 샤워 부스","천연 나무 목욕탕","세라믹 심플 욕조","눈누비데 좌변기"],

            /* Group 3 : 8 People */
            ["근위대원","수호자의 방패","영웅의 장검"],
            ["마녀","힐링 약초 화분","포션 정수기","마법의 물약병","보석 조립 테이블"],
            ["혁이","화이트 슬림 TV","전신 거울","전문가용 앰프","업라이트 피아노","무인 감시 카메라"],
            ["공돌이(대)","나무 절단기","세공용 드릴","간이 용광로","담금질 화로","풀무","모루"],
            ["박사","나무 절단기","세공용 드릴","간이 용광로","담금질 화로","풀무","모루"],
            ["알리바 회장","캐시 앤 로얄 쥬얼리 세트","붉은색 빈티지 트렁크","갈색 클래식 트렁크","럭셔리 원형 쿠션 침대","엔틱 옷장","프린세스 스윙","럭셔리 샹들리에"],
            ["뚜왈렛 여사","캐시 앤 로얄 쥬얼리 세트","붉은색 빈티지 트렁크","갈색 클래식 트렁크","럭셔리 원형 쿠션 침대","엔틱 옷장","프린세스 스윙","럭셔리 샹들리에"],
            ["교도관","옐로우 포크레인","플라잉 스타 쵸퍼","철제 2층 침대","전신 거울","3단 타이어","무인 감시 카메라"],

            /* Group 4 : 10 People */
            ["슈반다","전문가용 미술용품","이젤"],
            ["의사","수술용 조명","수술용 침대 의자","수술용품 트레이","링거 고정대"],
            ["쉐도우월드 의사","수술용 조명","수술용 침대 의자","수술용품 트레이","링거 고정대"],
            ["타라","레드 레이싱 머신","플라잉 스타 쵸퍼","모던 원목 화장대","디럭스 샤워 부스","세라믹 심플 욕조"],
            ["루비","대전 게임 오락기","아케이드 오락기","포토스티커 머신","인형뽑기 기계","댄스댄스 머신","미니 당구대","미니 탁구대","미니 축구게임 테이블"],
            ["바비","대전 게임 오락기","아케이드 오락기","포토스티커 머신","인형뽑기 기계","댄스댄스 머신","미니 당구대","미니 탁구대","미니 축구게임 테이블"],
            ["붉은머리 통통한 남자꼬마","루디브리엄 로켓","경비행기 모형","미니 보트"],
            ["청록머리 여자꼬마","루디브리엄 로켓","경비행기 모형","미니 보트"],
            ["선장","미니 보트","나룻배","대용량 컨테이너","3단 타이어","바다용 튜브","정돈된 닻줄"],
            ["가죽모자 아저씨","미니 보트","나룻배","대용량 컨테이너","3단 타이어","바다용 튜브","정돈된 닻줄"],


            /* 3 - All Random Product(s) Required NPCs : 29 Persons */

            /* Group 1 : 6 People */
            ["갈색머리 보부상"],
            ["주황머리 보부상"],
            ["청록썬캡 아주머니"],
            ["파마머리 아주머니"],
            ["남자 엘프 요정"],
            ["여자 엘프 요정"],
            
            /* Group 2 : 8 People */
            ["남청머리 아주머니"],
            ["붉은머리 아주머니"],
            ["미나르 아주머니"],
            ["미나르 통통한 아저씨"],
            ["미나르 여자꼬마"],
            ["초록모자 남자꼬마"],
            ["모자를 쓴 남자꼬마"],
            ["남청머리 숙녀"],

            /* Group 3 : 8 People */
            ["털복숭이"],
            ["가죽모자 난장이"],
            ["물방울모양 요정"],
            ["흑발 숙녀"],
            ["금발 숙녀"],
            ["은발 숙녀"],
            ["인디안 아주머니"],
            ["인디안 여자꼬마"],

            /* Group 4 : 7 People */
            ["흰머리 잡상인"],
            ["노랑머리 잡상인"],
            ["핑크머리 썬캡 아주머니"],
            ["미나르 아저씨"],
            ["대머리 촌장"],
            ["사진작가"],
            ["노란모자 통통한 아저씨"],
            /* Others */
            ["비숍의하루"]
        ];

        this.default_stage_customer_visitSets=[
            /* Stage 1 :: 4 People Approach */
            [
                [3,["갈색머리 보부상", "주황머리 보부상", "청록썬캡 아주머니", "파마머리 아주머니", "남자 엘프 요정", "여자 엘프 요정"]],
                [2,["남청머리 아주머니", "붉은머리 아주머니", "미나르 아주머니", "초록모자 남자꼬마", "모자를 쓴 남자꼬마", "남청머리 숙녀"]],
                [4,["홀슈타트", "칼", "프레이", "자베스", "앤디", "그루몽"]],
                [1,["마법사", "스타츠", "공돌이(소)", "모자를 쓴 여자꼬마", "양갈래머리 여자꼬마", "할아버지", "할머니", "붉은머리 남자꼬마", "민머리 남자꼬마", "털보 아저씨", "농장 아주머니"]]
            ],
            /* Stage 2 :: 8 People Approach */
            [
                [2,["쉐도우월드 의사", "핑크머리 연주가", "하얀머리 연주가", "디디", "레이", "둔바", "피치", "레이첼", "빵모자를 쓴 아주머니", "연구원", "여도적", "메이드"]],
                [3,["유페리아", "알론", "바닐라", "브라보", "노숙자", "로봇", "빨간코 통통한 아저씨"]],
                [1,["인디안 아주머니","인디안 여자꼬마", "털복숭이", "가죽모자 난장이","모자를 쓴 남자꼬마", "흑발 숙녀", "금발 숙녀", "은발 숙녀"]],
                [4,["근위대원", "마녀", "혁이", "공돌이(대)", "박사", "알리바 회장", "교도관", "뚜왈렛 여사"]],
                [2,["렌듀비앙", "준타", "페르시카", "민트", "고양이", "망토두른 남자", "앞치마 두른 아주머니"]],
                [3,["슈반다", "붉은머리 통통한 남자꼬마", "의사", "쉐도우월드 의사", "타라", "루비", "바비", "선장", "청록머리 여자꼬마", "가죽모자 아저씨"]],
                [1,["틴차이", "루아나", "케이", "어흥이", "바사라 첸", "페리온 무도가", "피아"]],
                [4,["흰머리 잡상인", "노랑머리 잡상인", "핑크머리 썬캡 아주머니", "대머리 촌장", "미나르 아저씨", "사진작가", "노란모자 통통한 아저씨"]]
            ],
            /* Stage 3 :: 12 People Approach */
            [
                [4,["근위대원", "마녀", "혁이", "공돌이(대)", "박사", "알리바 회장", "교도관", "뚜왈렛 여사"]],
                [2,["렌듀비앙", "준타", "페르시카", "민트", "고양이", "망토두른 남자", "앞치마 두른 아주머니"]],
                [3,["갈색머리 보부상", "주황머리 보부상", "청록썬캡 아주머니", "파마머리 아주머니", "남자 엘프 요정", "여자 엘프 요정"]],
                [1,["인디안 아주머니", "인디안 여자꼬마", "털복숭이", "가죽모자 난장이", "흑발 숙녀", "금발 숙녀", "은발 숙녀"]],
                [2,["남청머리 아주머니", "붉은머리 아주머니", "미나르 아주머니", "미나르 여자꼬마", "초록모자 남자꼬마", "모자를 쓴 남자꼬마", "남청머리 숙녀"]],
                [4,["홀슈타트", "칼", "프레이", "자베스", "앤디", "그루몽", "미엘"]],
                [3,["슈반다", "붉은머리 통통한 남자꼬마", "의사", "쉐도우월드 의사", "타라", "루비", "바비", "선장", "청록머리 여자꼬마", "가죽모자 아저씨"]],
                [1,["마법사", "스타츠", "공돌이(소)", "공돌이(대)", "모자를 쓴 여자꼬마", "양갈래머리 여자꼬마", "할아버지", "할머니", "붉은머리 남자꼬마", "민머리 남자꼬마", "털보 아저씨", "농장 아주머니"]],
                [1,["틴차이", "루아나", "케이", "어흥이", "바사라 첸", "페리온 무도가", "피아"]],
                [4,["흰머리 잡상인", "노랑머리 잡상인", "핑크머리 썬캡 아주머니", "대머리 촌장", "미나르 아저씨", "사진작가", "노란모자 통통한 아저씨"]],
                [2,["핑크머리 연주가", "하얀머리 연주가", "디디", "레이", "둔바", "피치", "레이첼", "빵모자를 쓴 아주머니", "연구원", "여도적", "메이드"]],
                [3,["유페리아", "알론", "바닐라", "브라보", "노숙자", "로봇", "빨간코 통통한 아저씨"]]
            ]
            // Finish Cashmart Arbeit
        ];

        this.map_grid=[
            /** 
             * cashmart(correct name as "Cathy Mart") map size(except border) : 22x14 
             * code of objects display numbers
             *  -1 : void, 1 : land, 2 : land(border deco), 3: wall, 4: product placeholder, 5 : mart door(entrance)
             *  6 ~ 9 player teleport site, 10 : cashier teleport site, 11 : respawn point
             * 
             * product code(total 100 items)
             * 101~108 : SITE 1
             * 109~116 : SITE 2
             * 117~116 : SITE 3
             * 125~116 : SITE 4
             * 133~116 : SITE 5
             * 141~116 : SITE 6
             * 149~116 : SITE 7
             * 157~116 : SITE 8
             * 165~116 : SITE 9
             * 172~179 : SITE 10
             * 181~190 : SITE LEFT
             * 191~200 : SITE RIGHT
             * */

             // working place, 20(w)
            [2,2,1,1,4,1,1,1,4,1,1,1,4,1,1,1,4,1,2,2], //entrance of mart
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //customer waiting site
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [3,3,3,3,4,3,3,3,4,3,3,3,4,3,3,3,4,3,3,3], //product delivery placeholder position(CUSTOMER - CASHIER)
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //cashier working site
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [3,3,3,3,3,3,3,4,3,3,3,3,4,3,3,3,3,3,3,3], //product delivery placeholder position(CASHIER - TRANSPORTER)
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //front road
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //front road
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //line 15 (0->15)
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //middle road
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //middle road
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //line 21 (0->21)
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //back road
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //back road
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], //back padding
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], //wall
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], //employer(BOSS, Cathy Catalina) office
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2], 
            [2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,2], //GATE 2,3
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
            [2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,2], //GATE 1,4, RESPAWN POINT & PORTAL WARP SPAWN POINT
            [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2],
        ];

        this.map_objects_grid=[...(this.map_grid)];

        /* info - How to write stage_productRequires 
            this.stage_productRequires = [ ["a","b", "c"] ]        
        */
        console.log("cashmart_metadata_list prepare complete");
        console.log("loading cashmart_metadata to Cashmart Object");
        console.log(this.default_cashmart_customers);
        this.default_cashmart_customers.forEach((e)=>{this.appendNpcs(e)});
        this.default_cashmart_products.forEach((e)=>{this.appendProducts(e)});
        this.default_cashmart_npc_requires.forEach((e)=> this.appendNpcRequires(e));
        console.log("Cashmart Object Conversion and load Completed.");
    }
    onkeydown(){
        switch(e.key){
            case 39:    //up
                break;
            case 40:    //left
                break
            case 41:    //down
                break;
            case 42:    //right
                break;
            case 20:    //interact : space-bar
                break;
        }
    }
    attatchEvent(){
        window.addEventListener('keydown',this.onkeydown);
    }
    addPlayer(player){
        this.players.push(players);
    }
    removePlayer(player){
        this.players.pop(players);
    }
    appendNpcs(){
        Array.prototype.forEach.call(arguments,(element) => {
            if(element instanceof Array) this.npcs.push(new Npc(element[0],element[1]));
        });
    }
    appendProducts(){
        Array.prototype.forEach.call(arguments,element => {
            if(element instanceof Array) this.products.push(new Product(element[0],element[1]));
        });
    }
    appendNpcRequires(){
        Array.prototype.forEach.call(arguments,(element) => {
            if(element instanceof Array){
                let _found_npc = this.findNpcByName(element[0]);
                if(_found_npc.constructor === Npc){
                    let _created_npcRequires = new NpcRequires(_found_npc);
                    if(2 <= element.length){
                        element.slice(1).forEach((e)=>{
                            let _created_product = this.findProductByName(e);
                            if(_created_product!=null){
                                if(_created_product.constructor === Product){
                                    _created_npcRequires.requiredProduct.push(_created_product);
                                }
                            }
                            
                        });
                    }
                    this.npcRequires.push(_created_npcRequires);
                    
                }
            } 
        });
    }
    pickNpcRequires(npc_name){
        if(npc_name===undefined){
            if(!(this.npcRequires.length>=1)){
                return null;
            }
            var idx_npcRequires=Math.floor(this.npcRequires.length * Math.random());
            return this.npcRequires[idx_npcRequires]
        }
        return this.findNpcRequireByNpc(this.findNpcByName(npc_name));
    }
    pickRandomProduct(){
        if(this.products.length < 1){
            return null;
        }
        let idx_prod = Math.floor(Math.random() * this.products.length);
        return this.products[idx_prod];
    }
    pickProductByNpcRequires(_NpcRequires){
        if(_NpcRequires==null){
            return null;
        }
        /* return Any Product one if requiredProduct List is empty */
        else if(_NpcRequires.requiredProduct.length < 1){
            return this.pickRandomProduct();
        }
        let idx_npcprod=Math.floor(Math.random()*_NpcRequires.requiredProduct.length);
           return _NpcRequires.requiredProduct[idx_npcprod];
    }
    
    findNpcRequireByNpc(_Npc){
        return (this.npcRequires.find((e)=>{
            console.log("compare : " + e + " and " + _Npc + "\n" );
            if(!(e.npc instanceof Npc));
            else if(e.npc.name === _Npc.name){
                return e;
            }
        }));
    }
    findProductByName(_Product_name){
        return (this.products.find((e)=>{
            if(!(e.constructor === Product));
            else if(e.name === _Product_name)
                return e;
        }));
    }
    findNpcByName(_Npc_name){
        return (this.npcs.find((e)=>{
            if(!(e.constructor === Npc));
            else if(e.name === _Npc_name)
                return e;
        }));
    }
    reset(){
        this.remainingCustomers.clear();
    }
    destructor(){
        delete this;
    }
    addRemainingCustomers(...npc){
        this.remainingCustomers.push(...npc);
        return undefined;
    }
    removeRemainingCustomers(...npc){
        npc.forEach((function(element){this.remainingCustomers.pop(element);}).bind(this));
        return this.remainingCustomers.length;
    }
    isRemaingCustomerEmpty(){
        return (this.remainingCustomers.length<=0);
    }
    summonCurrentCustomer(){
        var _cust_visitsets=this.default_stage_customer_visitSets;
        var _idx_current_round = this.idx_currentStage-1;
        var _idx_current_cust_set = this.idx_nextCustomerSet;
        if(!(_cust_visitsets==undefined||_cust_visitsets[_idx_current_round]==undefined)){
            if(!(_cust_visitsets[_idx_current_round][_idx_current_cust_set]==undefined)){
                //get currunt visitive customer sets.
                var _t_cust_setsinfo = _cust_visitsets[_idx_current_round][_idx_current_cust_set];
                var _ret_val=[_t_cust_setsinfo[0]-1,undefined];//return as array(args:current entrance info, cust-name)
                var _t_cust_sets = _t_cust_setsinfo[1];
                var _picked_cust_name = undefined;
                
                if(_t_cust_setsinfo!==undefined)
                    _picked_cust_name = _t_cust_sets[Math.floor(Math.random()*_t_cust_sets.length)];
                _ret_val[1]=_picked_cust_name;
                console.log("arr : "+ _t_cust_sets);
                console.log("current_round : "+ _idx_current_round + " idx_current_cust_set : " +_idx_current_cust_set);
                console.log("summon-door = " + _ret_val[0] + " cust-name :" + _ret_val[1]);
                this.idx_nextCustomerSet++;
                return _ret_val;
            }
        }
        return undefined;
    }
}