# 練習作品: 簡易旅遊網站
## `簡介`
#### 作品來源
使用[前端時光屋3rd Rex Lai week1的UI設計](https://2021.thef2e.com/users/6296427084285739189/)，搭配上作者加入的簡易RWD。

#### 使用技術
* reactjs 17.0.2
* reduxjs-toolkit + redux-thunk
* CSS modules

#### 成品
[簡易旅遊網站](https://oscar71156.github.io/whereToGoDuck/)

## `Installation`
#### Requirement
* nodejs
* git

#### Step
1. Dowload the project
``` git clone ```
2. Execute the program. In project root folder, enter `npm start` or `yarn start `
   * By default, the program will use temporary data(attraction, restaurant...). If you want to get the online data, you can change `REACT_APP_IS_GET_ONLINE_DATA` in environmental variable.
     * Windows(cmd.exe) 
       * `set "REACT_APP_IS_GET_ONLINE_DATA=false" && npm start`
     * Windows(Powershell) 
       * `($env:REACT_APP_IS_GET_ONLINE_DATA = "true") -and (npm start)`
     * Linux, macOS (Bash)
       * `REACT_APP_IS_GET_ONLINE_DATA=true npm start`
3. Open http://localhost:3000 to view it in your browser.




