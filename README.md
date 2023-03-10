# CarCar

Team:

* Juna Branca - Sales
* Person 2 - Which microservice?

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice polls the Inventory microservice for the automobile VIN numbers.
The VIN numbers are associated with specific vehicles in the inventory, the sale microservice keeps sales records
of the vehicles that have been sold from the inventory.

to start app:
    docker-compose build
    docker-compose up

CRUD routes:

    List sales people - http://localhost:8090/api/salespeople/
    Create a sales person - http://localhost:8090/api/salespeople/
        sample json body:
        {
            "name": "John Doe",
            "employee_number": "0000000001"
        }
            * please note employee number must be unique

    Customer list - http://localhost:8090/api/customers/
    create a customer - http://localhost:8090/api/customers/
        sample json body:
        {
            "name": "Kelly Kollis",
            "address": "146 Willow st.",
            "phone_number": "123-123-1234"
        }
        * please note phone number must be unique


    Sales list - http://localhost:8090/api/sales/
    Create a sale - http://localhost:8090/api/sales/
        sample json body:
        {
            "price": "5,000",
            "automobile": "1C3CC5FB2AN120174",
            "sales_person": "0000000001",
            "customer": "123-123-1234"
        }
            * please note customer, sales person and automobile must exists first
            * customers are identified by phone number since some customers may have the same name
