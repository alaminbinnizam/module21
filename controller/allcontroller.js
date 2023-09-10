// routes/sales.js
// ...

// GET /api/sales/total-revenue
router.get('/total-revenue', async (req, res) => {
    try {
      const totalRevenue = await Sale.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $multiply: ['$quantity', '$price'] } },
          },
        },
      ]);
  
      res.json({ totalRevenue: totalRevenue[0].total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// routes/sales.js
// ...

// GET /api/sales/quantity-by-product
router.get('/quantity-by-product', async (req, res) => {
    try {
      const quantityByProduct = await Sale.aggregate([
        {
          $group: {
            _id: '$product',
            totalQuantity: { $sum: '$quantity' },
          },
        },
      ]);
  
      res.json(quantityByProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    // routes/sales.js
// ...

// GET /api/sales/top-products
router.get('/top-products', async (req, res) => {
    try {
      const topProducts = await Sale.aggregate([
        {
          $group: {
            _id: '$product',
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
          },
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 5 },
      ]);
  
      res.json(topProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// routes/sales.js
// ...

// GET /api/sales/average-price
router.get('/average-price', async (req, res) => {
    try {
      const averagePrice = await Sale.aggregate([
        {
          $group: {
            _id: null,
            averagePrice: { $avg: '$price' },
          },
        },
      ]);
  
      res.json({ averagePrice: averagePrice[0].averagePrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// routes/sales.js
// ...

// GET /api/sales/revenue-by-month
router.get('/revenue-by-month', async (req, res) => {
    try {
      const revenueByMonth = await Sale.aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$date' },
              year: { $year: '$date' },
            },
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
          },
        },
      ]);
  
      res.json(revenueByMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// routes/sales.js
// ...

// GET /api/sales/highest-quantity-sold
router.get('/highest-quantity-sold', async (req, res) => {
    try {
      const highestQuantitySold = await Sale.aggregate([
        {
          $group: {
            _id: '$product',
            maxQuantity: { $max: '$quantity' },
          },
        },
        { $sort: { maxQuantity: -1 } },
        { $limit: 1 },
      ]);
  
      res.json(highestQuantitySold[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// routes/sales.js
// ...

// GET /api/sales/department-salary-expense
router.get('/department-salary-expense', async (req, res) => {
    try {
      const departmentSalaryExpense = await Sale.aggregate([
        {
          $group: {
            _id: '$department', // Replace 'department' with your actual department field name
            totalSalaryExpense: { $sum: '$salary' }, // Replace 'salary' with your actual salary field name
          },
        },
      ]);
  
      res.json(departmentSalaryExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
          