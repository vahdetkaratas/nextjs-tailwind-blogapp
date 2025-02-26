import { Post } from '../types/post';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const AVAILABLE_TAGS = ['tech', 'news', 'tutorial', 'design', 'coding'] as const;

const CATEGORIES = ['nature', 'technology', 'business', 'design', 'science', 'education', 'health'] as const;

const getRandomTags = (count: number = 2): string[] => {
  const shuffled = [...AVAILABLE_TAGS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomCategory = (): string => {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
};

const getAuthorData = (userId: number) => ({
  id: userId,
  name: `Author ${userId}`,
  email: `author${userId}@example.com`,
  avatar: `https://picsum.photos/seed/author${userId}/150/150`,
  bio: 'Sample author bio'
});

const getRandomDate = () => {
  const now = Date.now();
  const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
  return new Date(oneYearAgo + Math.random() * (now - oneYearAgo));
};

const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

let cachedPosts: Post[] | null = null;

export async function fetchPosts(page: number = 1, limit: number = 9): Promise<Post[]> {
  try {
    if (cachedPosts && page === 1 && limit === 0) {
      return cachedPosts;
    }

    if (!cachedPosts) {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
      
      cachedPosts = posts.map((post: any) => {
        const createdAt = getRandomDate();
        const updatedAt = new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime()));
        
        return {
          id: post.id.toString(),
          title: post.title,
          body: post.body,
          userId: post.userId,
          hashtags: getRandomTags(2),
          categories: [getRandomCategory(), getRandomCategory()],
          author: getAuthorData(post.userId),
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
          readTime: calculateReadingTime(post.body),
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 1000)
        };
      });
    }

    if (limit === 0) {
      return cachedPosts || [];
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return (cachedPosts || []).slice(start, end);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostWithAdjacent(id: string): Promise<{ post: Post, previousPost: Post | null, nextPost: Post | null }> {
  try {
    const posts = await fetchPosts(1, 0);
    
    if (!posts || posts.length === 0) {
      throw new Error('No posts available');
    }

    const currentIndex = posts.findIndex(post => post.id === id);
    
    if (currentIndex === -1) {
      throw new Error('Post not found');
    }

    return {
      post: posts[currentIndex],
      previousPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
      nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
    };
  } catch (error) {
    console.error('Error fetching post with adjacent:', error);
    throw error;
  }
};
