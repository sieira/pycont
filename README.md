# 🍺 PYCONT
A perpetually incomplete personal finances app

## Installation

1. Clone the project
2. run docker-compose up -d
3. pycont core is now running, and accessible through http://locahost:8080
4. Run initial migrations
```sh
docker-compose exec pycont ./manage.py migrate
```
5. Create a superuser
```sh
docker-compose exec pycont ./manage.py createsuperuser
```
6. You can now create users via de Django administration backoffice on http://localhost:8080/admin
