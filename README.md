[![BuildStatusIMG][]][BuildStatus] [![MaintainabilityIMG][]][Mantainability] [![TestCoverageIMG][]][TestCoverage]

# 🍺 PYCONT

A perpetually incomplete personal finances app

## Installation

1. Clone the project
2. run docker-compose up -d
3. pycont core is now running, and accessible through `http://locahost:8080`
4. Run initial migrations
    ```sh
    docker-compose exec pycont ./manage.py migrate
    ```
5. Create a superuser
    ```sh
    docker-compose exec pycont ./manage.py createsuperuser
    ```
6. You can now create users via de Django administration backoffice on `http://localhost:8080/admin`
7. Pycont UI should now be running on `http://localhost:3000`

## API Documentation

Pycont uses swagger, you can access it via `http://localhost:8080/doc/swagger`

[BuildStatusIMG]: https://travis-ci.org/sieira/pycont.png?branch=master 
[BuildStatus]: https://travis-ci.org/sieira/pycont
[MaintainabilityIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/maintainability
[Maintainability]: https://codeclimate.com/github/sieira/pycont/maintainability
[TestCoverageIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/test_coverage
[TestCoverage]: https://codeclimate.com/github/sieira/pycont/test_coverage
