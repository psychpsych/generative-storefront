# Generative Storefront - AI Shopping Assistant

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)](https://openai.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-purple)](https://supabase.com/)

> **Bringing emotion and intuition back to online shopping**

An AI-powered shopping assistant that interprets user intent (emotion, mood, or context) and returns personalized product suggestions. Built as an MVP inspired by AKQA's Generative Store concept.

## 🌟 Features

- **Emotion-Driven Search**: AI interprets natural language to understand mood and context
- **Personalized Recommendations**: ChatGPT generates tailored product suggestions
- **Real-time Interface**: Dynamic, responsive UI that adapts to user intent
- **Analytics Dashboard**: Track engagement, CTR, and user behavior
- **Mobile-First Design**: Beautiful, responsive design for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd generative-storefront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

4. **Setup Supabase database**
   - Create a new Supabase project
   - Run the SQL commands from `supabase/schema.sql` in your Supabase SQL editor
   - Configure Row Level Security policies as needed

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture

```
Next.js Frontend (React + TypeScript)
├── Components (IntentInput, ProductCard, SuggestionsGrid)
├── Pages (Home, Analytics)
└── API Routes (intent, track, analytics)

Supabase Backend (PostgreSQL)
├── users table
├── intents table
├── suggestions table
└── clicks table

OpenAI Integration
└── ChatGPT API for intent processing
```

## 📊 Analytics

Visit `/analytics` to view:
- Total intents submitted
- Click-through rates
- User engagement metrics
- System health status

## 🎯 Success Metrics

The MVP tracks these key performance indicators:
- **Intent Response Rate**: Target >60%
- **Click-through Rate**: Target >20%
- **Repeat Visit Rate**: Target >25%
- **Response Latency**: Target <2s

## 🔧 API Endpoints

### POST `/api/intent`
Process user intent and generate product suggestions.

**Request:**
```json
{
  "intent": "a cozy outfit for a rainy evening",
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "suggestions": [...],
  "mood_analysis": "User is seeking comfort and warmth",
  "confidence_score": 0.85
}
```

### POST `/api/track`
Track user interactions for analytics.

### GET `/api/analytics`
Retrieve analytics data.

## 🎨 Design Philosophy

Inspired by AKQA's Generative Store, this project focuses on:
- **Emotional Connection**: Moving beyond transactional to relational commerce
- **Intent-Led Design**: Building interfaces that adapt to user needs in real-time
- **Narrative Commerce**: Bringing storytelling back to digital shopping

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## 🛠️ Development

### Project Structure
```
src/
├── components/          # React components
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── index.tsx      # Main application
│   └── analytics.tsx  # Analytics dashboard
├── lib/               # Utilities and configurations
├── types/             # TypeScript type definitions
└── styles/            # Global styles

supabase/
└── schema.sql         # Database schema
```

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Run TypeScript check
```

## 🔮 Future Enhancements

- Voice-based intent capture
- AI-generated product visuals
- Cross-channel user profiles
- Advanced sentiment analysis
- AR/VR try-on experiences
- Multi-language support

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## ❓ Support

For questions or issues:
- Check the documentation
- Open an issue on GitHub
- Review the analytics dashboard for system status

---

**Built with ❤️ by [Barış] - AI Director**

*Transforming the future of e-commerce through emotional intelligence and AI.*