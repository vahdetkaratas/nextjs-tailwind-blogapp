import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaClock, FaEye, FaHeart, FaShare, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { Post } from '../../types/post';
import { fetchPosts, fetchPostWithAdjacent } from '../../utils/api';
import { useState, useEffect } from 'react';

interface PostPageProps {
  post: Post;
  previousPost: Post | null;
  nextPost: Post | null;
}

const PostPage = ({ post, previousPost, nextPost }: PostPageProps) => {
  const router = useRouter();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (post?.likes) {
      setLikes(post.likes);
    }
  }, [post?.likes]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this post: ${post.title}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.body.slice(0, 160)}
        type="article"
        image={post.author?.avatar}
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/post${post.id}-${post.categories?.[0] || 'uncategorized'}/1200/800`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative z-10 -mt-32 bg-white dark:bg-gray-900 rounded-t-3xl px-8 pt-12 pb-8 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Image
                src={post.author?.avatar || '/default-avatar.png'}
                alt={post.author?.name || 'Anonymous'}
                width={48}
                height={48}
                className="rounded-full"
                unoptimized
              />
              <div className="ml-4">
                <p className="font-medium text-gray-900 dark:text-white">{post.author?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center px-4 py-2 rounded-full ${
                  hasLiked 
                    ? 'bg-red-100 text-red-500 dark:bg-red-900/30' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <FaHeart className={`mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                {likes}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaShare className="mr-2" />
                Share
              </button>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">{post.body}</p>
          </div>

          {post.hashtags && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.hashtags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {previousPost && (
            <Link href={`/post/${previousPost.id}`}>
              <div className="group p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                <p className="text-sm text-gray-500 dark:text-gray-400">← Previous Post</p>
                <h3 className="mt-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  {previousPost.title}
                </h3>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link href={`/post/${nextPost.id}`}>
              <div className="group p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                <p className="text-sm text-gray-500 dark:text-gray-400">Next Post →</p>
                <h3 className="mt-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  {nextPost.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  try {
    const { post, previousPost, nextPost } = await fetchPostWithAdjacent(postId);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
        previousPost,
        nextPost
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};

export default PostPage;
