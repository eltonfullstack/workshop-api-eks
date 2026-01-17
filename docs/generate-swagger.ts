import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auto Repair Shop API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'abc123' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
          },
          required: ['id', 'name', 'email'],
        },
        CreateUserInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            password: { type: 'string', format: 'password', example: 'senha123' },
          },
          required: ['name', 'email', 'password'],
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'ID único do veículo'
            },
            car_plate: { 
              type: 'string', 
              example: 'ABC-1234',
              description: 'Placa do veículo (formato antigo ABC-1234 ou Mercosul ABC1D23)'
            },
            car: { 
              type: 'string', 
              example: 'Toyota',
              description: 'Marca do veículo'
            },
            model: { 
              type: 'string', 
              example: 'Corolla',
              description: 'Modelo do veículo'
            },
            year: { 
              type: 'number', 
              example: 2022,
              description: 'Ano do veículo'
            },
            customer_id: { 
              type: 'string',
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'ID do cliente proprietário'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-01-15T10:30:00.000Z',
              description: 'Data de criação do registro'
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-01-15T10:30:00.000Z',
              description: 'Data da última atualização'
            },
          },
          required: ['id', 'car_plate', 'car', 'model', 'year', 'customer_id', 'createdAt', 'updatedAt'],
        },
        CreateVehicleInput: {
          type: 'object',
          properties: {
            car_plate: { 
              type: 'string', 
              example: 'ABC-1234',
              description: 'Placa do veículo (formato antigo ABC-1234 ou Mercosul ABC1D23)'
            },
            car: { 
              type: 'string', 
              example: 'Toyota',
              description: 'Marca do veículo'
            },
            model: { 
              type: 'string', 
              example: 'Corolla',
              description: 'Modelo do veículo'
            },
            year: { 
              type: 'number', 
              example: 2022,
              description: 'Ano do veículo'
            },
            customer_id: { 
              type: 'string',
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'ID do cliente proprietário'
            },
          },
          required: ['car_plate', 'car', 'model', 'year', 'customer_id'],
        },
        UpdateVehicleInput: {
          type: 'object',
          properties: {
            car_plate: { 
              type: 'string', 
              example: 'ABC-1234',
              description: 'Placa do veículo (formato antigo ABC-1234 ou Mercosul ABC1D23)'
            },
            car: { 
              type: 'string', 
              example: 'Toyota',
              description: 'Marca do veículo'
            },
            model: { 
              type: 'string', 
              example: 'Corolla',
              description: 'Modelo do veículo'
            },
            year: { 
              type: 'number', 
              example: 2022,
              description: 'Ano do veículo'
            },
            customer_id: { 
              type: 'string',
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'ID do cliente proprietário'
            },
          },
        },
        VehicleResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              $ref: '#/components/schemas/Vehicle',
            },
          },
        },
        VehicleListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Vehicle',
              },
            },
          },
        },
        Customer: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'ID único do cliente'
            },
            name: { 
              type: 'string', 
              example: 'João Silva',
              description: 'Nome do cliente'
            },
            identity: { 
              type: 'string', 
              example: '091.088.150-20',
              description: 'CPF (11 dígitos) ou CNPJ (14 dígitos) do cliente'
            },
            personType: { 
              type: 'string',
              enum: ['FISICA', 'JURIDICA'],
              example: 'FISICA',
              description: 'Tipo de pessoa: FISICA (CPF) ou JURIDICA (CNPJ)'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-01-15T10:30:00.000Z',
              description: 'Data de criação do registro'
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-01-15T10:30:00.000Z',
              description: 'Data da última atualização'
            },
          },
          required: ['id', 'name', 'identity', 'personType', 'createdAt', 'updatedAt'],
        },
        CreateCustomerInput: {
          type: 'object',
          properties: {
            name: { 
              type: 'string', 
              example: 'João Silva',
              description: 'Nome do cliente'
            },
            identity: { 
              type: 'string', 
              example: '091.088.150-20',
              description: 'CPF (11 dígitos) ou CNPJ (14 dígitos) do cliente - apenas números'
            },
          },
          required: ['name', 'identity'],
        },
        UpdateCustomerInput: {
          type: 'object',
          properties: {
            name: { 
              type: 'string', 
              example: 'João Silva',
              description: 'Nome do cliente'
            },
            identity: { 
              type: 'string', 
              example: '091.088.150-20',
              description: 'CPF (11 dígitos) ou CNPJ (14 dígitos) do cliente - apenas números'
            },
          },
        },
        CustomerResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              $ref: '#/components/schemas/Customer',
            },
          },
        },
        CustomerListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Customer',
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Erro ao processar requisição',
            },
            error: {
              type: 'string',
              example: 'Detalhes do erro',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no endpoint de login',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.routes.ts'],
});

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Swagger JSON gerado com sucesso em ./swagger.json');