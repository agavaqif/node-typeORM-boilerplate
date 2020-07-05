module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '../src/api/{{lowerCase name}}/{{lowerCase name}}.model.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'templates/model.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '../src/api/{{lowerCase name}}/{{lowerCase name}}.controller.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'templates/controller.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '../src/api/{{lowerCase name}}/{{lowerCase name}}.route.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'templates/route.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '../src/api/{{lowerCase name}}/{{lowerCase name}}.subscriber.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'templates/subscriber.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '../src/api/{{lowerCase name}}/{{lowerCase name}}.blacklist.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'templates/blacklist.hbs',
      },
    ],
  });
};
