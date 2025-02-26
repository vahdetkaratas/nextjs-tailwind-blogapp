import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import BlogPost from '../components/BlogPost';
import PostSkeleton from '../components/PostSkeleton';
import SearchBar from '../components/SearchBar';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { filterAndSortPosts } from '../utils/searchAndFilter';
import SEO from '../components/SEO';
import { useDebounce } from '../hooks/useDebounce';
import { Post } from '../types/post';
import { fetchPosts } from '../utils/api';

const POSTS_PER_PAGE = 9;

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'mostViewed', label: 'Most Viewed' },
  { value: 'mostLiked', label: 'Most Liked' },
];

interface HomeProps {
  initialPosts: Post[];
}

const Home = ({ initialPosts }: HomeProps) => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredPosts = useMemo(() => {
    return filterAndSortPosts(posts, {
      searchTerm: debouncedSearchTerm,
      selectedTags,
      sortBy,
    });
  }, [posts, debouncedSearchTerm, selectedTags, sortBy]);

  const loadMorePosts = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const newPosts = await fetchPosts(nextPage, POSTS_PER_PAGE);
      
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const [isFetching, setIsFetching] = useInfiniteScroll(loadMorePosts, hasMore);

  useEffect(() => {
    if (!isFetching) return;
    loadMorePosts().then(() => setIsFetching(false));
  }, [isFetching, loadMorePosts]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    router.push({ pathname: '/', query: { ...router.query, search: value } }, undefined, { shallow: true });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      
      router.push(
        { 
          pathname: '/',
          query: { 
            ...router.query,
            tags: newTags.join(',')
          }
        },
        undefined,
        { shallow: true }
      );
      
      return newTags;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    router.push(
      {
        pathname: '/',
        query: {
          ...router.query,
          sort: value
        }
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    const { search, tags, sort } = router.query;
    
    if (search && typeof search === 'string') {
      setSearchTerm(search);
    }
    
    if (tags && typeof tags === 'string') {
      setSelectedTags(tags.split(','));
    }
    
    if (sort && typeof sort === 'string') {
      setSortBy(sort);
    }
  }, [router.query]);

  return (
    <Layout>
      <SEO 
        title="Blog"
        description="Explore our collection of articles on various topics"
        type="website"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <SearchBar
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search posts..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                #{tag} ×
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
          {loading && Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>

        {!hasMore && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No more posts to load
          </p>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await fetchPosts(1, POSTS_PER_PAGE);
    
    return {
      props: {
        initialPosts: posts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialPosts: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
