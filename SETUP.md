# Development Setup Guide

## Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] OpenAI API account and key
- [ ] Supabase account and project

## Step-by-Step Setup

### 1. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env.local
```

Fill in your actual values:

#### OpenAI Setup
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env.local`: `OPENAI_API_KEY=sk-...`

#### Supabase Setup
1. Create project at [Supabase](https://supabase.com)
2. Go to Settings > API
3. Copy URL and anon key to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 2. Database Setup

1. Open Supabase SQL Editor
2. Copy and paste the contents of `supabase/schema.sql`
3. Execute the SQL commands
4. Verify tables are created:
   - users
   - intents
   - suggestions
   - clicks

### 3. Install Dependencies

```bash
npm install
```

This will install:
- Next.js framework
- React and TypeScript
- Supabase client
- OpenAI SDK
- Tailwind CSS
- Lucide React icons

### 4. Start Development

```bash
npm run dev
```

The application will be available at http://localhost:3000

### 5. Test the Application

1. Visit the homepage
2. Enter a shopping intent (e.g., "comfortable clothes for working from home")
3. Verify suggestions are generated
4. Check analytics at `/analytics`

## Troubleshooting

### Common Issues

**OpenAI API Errors**
- Verify API key is correct
- Check OpenAI account has credits
- Ensure API key has proper permissions

**Supabase Connection Issues**
- Verify URL and anon key are correct
- Check Supabase project is active
- Ensure RLS policies allow operations

**Build Errors**
- Run `npm run type-check` to verify TypeScript
- Check all imports are correct
- Verify environment variables are set

### Performance Tips

- Use `npm run build` to test production build
- Monitor API response times in browser dev tools
- Check Supabase usage in dashboard

## Production Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Configure environment variables in Vercel dashboard
4. Deploy with `vercel --prod`

### Environment Variables for Production

Ensure these are set in your deployment platform:
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Development Workflow

1. **Feature Development**
   - Create feature branch
   - Test locally with `npm run dev`
   - Verify TypeScript with `npm run type-check`

2. **Testing**
   - Test user flows manually
   - Check analytics tracking
   - Verify mobile responsiveness

3. **Deployment**
   - Build locally with `npm run build`
   - Deploy to staging/production
   - Monitor analytics after deployment

## Security Considerations

- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Implement proper RLS policies in Supabase
- Regularly rotate API keys
- Monitor usage and costs

## Monitoring

- Check Supabase dashboard for database usage
- Monitor OpenAI API usage and costs
- Use analytics dashboard to track user behavior
- Set up alerts for high usage or errors