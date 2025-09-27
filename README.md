# GigCampus - Student Freelance Hub

A modern React web application that connects student freelancers with clients within their university and local community. Built with a clean, modern design system inspired by financial dashboards.

## 🚀 Features

### Core Functionality
- **Project Marketplace**: Browse and bid on projects posted by clients
- **Secure Payment Escrow**: Protected payments held until project completion
- **Real-time Chat**: Integrated messaging system with file sharing capabilities
- **Dynamic Portfolio**: Showcase completed work and build reputation
- **Reputation System**: Transparent ratings and reviews from clients

### Design System
- Modern, clean UI with rounded cards and subtle shadows
- Consistent color palette with lime green and purple accents
- Responsive design that works on all devices
- Typography system using Inter font family
- CSS custom properties for easy theming

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **CSS Custom Properties** - Design system variables
- **Responsive Design** - Mobile-first approach

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gigcampus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎨 Design System

The application uses a comprehensive design system defined in `design.json` and implemented through CSS custom properties:

### Colors
- **Background**: Clean whites and light grays
- **Primary**: Lime green (#D9F99D) for highlights and success states
- **Secondary**: Purple (#E9D5FF) for accents and secondary actions
- **Text**: Dark slate for primary text, medium grays for secondary

### Typography
- **Font Family**: Inter (with system font fallbacks)
- **Headings**: 1rem, 600 weight
- **Metrics**: 2.25rem, 700 weight (for large numbers)
- **Body**: 0.875rem for regular text
- **Metadata**: 0.75rem for small details

### Layout
- **Spacing**: 8px, 16px, 24px, 32px scale
- **Border Radius**: 12px (medium), 16px (large), 24px (extra large)
- **Shadows**: Subtle elevation system

## 📱 Pages & Components

### Dashboard
- Welcome section with personalized greeting
- Key metrics cards (active projects, messages, earnings, reputation)
- Recent projects with progress indicators
- Market trends and demand visualization

### Project Marketplace
- Filterable project listings by category
- Search functionality
- Project details with client information
- Bidding system interface

### Payment Escrow
- Secure payment tracking
- Milestone-based releases
- Payment history and completed transactions
- Invoice generation

### Chat System
- Real-time messaging interface
- File sharing capabilities
- Conversation management
- Message status indicators

### Portfolio
- Project showcase with grid/list views
- Client reviews and ratings
- Skills assessment and progress tracking
- Performance metrics

## 🔧 Customization

### Colors
Modify the color scheme by updating CSS custom properties in `src/index.css`:

```css
:root {
  --colors-primary-lime: #D9F99D;
  --colors-secondary-purple: #E9D5FF;
  /* ... other colors */
}
```

### Typography
Adjust font sizes and weights:

```css
:root {
  --heading-font-size: 1rem;
  --metric-font-size: 2.25rem;
  /* ... other typography */
}
```

### Spacing
Modify the spacing scale:

```css
:root {
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (adjusted grid columns)
- **Desktop**: > 1024px (full multi-column layout)

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Payment integration (Stripe/PayPal)
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced project management tools

---

Built with ❤️ for the student freelance community.

