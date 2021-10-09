const config = {
    target : document.getElementById("target"),
    topPage : document.getElementById("top-page"),
}

const marks = {
    "circle" : "○",
    "triangle" : "△",
    "star" : "☆"
}

class Game {
    constructor(playerName, playerMark, playerTurn, cpuMark, boardLength){
        this.playerName = playerName;
        this.playerMark = playerMark;
        this.playerTurn = playerTurn;
        this.cpuMark = cpuMark;
        this.boardLength = boardLength;
        // this.boardState = {};
        this.boardStateArray = this.createBoardStateArray(boardLength);
        this.turn = 0;
        this.inProgress = true;
    }

    addBoardState(num, mark){
        this.boardState[num] = mark;
    }

    addBoardStateArray(num, mark){
        console.log(this.boardStateArray);
        let quotient = Math.floor(num / this.boardLength);
        let remind = num % this.boardLength;
        console.log(quotient);
        console.log(remind);
        this.boardStateArray[quotient][remind] = mark;
    }

    createBoardStateArray(boardLength){
        let array = new Array(boardLength);
        for(let i = 0; i < boardLength; i++){
            array[i] = new Array(boardLength);
        }
        return array;
    }
}

class View {
    // 1ページ目表示
    static returnTop(){
        // ページ2削除
        config.target.innerHTML = '';
        // ページ1表示
        config.topPage.classList.remove("d-none");
        config.topPage.classList.add("d-flex");
        config.target.append(config.topPage);
    }

    static createBoardHtml(boardLength, playerName, playerMark){
        // マス目部分
        let squares = ``;
        for(let i=0; i<boardLength; i++){
            let row = `<div class="row">`;
            for(let j=0; j<boardLength; j++){
                row += `<div class="d-flex justify-content-center align-items-center bg-success square border display-4" ></div>`;
            }
            row += `</div>`;
            squares += row;
        }

        let board = 
            `
                <div id="top-text" class = "d-flex justify-content-center">
                    <div style = "padding: 100px 40% 0px 40%">
                        <p id="nextPlayer" class="w-100">NextPlayer: ${playerName}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="container bg-primary p-5">
                        ${squares}
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <p class="mr-1"><span id="playerNamePage2">${playerName}</span>: <span id="playerMark">${playerMark}</span></p>
                    <p class="ml-1">CPU: <span id="cpuMark">×</span></p>
                </div>

                <div class="d-flex justify-content-center">
                    <button type="submit" onclick="event.preventDefault(); View.returnTop();">Back to Top</button>
                </div>
            `;
        
        return board;
    }
}

// クリック時にマークを表示
function checkMark(target,game){
    // マス目が埋まっていない場合のみ処理を実行
    if(target.innerText == "" && game.inProgress){
        game.turn++;
        if(game.playerTurn){
            target.innerText = game.playerMark;
            document.getElementById("nextPlayer").innerText = `NextPlayer: CPU`;
            game.playerTurn = false;
        } else {
            target.innerText = game.cpuMark;
            document.getElementById("nextPlayer").innerText = `NextPlayer: ${game.playerName}`;
            game.playerTurn = true;
        }
    }
}

// 2ページ目表示
function startGame(){
    // ページ1を非表示
    config.topPage.classList.remove("d-flex");
    config.topPage.classList.add("d-none");
    // ページ2作成
    let gamePage = document.createElement("div");
    gamePage.classList.add("vh-100", "d-flex", "flex-column", "align-items-center");
    gamePage.setAttribute('id', 'game-page');
    // Gameクラス初期化
    let game = new Game(
        document.getElementById("playerName").value,
        marks[document.querySelectorAll(`input[name="mark"]:checked`)[0].id],
        true,
        "×",
        parseInt(document.getElementById("length").value),
    );

    // マス目の部分
    gamePage.innerHTML = View.createBoardHtml(game.boardLength, game.playerName, game.playerMark);

    // 各マスにイベント追加
    let squares = gamePage.querySelectorAll(".square");
    for(let i = 0; i < squares.length; i++){
        squares[i].setAttribute('data-square', i);
        squares[i].addEventListener("click", function(event){
            let currentMark = (game.playerTurn)? game.playerMark : game.cpuMark;
            // game.addBoardState(event.target.dataset.square, currentMark);
            game.addBoardStateArray(event.target.dataset.square, currentMark);
            checkMark(event.target, game);
            let winner = checkWinner(game);
            if(winner != null){
                game.inProgress = false;
                document.getElementById("nextPlayer").innerText = winner + "の勝利！！";
                alert(winner + "の勝利！！！");
            }
            if(game.turn == Math.pow(game.boardLength, 2) && winner == null){
                if(game.inProgress) alert("引き分け！");
                game.inProgress = false;
                document.getElementById("nextPlayer").innerText = "引き分け！";
            }
        });
    }

    // 2ページ目表示
    config.target.append(gamePage);
}