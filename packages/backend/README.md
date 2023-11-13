# Architecture notes

The backend uses an 
[hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)), 
that is reflected by the folder structure: 

```
src/
├── controller
├── domain
├── index.ts        // Start the server
└── infrastructure
```

## Structure of the domain

```
src/domain
├── api.ts          // interfaces for the controller to use
├── features.ts     // see below
├── spi.ts          // service provider interfaces, i.e. to external services
└── types.ts        // Shared domain types
```

"features.ts" uses the [DDD repository 
pattern](https://en.wikipedia.org/wiki/Domain-driven_design): the methods for 
retrieving domain objects from external data sources are in a "repository", 
through which concrete implementations are injected via the "createFeatures" 
function.


## Swagger
url: localhost:3000/api/docs
