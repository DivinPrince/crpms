# SmartPark Garage Car Repair Payment Management System (CRPMS)

A comprehensive car repair management system built for SmartPark Garage in Rwanda. This application helps manage car repairs, service records, payments, and reporting.

## Features

- **Car Management**: Register and track vehicles by plate number, make, model, and owner details
- **Service Management**: Create and manage repair services with pricing
- **Service Records**: Track repair history for each vehicle
- **Payment Processing**: Record and manage payments for services
- **Invoicing**: Generate invoices for completed repairs
- **Reporting**: Generate analytics and reports on income, popular services, and vehicle history
- **User Authentication**: Secure login for staff members

## Tech Stack

- **Backend**: Laravel (PHP framework)
- **Frontend**: React with TypeScript
- **UI Components**: Shadcn UI components with Tailwind CSS
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Breeze with Inertia.js

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm/yarn
- MySQL 5.7+ or PostgreSQL 10+
- Git

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crpms.git
cd crpms
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Set up environment file

```bash
cp .env.example .env
```

Edit the `.env` file and configure your database connection:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crpms
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Generate application key

```bash
php artisan key:generate
```

### 5. Run database migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

### 6. Install JavaScript dependencies

```bash
npm install
# or with yarn
yarn
```

### 7. Build assets

```bash
npm run dev
# or with yarn
yarn dev
```

### 8. Start the development server

```bash
php artisan serve
```

The application will be available at http://localhost:8000

## Project Structure

- `app/` - Laravel PHP backend code
- `resources/js/` - React TypeScript frontend code
  - `components/` - Reusable UI components
  - `layouts/` - Page layout components
  - `pages/` - Page components
  - `lib/` - Utility functions
  - `types/` - TypeScript type definitions
- `database/migrations/` - Database schema definitions
- `routes/` - API and web routes

## Key Directories

### Frontend Components

- `resources/js/pages/` - Contains all page components
  - `Cars/` - Car management pages
  - `Services/` - Service management pages
  - `ServiceRecords/` - Service record pages
  - `Payments/` - Payment management pages
  - `Reports/` - Reporting and analytics pages
  - `Dashboard.tsx` - Main dashboard page

### Backend Controllers

- `app/Http/Controllers/` - Contains all application controllers
  - `CarController.php` - Car management logic
  - `ServiceController.php` - Service management logic
  - `ServiceRecordController.php` - Service record management logic
  - `PaymentController.php` - Payment processing logic
  - `ReportController.php` - Report generation logic

## Usage

### Default Credentials

After installation, you can log in with the following credentials:

```
Email: admin@smartpark.rw
Password: password
```

### Main Workflows

1. **Car Registration**
   - Navigate to Cars > Add New Car
   - Enter vehicle and owner details
   - Save the record

2. **Creating a Service Record**
   - Navigate to Service Records > Create Record
   - Select a vehicle and service
   - Enter service details and save

3. **Processing Payments**
   - Navigate to Payments > New Payment
   - Select the service record
   - Enter payment amount and details
   - Generate an invoice if needed

4. **Viewing Reports**
   - Navigate to Reports
   - Select the type of report (income, services, etc.)
   - Set date ranges if applicable
   - View or export the report

## Customization

### Theme Customization

The application uses Tailwind CSS with shadcn/ui components. You can customize the theme by modifying the following files:

- `tailwind.config.js` - Tailwind configuration
- `resources/js/lib/utils.ts` - Utility functions including theme handling
- `resources/css/app.css` - Global CSS styles

### Adding New Features

1. Create new migrations if needed (`php artisan make:migration`)
2. Create or update models (`php artisan make:model`)
3. Create controllers (`php artisan make:controller`)
4. Add routes in `routes/web.php`
5. Create React components in the appropriate directories
6. Update the navigation in the layout components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with [Laravel](https://laravel.com/)
- Frontend powered by [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/) 