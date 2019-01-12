# restApi-shop
__A restful api for shop.__

__The Api is build with NodeJs ExpressJs MongoDB__

__*The routes are authenticated using json web token (jwt) .*__

- create and Authenticate user
- Add , retrieve ,update and delete  Products
- add ,retrieve and delete orders

--------


## Routes
--------
# user/signup
## POST
__create a new user__
 ##### body (raw)
 - email(string,required)
 - password(string,required)
 
# user/login
## POST
__Authenticate the user__
 ##### body (raw)
 - email(string,required)
 - password(string,required)
   
--------
# /products
## GET
 __get list of all products__
## POST
 __create a new product__
 ##### body (form data)
 - name (string,required)
 - price(Number,required)
 - productImage(file,required)
 ##### Header(Authorization)
  - token(string,required)
  
# /products/{id}
## GET
 __get details of the product__
## PATCH
 __update the  product__
 ##### body (raw)
  - Array of Objects
  
  eg:to update name and price
  
   [ {"propName":"name" , "value":"newName"},
    {"propName":"price" , "value":"newPrice"} ]
 ##### Header(Authorization)
  - token(string,required)
 ## DELETE
 __delete the  product__
 ##### Header(Authorization)
  - token(string,required)  
  
 -------- 
# /orders
## GET
__get list of all orders__
##### Header(Authorization)
  - token(string,required)
## POST 
 __create a new order__
 ##### body (raw)
 - product (objectId,required)
 - quantity(Number,optional)
 
    default is 1
 ##### Header(Authorization)
 - token(string,required)
   
# /orders/{id}
## GET
__get details of the order__
##### Header(Authorization)
  - token(string,required)
## DELETE 
 __delete the order__ 
 ##### Header(Authorization)
 - token(string,required)   
 
