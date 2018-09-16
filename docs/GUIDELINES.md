# Dev2Gether styleguide
 
## Tooling

### EsLint

* Rules are defined in the _/.eslintrc_ 
* [Rules list](https://eslint.org/docs/rules/)

## Routing-style rules

* Name resources in routing urls
  * Avoid `.../:id1/:id2/:id3/`
  * Prefer `.../Resource1/:id/Resource2/:id/Resource3/:id/`
* User verbs and avoid breaking SRP
  * Avoid `GET .../players/:id/shoot` that uses action verb shoot on player resource
  * Prefer `POST .../players/:id/shoot` that creates a shoot resources on specific player resource

## Code-style rules

##Test-style rules

* We should test one feature per file.
* We should have a directory per feature (like _login/_ or _menu_)
