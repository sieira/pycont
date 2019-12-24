# 🍺 PYCONT

[![BuildStatusIMG][]][BuildStatus] [![MaintainabilityIMG][]][Maintainability] [![TestCoverageIMG][]][TestCoverage] [![LicenseBadge][]][License]

A perpetually incomplete personal finances app

## Installation

1. Clone the project
1. Copy the `env.XXX.tpl`to `.env` *and fill in the required information*, note that there are two of them,
   each one suitable for a different environment.
1. run docker-compose up -d
1. pycont is now running, and accessible through: `http://localhost:$NGINX_HTTPS_PORT`
1. Only in *production*: Pycont will only work behind https, you can find examples of configuration in [the doc folder](doc/examples)
1. Run initial migrations

    ```sh
    docker-compose exec pycont-api ./manage.py migrate
    ```

1. Bootstrap initial users (admin:admin)

    ```sh
    docker-compose exec pycont-api ./manage.py loaddata users
    ```

1. You can now create users via de Django administration backoffice on `http://localhost:$NGINX_HTTPS_PORT/api/admin/`

## API Documentation

Pycont uses swagger, you can access it via `http://localhost:$NGINX_HTTPS_PORT/api/doc/swagger`

[BuildStatusIMG]: https://travis-ci.org/sieira/pycont.png?branch=master
[BuildStatus]: https://travis-ci.org/sieira/pycont
[MaintainabilityIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/maintainability
[Maintainability]: https://codeclimate.com/github/sieira/pycont/maintainability
[TestCoverageIMG]: https://api.codeclimate.com/v1/badges/4578991db8bc4049a8e1/test_coverage
[TestCoverage]: https://codeclimate.com/github/sieira/pycont/test_coverage
[LicenseBadge]: https://img.shields.io/badge/License-BSD%203--Clause-blue.svg
[License]: https://github.com/sieira/pycont/blob/master/LICENSE
