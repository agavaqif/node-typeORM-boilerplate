### Introduction

Repository based on `https://github.com/konfer-be/ts-express-typeorm-boilerplate`. Made some changes to my personal taste.
Boilerplate plate was built on top of express/typescript/typeorm technologies.

### To Create New Entity

Plop.js is used to create new entities.

1. Run `npm run generate`. Will ask for entity name.
2. Enter entity name. Recommended to use camelCase (User)
3. Update container.config.ts to inject newly created controller class.
   Import Controller:
   - import { UserController } from '@api/user/user.controller';
     Register Controller:
     .register({
   - .register({ UserController: awilix.asClass(UserController).singleton()});
4. Update routePlugger.config.ts
   Import new router:
   - import { UserRouter } from '@api/user/user.route';
     Add new route to routes:
   - { segment: '/user/', router: UserRouter, serializable: false },

### Running

Different enviroments can be set in `environment.enum.ts` file. Each environment expects env file under env folder.
`npm run start:watch`: Will run application in dev environment. By usined nodemon changes will be watched over.
`npm run start:dev`: Will build and start dev environment

### Error Handling

There are different error types. Type of error is defined by its severity and type.
Validtion errors use "alert" as severity and returned format is:
{
"severity": "alert"
"type": "ValidationError",
"status": 400,
"messages": [
"Age must not be less than 10"
]
}
DB or Server error example:
{
"severity": "error",
"type": "DBERROR",
"status": 404,
"message": "Item was not found"
}

Check `validation.util.ts` for details of validation handling and `error.util.ts` for error handling.

### Pagination

Pagination is handled by internal function paginate (@utils/serializing.util).
Function expects page and perPage as arguments. Default values are used in casse of absence (pagination.enum.ts)
Sample request: `api/user?page=2&perPage=20`

### Entity Validation

`class-validator` package (https://github.com/typestack/class-validator) is used to validate entities.In case of error, user friendly message will be returned. By defualt put and post methods are validated.

### Custom Middlewares

Catcher: Middleware is used to catched DB errors, Validation errors or server errors.
Resolver: This is the last middleware in successful request. Generic response stuff can be handled here

### To do

- Implement better postgresql error handling
- Update documentation by typedoc standarts
- Include socket.io
- Fix Cors
- Add Docker file
- Add Jenkins
- Add Kunernetes yml file
