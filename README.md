# Ugly Veggie

## Description
Ugly Veggie is a web application that offers a fruit and vegetables delivery service to its users. A lot of fruits and vegetables are not bought by supermarkets because they are small, asymmetric, scarred or decolorated and so, they are ugly. Ugly Veggie offers the users the opportunity to buy a box of these products and get it delivered to their doorstep.

Ugly Veggie users can select the box they are interested in and fill it with any of the available products. Once their box is ready, they can pay for the service and subscribe to a weekly delivery. If they want, they can also change the selected box or the products in it, as well as their delivery information.  

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the platform so that I can start getting the ugly veggie service.
-  **Login:** As a user I can login to the platform so that I can edit my ugly veggie service preferences and information.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Select a box:** As a user I can select a box so that I can fill it with the quantity of products I want. 
-  **Fill the box:** As a user I can fill the box with the items I prefer so that I don't get delivered anything I don't want. 
-  **Search the products:** As a user I can search which are the available products so that I can choose which ones I prefer.
-  **Pay the service:** As a user I can pay the services so that I get my box delivered. 
-  **Edit the box selection:** As a user I can edit the box selection so that I can get more/less products. 
-  **Edit the box products:** As a user I can edit the box products so that I can start/stop recieving products I am/am not interested in/anymore. 
-  **Edit delivery information:** As a user I can edit the delivery information so that I can get the box delivered to any address I want. 
- **Unsubscribe:** As a user I can unsubscribe from the delivery service so that I can stop recieving and paying the service. 

## Backlog

- Styles.
- Email notifications.
- Password recovery.
- Facebook login.
- Password strength indicator. 
- Delivery address validation. 
- Pagination for products. 
- Paypal/Stripe payment. 
- Details page for the products. 
  
# Client

## Routes
| Route        | Description |
| :------------- |:-------------|
| /      | Homepage |
| /auth/signup      | Signup form |
| /auth/login | Login form |
| /profile | Show profile |
| /profile/edit| Edit profile form |
| /box  | Show box |
| /box/edit  | Show product search and shopping cart |
| 404  | Show Not Found |

## Pages

- Home Page 
- Sign in Page 
- Log in Page 
- Profile Page
- Edit profile Page.
- Box Page
- Edit Page
- Complete Profile Page. 
- 404 Page 

## Components
- NavBar
- Auth Form
- Slider Box
- Box Element
- Product Element
- Shopping Cart

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.editUser(userPropertiesObject)   
- Box service
  - box.getBox(userId)
  - box.createBox(boxObject)
  - box.editBox(boxPropertiesObject)
  - box.deleteBox(userID)
- Product service
  - product.getList()

# Server

## Models

User model

```
email                   String // required & unique
password                String // required
firstName               String 
lastName                String 
deliveryAddress         Object 
    - streetAddress     String 
    - country           String 
    - province          String 
    - city:             String 
    - postalCode:       Number 
phone                   String 
notifications           Boolean
payment                 Boolean
completeProfile         Boolean
```

Box model

```
price                   Number  // required
size                    String  // required
maxQuantity             Number  // required
products                Array of Objects  // required
    - quantity          Number
    - Product_ID        ObjectID<Product>
owner                   ObjectID<User>
```

Product model

```
name             String  // required
image            String  // required
stock            Number  // required
description      String  // required
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - email
    - password
- POST /auth/login
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)
- PUT auth/edit
  - body:
    - myBox
    - firstName
    - lastName
    - phone
    - deliveryAddress
- GET /box
- POST /box
  - body:
    - price
    - size
    - maxQuantity
    - products
- PUT /box
  - body:
    - price
    - size
    - maxQuantity
    - products
- GET /products

## Links

### Trello/Kanban

[Trello](https://trello.com/b/GmqIGrQa/ugly-veggie)

### Git

The url to your repository and to your deployed project

[Client](https://github.com/evapanizo/m3-frontend)
[Server](https://github.com/evapanizo/m3-backend)

[Deploy](http://heroku.com)

### Slides

[Slides Link](https://slides.com/evapanizo/ugly-veggie)