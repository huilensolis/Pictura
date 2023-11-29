# Pictura

**App Features:**

1. **User Authentication:**
   - User registration and login functionality using Supabase authentication.
2. **Image Upload:**
   - Allow users to upload pixel art images/gifs.
   - Integrate Cloudinary for image storage and retrieval.
3. **Image Display:**
   - Display uploaded pixel art images/gifs in a gallery format.
   - Include pagination for the gallery.
4. **Filtering and Sorting:**
   - Implement filtering options (e.g., by date, popularity, artist).
   - Allow sorting based on different criteria.
5. **Search Functionality:**
   - Enable users to search for pixel art images/gifs by keywords or tags.
6. **User Profiles:**
   - User profiles to showcase uploaded pixel art and user information.
   - Include an option to follow other users.
7. **Likes and Comments:**
   - Allow users to like and comment on pixel art images/gifs.
   - Implement a notification system for likes and comments.
8. **Responsive Design:**
   - Ensure the application is responsive and works well on various devices.
9. **Favourite/Bookmark Feature:**
   - Allow users to mark pixel art images/gifs as favourites or bookmark them for later.
10. **Limited Access for Free Users:**
    - Limit certain aspects of the app for free users, such as the number of uploads allowed, lower image resolution, or access to a subset of features.
11. **Ads for Free Users:**
    - Implement non-intrusive ads for free users. Premium subscribers can enjoy an ad-free experience.
12. **Discounts and Promotions:**
    - Periodically offer discounts or promotions for subscription plans, especially during special events or holidays.
13. **Exclusive Content:**
    - Introduce exclusive pixel art content or competitions accessible only to premium subscribers.
14. **Priority Image Processing:**
    - Ensure premium users' uploaded images are processed and displayed faster than those of free users.
15. **Private Galleries:**
    - Allow premium users to create private galleries that can only be accessed by themselves or selected followers.
16. **Customizable Profiles:**
    - Provide premium users with the ability to customize their profiles with unique themes, backgrounds, and fonts.
17. **Ad-Free Experience:**
    - Remove all ads for premium users, providing them with a clean and uninterrupted browsing experience.
18. **Analytics Dashboard:**
    - Offer premium users an analytics dashboard to track the performance and engagement of their pixel art, including views, likes, and comments.
19. **Early Access to Features:**
    - Give premium users early access to new features or updates before they are rolled out to free users.
20. **Priority Customer Support:**
    - Offer premium users priority customer support with faster response times and dedicated assistance.

**Pricing Plans:**

**Free Plan:**

- **Cost:** Free
- **Features:**
  - Image Upload and Display - limited to 30 images.
  - Filtering and Sorting
  - Search Functionality
  - User Profiles
  - Likes and Comments
  - Responsive Design
  - public collections/favorites/bookmarks
  - Ads for Free Users

**Premium Plan:**

- **Cost:** $9.99/month
- **All Free Plan Features Plus:**
  - Private Galleries
  - Customizable Profiles
  - Ad-Free Experience
  - Analytics Dashboard
  - Early Access to Features
  - Special Badges and Emblems
  - Custom Watermarks

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
