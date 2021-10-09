function checkWinner(game){
    console.log(game);
    // ゲーム終了後は判定を行わない
    if(!game.inProgress) return null;

    // 横列をチェック
    for(let i = 0; i < game.boardLength; i++){
        let mark = game.boardStateArray[i][0];
        if(mark == undefined) continue;
        let count = 0;
        for(let j = 0; j < game.boardLength; j++){
            if(game.boardStateArray[i][j] != mark) break;
            count++;
        }
        if(count == game.boardLength){
            console.log("横の判定" + "開始位置" + i);
            return (mark == game.playerMark)? game.playerName : "CPU";
        }
    }

    // 縦列をチェック
    for(let i = 0; i < game.boardLength; i++){
        let mark = game.boardStateArray[0][i];
        if(mark == undefined) continue;
        let count = 0;
        for(let j = 0; j < game.boardLength; j++){
            if(game.boardStateArray[j][i] != mark) break;
            count++;
        }
        if(count == game.boardLength){
            console.log("縦の判定" + "開始位置" + i);
            return (mark == game.playerMark)? game.playerName : "CPU";
        }
    }

    // 左上から斜めをチェック
    let leftTopMark = game.boardStateArray[0][0];
    let diagonalCount1 = 0;
    for(let i = 0; i < game.boardLength; i++){
        if(game.boardStateArray[i][i] == undefined || game.boardStateArray[i][i] != leftTopMark) break;
        diagonalCount1++;
    }
    if(diagonalCount1 == game.boardLength){
        console.log("左上から斜めの判定");
        return (leftTopMark == game.playerMark)? game.playerName : "CPU";
    }

    // 右上から斜めをチェック
    let rightTopMark = game.boardStateArray[0][game.boardLength-1];
    let diagonalCount2 = 0;
    for(let i = 0; i < game.boardLength; i++){
        if(game.boardStateArray[i][game.boardLength-i-1] == undefined || game.boardStateArray[i][game.boardLength-i-1] != rightTopMark) break;
        diagonalCount2++;
    }
    if(diagonalCount2 == game.boardLength){
        console.log("右上から斜めの判定");
        return (rightTopMark == game.playerMark)? game.playerName : "CPU";
    }

    return null;
}