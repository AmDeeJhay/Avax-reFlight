# Avax Reflights Backend

An onchain flight booking marketplace where users can book flights as NFT tickets and trade them on a marketplace. Built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **Flight Booking**: Book flights and receive NFT tickets
- **Real-time Flight Data**: Integration with Duffel API for live flight information
- **Marketplace**: List and trade flight tickets
- **User Authentication**: JWT-based authentication system
- **Flight Search**: Search flights by origin, destination, and date
- **Airport Search**: Search for airports with real-time data
- **Ticket Management**: Manage owned tickets and resale listings
- **API Documentation**: Swagger/OpenAPI documentation

## 🏗️ Architecture

### Modular Structure

\`\`\`
src/
├── controllers/     # HTTP request handlers
├── middleware/      # Authentication, validation, error handling
├── models/         # MongoDB/Mongoose schemas
├── routes/         # API route definitions
├── services/       # Business logic
├── types/          # TypeScript type definitions
└── utils/          # Database connection, validation schemas
\`\`\`

### Tech Stack

- **Backend**: Express.js + TypeScript
- **Database**: MongoDB + Mongoose
- **Flight Data**: Duffel API integration
- **Authentication**: JWT
- **Validation**: Zod
- **Documentation**: Swagger UI
- **Security**: Helmet, CORS, bcryptjs

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Setup Steps

1. **Clone and navigate**

   \`\`\`bash
   cd reflights
   \`\`\`

2. **Install dependencies**

   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**

   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Start MongoDB**

   \`\`\`bash
   # Make sure MongoDB is running locally on port 27017
   # Or update MONGODB_URI in .env with your connection string
   \`\`\`

5. **Build the project**

   \`\`\`bash
   npm run build
   \`\`\`

6. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

The server will start on `http://localhost:3000`

## 🔧 Configuration

Update the `.env` file with your settings:

\`\`\`env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/avax-reflights
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
DUFFEL_API_TOKEN=duffel_test_your-actual-api-token-here
DUFFEL_API_URL=https://api.duffel.com
NFT_BASE_URI=https://api.reflights.com/metadata/
API_VERSION=v1
\`\`\`

### Duffel API Setup

1. Sign up at [Duffel.com](https://duffel.com)
2. Get your test API token from the dashboard
3. Add it to your `.env` file as `DUFFEL_API_TOKEN`
4. The application will automatically use Duffel for real-time flight data when the token is configured

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/api/health`
- **Duffel Integration Guide**: See [`DUFFEL_INTEGRATION.md`](./DUFFEL_INTEGRATION.md) for detailed Duffel API documentation

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run build:watch` - Build with watch mode

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Flights

- `GET /api/flights` - Search flights (supports Duffel integration)
- `POST /api/flights` - Create flight (admin)
- `GET /api/flights/:id` - Get flight details
- `GET /api/flights/duffel/offers/:offerId` - Get Duffel offer details
- `POST /api/flights/duffel/orders` - Create flight order via Duffel
- `GET /api/flights/airports` - Search airports

#### Flight Search Parameters

- `from` - Origin airport code (3 letters)
- `to` - Destination airport code (3 letters)
- `date` - Departure date (YYYY-MM-DD)
- `returnDate` - Return date for round trips
- `adults` - Number of adult passengers (default: 1)
- `children` - Number of child passengers (default: 0)
- `infants` - Number of infant passengers (default: 0)
- `cabinClass` - first, business, premium_economy, economy (default: economy)
- `useDuffel` - Use real-time Duffel data (true/false)
- `page` - Page number for pagination
- `limit` - Results per page

### Tickets

- `POST /api/tickets/book` - Book a flight ticket
- `GET /api/tickets/me` - Get user's tickets
- `POST /api/tickets/:id/list` - List ticket for resale
- `POST /api/tickets/:id/buy` - Buy listed ticket
- `GET /api/tickets/marketplace` - Browse marketplace
- `GET /api/tickets/:id` - Get ticket details

## 💡 Usage Examples

### Search Flights with Duffel API

\`\`\`bash
# Search for flights from NYC to LAX
GET /api/flights?from=JFK&to=LAX&date=2024-12-25&useDuffel=true&adults=1&cabinClass=economy

# Search airports
GET /api/flights/airports?q=New York

# Get specific offer details
GET /api/flights/duffel/offers/off_123456789

# Create an order (requires authentication)
POST /api/flights/duffel/orders
{
  "offerId": "off_123456789",
  "passengers": [{
    "title": "mr",
    "given_name": "John",
    "family_name": "Doe",
    "gender": "m",
    "born_on": "1990-01-01",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890"
  }]
}
\`\`\`

### Standard Flight Search (Database)

\`\`\`bash
# Search database flights
GET /api/flights?from=NYC&to=LAX&date=2024-12-25

# Book a ticket
POST /api/tickets/book
{
  "flightId": "flight_id_here"
}
\`\`\`

## 🔒 Authentication

Protected endpoints require a Bearer token in the Authorization header:

\`\`\`bash
Authorization: Bearer <your-jwt-token>
\`\`\`

Get the token by registering or logging in via the auth endpoints.

## 🗄️ Database Models

### User

- Email, wallet address, password (hashed)
- JWT authentication support

### Flight

- Airline, route, times, price, available seats
- Indexed for efficient searching

### Ticket

- Flight reference, owner, NFT token ID, price
- Status tracking (booked/listed/sold)
- Marketplace functionality

## 🎯 Future Enhancements

- [ ] Blockchain integration (Avalanche/AVAX)
- [ ] Real NFT minting and transfers
- [ ] Smart contract integration
- [ ] Advanced search filters
- [ ] Price history and analytics
- [ ] Email notifications
- [ ] Admin dashboard

## 🧪 Testing

Testing framework not yet implemented. Planned additions:

- Unit tests with Jest
- Integration tests for API endpoints
- Database testing with MongoDB Memory Server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **JWT Secret Error**

   - Set JWT_SECRET in .env file
   - Use a secure, random string

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill process using the port

### Getting Help

- Check the API documentation at `/api-docs`
- Review error messages in the console
- Ensure all environment variables are set correctly

---

Built for the Avax hackathon 🏔️
