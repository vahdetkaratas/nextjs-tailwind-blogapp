import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaRegBookmark, FaRegEye, FaRegHeart, FaRegClock } from 'react-icons/fa';
import { Post } from '../types/post';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface BlogPostProps {
  post: Post;
  isDetailView?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/post/${post.id}`);
  };

  const formattedDate = useMemo(() => {
    if (!post?.createdAt) {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date(post.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [post?.createdAt]);

  // Default author data
  const defaultAuthor: Post['author'] = {
    name: 'Anonymous',
    avatar: `https://picsum.photos/seed/anonymous-${post.id}/150/150`,
  };

  // Use author data if available, otherwise use defaults
  const authorData = post.author || defaultAuthor;

  return (
    <article className="group bg-blue-50/80 dark:bg-blue-800/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-blue-700/30">
      <Link href={`/post/${post.id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/post${post.id}-${post.categories?.[0] || 'uncategorized'}/800/400`}
            alt={post.title}
            width={800}
            height={400}
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            priority={true}
            loading="eager"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/post/${post.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-blue-100 mb-2 truncate">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center mb-3">
          <Image
            src={authorData.avatar || '/default-avatar.png'}
            alt={authorData.name}
            width={24}
            height={24}
            className="rounded-full mr-2"
            unoptimized
          />
          <span className="text-sm text-gray-600 dark:text-blue-200/80">
            By {authorData.name}
          </span>
        </div>
        <p className="text-gray-600 dark:text-blue-200/90 mb-4 line-clamp-3">
          {post.body.slice(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-blue-200/80">
            <span className="flex items-center">
              <FaRegClock className="mr-1" />
              {post.readTime} min read
            </span>
            <span className="flex items-center">
              <FaRegEye className="mr-1" />
              {post.views} views
            </span>
          </div>
          <button
            onClick={handleReadMore}
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 
                     hover:bg-blue-100/50 dark:hover:bg-blue-700/30 rounded-full transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
