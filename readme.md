# TiendaNube Starter

## TODO
~~Create Setup js route~~ 
~~create setup js front-end js handling to save api keys~~
ONBOARDING
    fix spinner not loading
    add start migration button
    redirect to react panel for SELECTING WHICH PRODUCTS TO MIGRATE
    Add upload count to panel, so user can check how many items he's migrating.


BACKEND
Create internal API calls to handle products
Create correct translations between products from Woo to TN.

//Woocommerce docs
https://woocommerce.github.io/woocommerce-rest-api-docs/#list-all-products

2521
https://tiendanube.com/apps/2521/authorize

A nodejs tiendanube bare bones starter, to start creating a TiendaNube App using:  

* Nodejs
* ExpressJs
* MongoDB
* EJS
* React (if more advanced FE is needed)
  
  
Includes:   
* Winston logger
* Mocha/Chai for testing
* Mongoose for Mongo
* Express Routing for AUTH
* Env example file


## History

**4-1**  
* Added migration methods  
* Added progress bar and promise solution for progress 

**3-1**  
* Added individual handling for each product
* Added sessions
* Added route for getting user Data