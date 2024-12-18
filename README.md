# Stationery-Shop-Assignment-2
## Features
- Create, read, update, and delete products.

### Order Management:

- Place orders by selecting products and quantities.
- Automatically updates inventory and stock status.
- Handles insufficient stock gracefully.

### Revenue Calculation:

- Aggregate and calculate total revenue from all orders.
### Error Handling:

- Provides descriptive error messages for validation and operational errors.

# Key Endpoints
### Products:

- POST /api/products: Create a new product.
- GET /api/products: Retrieve all products or search by category.
- GET /api/products/:productId: Get details of a specific product.
- PUT /api/products/:productId: Update product details.
- DELETE /api/products/:productId: Delete a product.

### Orders:

- POST /api/orders: Place a new order.
- GET /api/orders/revenue: Calculate total revenue.

### Create a new product post data example

```json
{
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 10,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true
}
 
```
### Create a new order post data example
```json
{
  "email": "customer@example.com",
  "product": "67431567723328e109577983",
  "quantity": 5
}