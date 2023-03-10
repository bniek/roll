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

Explain your models and integration with the inventory
microservice, here.
