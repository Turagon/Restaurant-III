# 餐廳清單3

### Function 功能
 1. 具備增 刪 修改功能
 2. 新增餐廳具有重複資訊檢查確認功能
 3. 餐廳詳細資訊頁面新增同地區推薦餐廳欄位
 4. 首頁增加搜尋以及排序功能

### Installation & Execution 安裝與設定
 1. git clone from https://github.com/Turagon/Restaurant-III.git to the local folder in    your PC. 
 在終端機使用git clone指令 由 https://github.com/Turagon/Restaurant-III.git位置下載到電腦中 

 2. use command cd to access the folder. 
 終端機指令cd 進入該檔案夾中 

 3. use npm install command to install the following package
    a. express
    b. express-handlebars
    c. just-handlebars-helpers
    d. body-parser
    e. mongoose
    f. method-override
    使用npm install安裝上列所有套件
 
 4. create a database in MongoDB named restaurantdatas
 在MongoDB建立一個名稱為restaurantdatas的資料庫

 5. execute npm run seed to build up basic datas in MongoDB. terminal will show "done" when finished building up
 先執行npm run seed 建立基本資料 完成後終端機會顯示done

 6. execute nodemon app.js, terminal will display "server on" & "db connecting success"
 執行nodemon app.js 終端機會顯示"server on" 跟 "db connecting success"

 7. conect with browser at localhost:3000
 在瀏覽器網址位置輸入localhost:3000

### Coded by 作者 
 Rex Lin
 rexlin6245@gmail.com

 