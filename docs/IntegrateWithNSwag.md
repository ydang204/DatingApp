# Integrate with NSWAG in NET Core

## 1. Install NSWAG middle ware

`dotnet add package NSwag.AspNetCore --version 12.0.20`

## 2. Register NSWAG services and middleware

Current working directory: **DatingApp.Api**

Add Service

```````C#
// Add OpenAPI/Swagger document
services.AddSwaggerDocument(document =>
{
    // Add an authenticate button to Swagger for JWT tokens
    document.OperationProcessors.Add(new OperationSecurityScopeProcessor("JWT"));
    document.DocumentProcessors.Add(new SecurityDefinitionAppender("JWT", new SwaggerSecurityScheme
    {
        Type = SwaggerSecuritySchemeType.ApiKey,
        Name = "Authorization",
        In = SwaggerSecurityApiKeyLocation.Header,
        Description = "Type into the textbox: Bearer {your JWT token}."
    }));
});
```````

Register middleware

````C#
// Add OpenAPI/Swagger middlewares
app.UseSwagger(); // Serves the registered OpenAPI/Swagger documents by default on `/swagger/{documentName}/swagger.json`
app.UseSwaggerUi3(); // Serves the Swagger UI 3 web ui to view the OpenAPI/Swagger documents by default on `/swagger`
````

Install **nswag** as a dev dependency for current project

    npm install nswag --save-dev

Show available commands:

    .\node_modules\.bin\nswag help

Create new nswag document file

    .\node_modules\.bin\nswag new

Change api url

```json
"swaggerGenerator": {
    "fromSwagger": {
      "url": "http://localhost:5000/swagger/v1/swagger.json",
      "output": null
    }
},
```

Change **template** to **angular**, **dateTimeType** to **MomentJS** and define **output** dir

```json
"template": "Angular",
"dateTimeType": "MomentJS",
"output": "../DatingApp.Angular/src/shared/service-proxies/service-proxies.ts"
```

Run nswag to generate typescript client

    .\node_modules\.bin\nswag run