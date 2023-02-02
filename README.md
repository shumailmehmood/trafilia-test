#### Run

- git clone https://github.com/shumailmehmood/trafilia-test.git
- npm i
- npm start

#### Docker

- Docker file is added.
- docker build -t e-commerce .
- docker run -p 3000:3000 e-commerce

#### DataBase

- I use MongoDB with mongoose orm
- Add the DB path in .env URL variable

#### Rules

- when we purchase 2 or more products from coffee category it will add just one free.
- when we purchase more than 3 products from equipment they get free shippment on all of the products within this category
- when we spent more than 70$ on accessories category they will get 10% off on each product.
- shippment charges will be applicable on coffee and accessories category items.

#### Test cases

- I implement unit test cases on utils functions
- Use jest for this.
- All the test cases are in tests directory
- npm run test.

#### Instruction

- In this project we have App directory in which all of the code is written in different directories.
- All the apis and controllers are in v1 directory
- All the DB operations are in repository directory
- Promotion mock is in misc/mocks directory.
- Start with login which returns token
- On every request attach that token with header x-auth-token
- we attach user data while decrypting the token and attach it with req object and use while creating cart, fetching cart etc.

#### Implementations

- Promotions and calculations are calculated on run time while adding it into the cart.
- All the promotions are applicable on all items of the cart.
- I use joi for validation purpose and handle errors properly.
- Database configuration is in App/config directory.

#### Ending Note

I did it as per my understanding hopefully you will like it. Thanks,
Shumail Mehmood
