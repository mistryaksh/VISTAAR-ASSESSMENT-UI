# Vistaar Test - Customer & Transaction API

## Overview

This project provides REST APIs for customer management and financial transactions, including authentication, customer data listing, account transaction queries, and product discovery.

---

## Features

1. **OAuth/Firebase Authentication**
     - Secure login (see frontend for login UI)
2. **Customer Listing**
     - View all active customers, including name, address, and accounts.
     - Accounts are clickable to view their transaction history.
3. **API Endpoints**
     - Get account IDs with at least one transaction below a specified amount (with pagination).
     - Get a distinct list of products available in the system.

---

## Endpoints

### 1. Login (OAuth/Firebase)

-    See the frontend for login implementation.
-    All API endpoints require authentication via `Bearer <TOKEN>` in the `Authorization` header.

---

### 2. Get Active Customers

-    Implemented on the frontend (React or Angular).
-    Shows columns: **Name, Address, Accounts**
-    Accounts are clickable to display the corresponding transaction list.

---

### 3. Get Account IDs with Transaction Below Amount

**URL:**  
`GET /api/1.0/transactions/amount/:amount?page=1&limit=10`

**Headers:**  
`Authorization: Bearer <TOKEN>`

**Description:**  
Returns a paginated list of unique account IDs that have at least one transaction below the given amount.

**Sample Response:**

```json
{
     "success": true,
     "data": {
          "page": 1,
          "limit": 10,
          "total": 1731,
          "totalPages": 174,
          "account_ids": [
               537158, 744022, 906290, 210670, 809938, 770487, 856800, 331169,
               817222, 321208
          ]
     },
     "status_code": "Ok"
}
```

### 4. Create a mongo query to list down distinct list of products available in the system

**URL:**  
`GET /api/1.0/transactions/distinct-products`

**Headers:**  
`Authorization: Bearer <TOKEN>`

**Description:**  
Returns a products lists of distinted products

**Sample Response:**

```json
{
     "success": true,
     "data": [
          {
               "product": "Derivatives"
          },
          {
               "product": "Commodity"
          },
          {
               "product": "Brokerage"
          },
          {
               "product": "InvestmentStock"
          },
          {
               "product": "InvestmentFund"
          },
          {
               "product": "CurrencyService"
          }
     ],
     "status_code": "Ok"
}
```
