import { Post } from '../types/post';

interface FilterOptions {
  searchTerm: string;
  selectedTags: string[];
  sortBy: string;
}

export const filterAndSortPosts = (posts: Post[], options: FilterOptions): Post[] => {
  const { searchTerm, selectedTags, sortBy } = options;

  let filteredPosts = [...posts];

  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.body.toLowerCase().includes(searchLower)
    );
  }

  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      post.hashtags?.some(tag => 
        selectedTags.includes(tag)
      )
    );
  }

  filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'oldest':
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      case 'mostViewed':
        return (b.views || 0) - (a.views || 0);
      case 'mostLiked':
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  });

  return filteredPosts;
};
