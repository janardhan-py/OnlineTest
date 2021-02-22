import random
'''
for i in range(20):
    N=random.randint(0,100)
    print("HC00"+str(N))
'''

choices = list(range(1000))
random.shuffle(choices)
num1=choices.sort()
print("HC"+str(num1))
while choices:
    if input('Want another random number?(Y/N)' ).lower() == 'n':
        break
    num2 = choices.pop()
    print("HC"+str(num2))