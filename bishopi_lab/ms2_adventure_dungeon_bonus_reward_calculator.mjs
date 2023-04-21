export function character_adventure_dungeon_reward_meso(level){
    const A_Standard_price = 6415.00;
    const A_Standard_interpolation = 164.25;
    let A_Standard = Math.floor(A_Standard_price + (A_Standard_interpolation*(level - 1))); // A 기준 값 결정 시 소숫점 자리 버림
    let A = A_Standard*12;
    let A_divide_4 = Math.floor(A/4);
    let A_divide_3 = Math.floor(A/3);
    let A_divide_2 = Math.floor(A/2);
    /**
     * 계산 공식
     * (A/4 + A/4 + A/4 + A/4 + A/3 + A/3 + A/2 + A/2) = 8A/3
     * 단, A = A기준값(소숫점 버림)*120
     * A기준값 = A기준 초기값 6415(1레벨 기준) + (캐릭터 레벨 - 초기 캐릭터 레벨 1)
     */
    let summation_mesos = (A_divide_4*4 + A_divide_3*2 + A_divide_2*2)*10;
    return level >= 50 ? summation_mesos : 0; //캐릭터 레벨이 50레벨 이상인 경우에만 모험던전 클리어 보너스 메소를 획득할 수 있음. 50레벨 미만 캐릭터는 획득 보너스 메소가 0이다.
}

export function characters_adventure_dungeon_reward_meso(...level){
    return level.map((e)=>character_adventure_dungeon_reward_meso(e));
    
}