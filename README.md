# 🍺 PYCONT

[![BuildStatusIMG][]][BuildStatus] [![MaintainabilityIMG][]][Maintainability] [![TestCoverageIMG][]][TestCoverage] [![LicenseBadge][]][License]

A perpetually incomplete personal finances app

## Installation

1. Clone the project
2. run docker-compose up -d
3. pycont is now running, and accessible through `http://locahost:8080`
4. Run initial migrations

    ```sh
    docker-compose exec pycont-api ./manage.py migrate
    ```

5. Bootstrap initial users (admin:admin)

    ```sh
    docker-compose exec pycont-api ./manage.py loaddata users
    ```

6. You can now create users via de Django administration backoffice on `http://localhost:8080/api/admin`

## API Documentation

Pycont uses swagger, you can access it via `http://localhost:8080/api/doc/swagger`

[BuildStatusIMG]: https://travis-ci.org/sieira/pycont.png?branch=master
[BuildStatus]: https://travis-ci.org/sieira/pycont
[MaintainabilityIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/maintainability
[Maintainability]: https://codeclimate.com/github/sieira/pycont/maintainability
[TestCoverageIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/test_coverage
[TestCoverage]: https://codeclimate.com/github/sieira/pycont/test_coverage
[LicenseBadge]: https://img.shields.io/badge/License-BSD%203--Clause-blue.svg
[License]: https://github.com/sieira/pycont/blob/master/LICENSE
