# CarCar

Team:

* Juna Branca - Sales
* Bennie Kim - Service

## Design
CarCar is an application that allows dealerships to keep track of inventory, sales, and services. In the back-end, inventory, sales, and services are the three microservices using RESTful APIs. In the front-end, the UI is implemented using React to build interactive forms and lists.


![Alt text](ghi/app/public/carcardiagram.png?raw=true "CarCar Diagram")

## How to install!

1. Fork (optional) and clone the repository to your machine:
```
git clone https://gitlab.com/Junabranca/project-beta
```
2. Make sure Docker is open. Run the following commands:
    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```
3. In your browser (we suggest Chrome!), open http://localhost:3000
4. Fill out inventory forms first; without populating inventory, personnel, and customer data, lists and some forms will not work as intended.


## Service microservice

The Service microservice is made up of api and poll. Api is the application that contains a Django project (service_project) and a Django app (service_rest). The app contains the models, "Technician", "Appointments", and the value object, "Automobile VO". Technician is a foreign-key in the Appointments model; this can be seen directly in the front-end, where users are able to create technicians and are then able to see that name in the "Choose technician" drop-down of the appointment form.

In the Service microservice of CarCar, the VIP status of service customers is being determined by whether or not the VIN from the appointment form matches the VIN from the Inventory database. The poll application contains the poller that is pulling Automobile data from the Inventory microservice. The poller is able to create (or update) the value object (AutomobileVO) with these messages, and the VIN data is then ready to be accessed in the api application.

## Sales microservice

The sales microservice polls the inventory microservice for the automobile VIN numbers, the sales microservice contains an automobile value object model which is updated or created based on the automobiles in the inventory database.

The VIN numbers are associated with specific vehicles in the inventory. The automobiles have a boolean field "sold" that defaults to false. When the automobile is entered in a sale record and the sale record is submitted then "sold" will update to true. The automobile will then no longer be available for sale and will no longer show in the automobile inventory.

The sale microservice creates and lists sales records and allows for customers and sales people to be added to the database. The sales microservice also allows you to see a history of sales made by a specific sales person.




CRUD routes for all services:

    GET - list appointments - http://localhost:8080/api/appointments/
        no json body
        sample response:
        {
            "appointments": [
                {
                    "vin" : "0000000000",
                    "owner_name" : "John Doe",
                    "date" : "2023-12-02",
                    "time" : "11:30",
                    "reason": "flat tire",
                    "vip" : false,
                    "id" : 4,
                    "completed": false,
                    "techician" : "Mark MGee",
                },
                {
                    "vin" : "0000000001",
                    "owner_name" : "Jimmy Timmy",
                    "date" : "2023-12-03",
                    "time" : "12:00",
                    "reason": "oil change",
                    "vip" : true,
                    "id" : 5,
                    "completed": false,
                    "techician" : "Jim Tim",
                },
            ]
        }
    POST - create an appointment - http://localhost:8080/api/appointments/
    sample json body:
        {
            "vin" : "0000000000",
            "owner_name" : "John Doe",
            "date" : "2023-12-02",
            "time" : "11:30",
            "reason": "flat tire",
            "techician" : "Mark MGee"
        }
    sample response:
        {
            "vin" : "0000000000",
            "owner_name" : "John Doe",
            "date" : "2023-12-02",
            "time" : "11:30",
            "reason": "flat tire",
            "vip" : false,
            "id" : 4,
            "completed": false,
            "techician" : "Mark MGee",
        }

    GET - list technicians - http://localhost:8080/api/technicians/
        no json body
        sample response:
        {
            "technicians" : [
                {
                    "technician_name": "Bennie"
                    "employee_number": 1234567,
                    "id": 1
                },
                {
                    "technician_name": "Johnny"
                    "employee_number": 1234588,
                    "id": 2
                },
            ]
        }
    POST - create technicians - http://localhost:8080/api/technicians/
        sample json body:
            {
                "technician_name": "Bennie",
                "employee_number" : 1234567
            }
        sample response:
            {
                "technician_name": "Bennie",
                "employee_number" : 1234567,
                "id" : 1
            }

    GET - list sales people - http://localhost:8090/api/salespeople/
        no json body
        sample response:
        {
            "sales_people": [
            {
                "name": "Bob Bobertson",
                "employee_number": "0000000005"
            },
            {
                "name": "Perry Platypus",
                "employee_number": "0000000009"
            },
            {
                "name": "Sales Man",
                "employee_number": "0000000010"
            }
            ]
        }
    POST - create sales person - http://localhost:8090/api/salespeople/
        sample json body:
        {
            "name": "John Doe",
            "employee_number": "0000000001"
        }
            * please note employee number must be unique
        sample response:
         {
            "name": "John Doe",
            "employee_number": "0000000001"
        }

    GET - list customers - http://localhost:8090/api/customers/
        no json body
        sample response:
        {
            "customers": [
                {
                    "name": "David Paulson",
                    "address": "25 Starry Night loop",
                    "phone_number": "123-123-1234"
                },
                {
                    "name": "Kelly McMan",
                    "address": "146 Willow st.",
                    "phone_number": "978-727-2779"
                },

            ]
        }

    POST - create customer - http://localhost:8090/api/customers/
        sample json body:
        {
            "name": "Kelly Kollis",
            "address": "146 Willow st.",
            "phone_number": "123-123-1234"
        }
        * please note phone number must be unique
        sample response:
         {
            "name": "Kelly Kollis",
            "address": "146 Willow st.",
            "phone_number": "123-123-1234"
        }

    GET - list sales - http://localhost:8090/api/sales/
        no json body
        sample response:
            {
            "sales": [
                {
                    "automobile": {
                        "vin": "1C3CC5FB2AN120174",
                        "sold": false
                    },
                    "sales_person": {
                        "name": "John Paul",
                        "employee_number": "0000000001"
                    },
                    "customer": {
                        "name": "Kelly McMan",
                        "address": "146 Willow st.",
                        "phone_number": "978-222-2779"
                    },
                    "price": "5,000"
                },
                {
                    "automobile": {
                        "vin": "2C3CC5FB2AN131285",
                        "sold": false
                    },
                    "sales_person": {
                        "name": "Allyson Humphrey",
                        "employee_number": "0000000002"
                    },
                    "customer": {
                        "name": "Kelly McMan",
                        "address": "146 Willow st.",
                        "phone_number": "978-727-2779"
                    },
                    "price": "5,000"
                },
            ]
        }
    POST - create sale - http://localhost:8090/api/sales/
        sample json body:
        {
            "price": "5,000",
            "automobile": "1C3CC5FB2AN120174",
            "sales_person": "0000000001",
            "customer": "123-123-1234"
        }
        * please note customer, sales person and automobile must exists first
        * customers are identified by phone number since some customers may have the same name
        * VIN must be unique (not sold before)
        sample response:
         {
            "price": "5,000",
            "automobile": "1C3CC5FB2AN120174",
            "sales_person": "0000000001",
            "customer": "123-123-1234"
        }

    GET - list manufacturers - http://localhost:8100/api/manufacturers/
        no json body
        sample response:
        {
            "manufacturers": [
                {
                    "href": "/api/manufacturers/2/",
                    "id": 2,
                    "name": "Chrysler"
                },
                {
                    "href": "/api/manufacturers/3/",
                    "id": 3,
                    "name": "Subaru"
                },
                {
                    "href": "/api/manufacturers/4/",
                    "id": 4,
                    "name": "Ford"
                },
            ]
        }
    POST - create manufacturer - http://localhost:8100/api/manufacturers/
        sample json body:
        {
            "name" : "Subaru"
        }
        * please note the name must be unique
        sample response:
        {
            "name" : "Subaru"
        }
    PUT - update manufacturer - http://localhost:8100/api/manufacturers/:id/
        sample json body:
        {
            "name" : "Chrysler"
        }
        Sample response value from creating, updating or getting a manufacturer:
            {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Chrysler"
            }
    DELETE - delete manufacturer - http://localhost:8100/api/manufacturers/:id/
        no json body
        sample response if manufacturer is successfully deleted:
            {
                "id": null,
                "name": "Chrysler"
            }
        sample response if manufacturer is not in the database:
            {
                "message": "Does not exist"
            }

    GET - list automobiles - http://localhost:8100/api/automobiles/
        no json body
        sample response:
        {
        "automobiles":
        [
                {
                    "href": "/api/automobiles/7C3CC5FB2AN126969/",
                    "id": 14,
                    "color": "green",
                    "year": 2020,
                    "vin": "7C3CC5FB2AN126969",
                    "model": {
                        "href": "/api/models/21/",
                        "id": 21,
                        "name": "Subaru Impreza",
                        "picture_url": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13898/2021-Subaru-Impreza-front_13898_032_2400x1800_K1X.png",
                        "manufacturer": {
                            "href": "/api/manufacturers/3/",
                            "id": 3,
                            "name": "Subaru"
                        }
                    },
                    "sold": true
                },
                {
                    "href": "/api/automobiles/888888888888/",
                    "id": 30,
                    "color": "Purple",
                    "year": 2020,
                    "vin": "888888888888",
                    "model": {
                        "href": "/api/models/28/",
                        "id": 28,
                        "name": "Subaru Impreza",
                        "picture_url": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13898/2021-Subaru-Impreza-front_13898_032_2400x1800_K1X.png",
                        "manufacturer": {
                            "href": "/api/manufacturers/3/",
                            "id": 3,
                            "name": "Subaru"
                        }
                    },
                    "sold": false
                },
            ]
        }
    POST - create automobile -  http://localhost:8100/api/automobiles/
        sample json body:
        {
            "color": "blue",
            "year": 2013,
            "vin": "2C3CC5FB2AN131289",
            "model_id": 2
        }
    PUT - update an automobile - http://localhost:8100/api/automobiles/:vin/
        sample json body:
        {
            "color": "red",
            "year": 2012,
            "sold": false
        }
    GET - show an automobile - http://localhost:8100/api/automobiles/:vin/
        no json body
    DELETE - delete an automobile - http://localhost:8100/api/automobiles/:vin/
        no json body
        sample response from creating, updating, getting or deleting an automobile:
         {
            "href": "/api/automobiles/2C3CC5FB2AN131289/",
            "id": 26,
            "color": "blue",
            "year": 2013,
            "vin": "2C3CC5FB2AN131289",
            "model": {
                "href": "/api/models/2/",
                "id": 2,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/2/",
                    "id": 2,
                    "name": "Chrysler"
                }
            },
            "sold": false
        }

    GET - list vehicle models - http://localhost:8100/api/models/
        no json body
        sample response:
        {
	    "models": [
                {
                    "href": "/api/models/2/",
                    "id": 2,
                    "name": "Sebring",
                    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/2/",
                        "id": 2,
                        "name": "Chrysler"
                    }
                },
                {
                    "href": "/api/models/21/",
                    "id": 21,
                    "name": "Subaru Impreza",
                    "picture_url": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13898/2021-Subaru-Impreza-front_13898_032_2400x1800_K1X.png",
                    "manufacturer": {
                        "href": "/api/manufacturers/3/",
                        "id": 3,
                        "name": "Subaru"
                    }
                },
            ]
        }
    POST - create a vehicle model - http://localhost:8100/api/models/
        sample json body:
        {
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer_id": 2
        }
    PUT - update a vehicle model - http://localhost:8100/api/models/:id/
        sample json body:
        {
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
        }
    DELETE - delete a vehicle model - 	http://localhost:8100/api/models/:id/
         no json body
         sample response from getting, updating or deleteing a vehicle model:
         {
            "id": null,
            "name": "Subaru Impreza",
            "picture_url": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13898/2021-Subaru-Impreza-front_13898_032_2400x1800_K1X.png",
            "manufacturer": {
                "href": "/api/manufacturers/3/",
                "id": 3,
                "name": "Subaru"
            }
        }
