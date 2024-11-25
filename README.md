# Stationery-Shop-Assignment-2
## Features
- Create, read, update, and delete products.
- Supports category-based filtering and searching (name, brand, category).
- Inventory tracking with quantity and inStock status.

# Order Management:

- Place orders by selecting products and quantities.
- Automatically updates inventory and stock status.
- Handles insufficient stock gracefully.

# Revenue Calculation:

- Aggregate and calculate total revenue from all orders.
# Error Handling:

- Provides descriptive error messages for validation and operational errors.

# Key Endpoints
## Products:

POST /api/products: Create a new product.
GET /api/products: Retrieve all products or search by category.
GET /api/products/:productId: Get details of a specific product.
PUT /api/products/:productId: Update product details.
DELETE /api/products/:productId: Delete a product.

## Orders:

POST /api/orders: Place a new order.
GET /api/orders/revenue: Calculate total revenue.