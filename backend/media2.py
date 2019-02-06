N=1
while(N!= 0):
    contador = 0
    N = int(input())
    if(N==0):
        break
    posts = input().split()
    i = 0
    while i<N:
        if(i==0):
            total = len(posts)
            if((posts[total-1]== '0' and posts[i] == '0') or (posts[i] == '0' and posts[i+1]=='0')):
                if(posts[i+2] == '0'):
                    posts[i+1] = 1
                else:
                    posts[i] = 1
                contador = contador + 1
        else:
            if(posts[i-1] == '0' and posts[i]=='0' or posts[i]=='0' and posts[i+1]=='0'):
                if(posts[i+2] == '0'):
                    posts[i+1] = 1
                else:
                    posts[i] = 1
                contador = contador+1
        i = i + 1
    print (contador)
            