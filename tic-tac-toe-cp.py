import random
import numpy as np

random.seed()
N=3
Game=[i for i in range(0,9)]

#ゲームボード表示    
def output(list):        
    for i in range(0,9):
        if i == 2 or i==5:
            print(Game[i])
        else:
            print(Game[i],end="")
    print("\n");
#プレイヤーの入力箇所
def computer():
    return random.randrange(0,9)
def markinput(playermark): 
    point = int(input("\n1~9の番号を入れてください: "))
    #point=computer()

    if(Game[point] == 'o' or Game[point] == 'x'):
        print("すでに埋められています")
        markinput(playermark)

    else:
        Game[point] = playermark
def cpmark(playermark):
    point=computer()
    if(Game[point] == 'o' or Game[point] == 'x'):
        print("すでに埋められています")
        markinput(playermark)

    else:
        Game[point] = playermark
#勝利条件をチェック
def checkwinner():
    lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for i in range(0, len(lines)):
        [a, b, c] = lines[i]

        if Game[a] and Game[a] == Game[b] and Game[a] == Game[c]: 
     
            return Game[a]
    
    return None
                
output(Game)
for i in range(0,9):
    #プレイヤーの識別
    if(i%2 == 0) : 
        markinput("o")
    else:
        cpmark("x")

    output(Game) 
    print("\n-----------------")
    if checkwinner() == 'o': 
        print("oの勝ち")
        break
    elif checkwinner() == 'x':
        print("xの勝ち")
        
    if i == 8 and checkwinner==None:
        print("引き分けです")
        break
