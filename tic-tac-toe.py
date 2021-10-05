import random
import numpy as np

N=int(input("Nの値を入れてください"))
Game=[ [i for i in range(1,N+1)] for j in range(N)]
for i in range(0,N*N):
    Game += [str(i)]
#ゲームボード表示    
def output(list):        
    for i in range(0,N):
        print(Game[i])
#プレイヤーの入力箇所
def markinput(playermark): 
    xpoint = int(input("0~Nのx座標を入れてください: "))
    ypoint = int(input("0~Nのy座標を入れてください: "))

    if(Game[xpoint][ypoint] == 'o' or Game[xpoint][ypoint] == 'x'):
        print("すでに埋められています")
        markinput(playermark)

    else:
        Game[xpoint][ypoint] = playermark
#勝利条件をチェック
def checkwinner(number):
    #横列をチェック
    for i in range(0,number):
        ocount=0
        xcount=0
        for j in range(0,number):
            if Game[i][j] == "o":
                ocount += 1
            elif Game[i][j]=="x":
                xcount += 1
            else:
                break
        if ocount==number:
            return "o"
        elif xcount==number:
            return "x"
        else:
            break
    #縦列をチェック
    for j in range(0,number):
        ocount=0
        xcount=0
        for i in range(0,number):
            if Game[i][j] == "o":
                ocount += 1
            elif Game[i][j]=="x":
                xcount += 1
            else:
                break
        if ocount==number:
            return "o"
        elif xcount==number:
            return "x"
        else:
            break
    ocount=0
    xcount=0
    #左上からの斜めチェック
    for i in range(0,number):
        if Game[i][i]=="o":
            ocount+= 1
        elif Game[i][i]=="x":
            xcount+=1
        else:
            break
    if ocount==number:
        return "o"
    elif xcount==number:
        return "x"
    
    ocount=0
    xcount=0
    #右上からの斜めチェック
    for i in range(number):
        if Game[i][number-i-1]=="o":
            ocount += 1
        elif Game[i][number-i-1]=="x":
            xcount += 1
        else:
            break
    if ocount==number:
        return "o"
    elif xcount==number:
        return "x"
   
    return None
                
output(Game)
for i in range(0,N*N):
    #プレイヤーの識別
    if(i%2 == 0) : 
        markinput("o")
    else:
        markinput("x")

    output(Game) 
    print("-----------------")
    if checkwinner(N) == 'o': 
        print("oの勝ち")
        break
    elif checkwinner(N) == 'x':
        print("xの勝ち")
        
    if i == N*N-1:
        print("引き分けです")
        break
