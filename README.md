# team5-frontend
penguin mina

# Important
## Header.js, Boards.js
```Header```와 ```Boards```에는 기능 구현을 위해 ```history.push()``` 코드가 있지만 Route되지 않은 오브젝트이다. 따라서 ```Pages/Header/Header```나 ```Boards```를 사용할 때에는 항상 ```history```를 ```props```로 넘겨줘야 한다.

(나중에 Context를 적용하게 되기 전까지)