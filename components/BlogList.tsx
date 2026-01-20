
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '../services/api';
import { Card, Skeleton } from './ui-mock';
import { Blog } from '../types';

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

const BlogList: React.FC<BlogListProps> = ({ onSelect, selectedId }) => {
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  // Auto-select the first blog on desktop if none selected
  useEffect(() => {
    if (blogs && blogs.length > 0 && selectedId === null && window.innerWidth >= 1024) {
      onSelect(blogs[blogs.length - 1].id);
    }
  }, [blogs, selectedId, onSelect]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const blogItems = blogs ?? [];

  if (isError && blogItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <p className="text-sm font-medium text-slate-900">Unable to load blogs</p>
        <p className="text-xs text-slate-500 mt-1">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latest Articles</h2>
        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600 uppercase tracking-tight">{blogItems.length} Posts</span>
      </div>
      
      {blogItems.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          <svg className="w-12 h-12 mx-auto text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4v4h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11H8m5 4H8" /></svg>
          <p className="text-sm font-medium">No blogs published yet</p>
        </div>
      ) : (
        [...blogItems].reverse().map((blog) => (
          <Card 
            key={blog.id} 
            onClick={() => onSelect(blog.id)}
            className={`cursor-pointer overflow-hidden group border-l-4 transition-all duration-300 transform active:scale-[0.98] ${
              selectedId === blog.id 
              ? 'border-l-indigo-600 ring-1 ring-indigo-600 shadow-md bg-indigo-50/10' 
              : 'border-l-transparent hover:border-l-indigo-300 hover:shadow-lg'
            }`}
          >
            <div className="p-4 flex gap-4">
              <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 hidden sm:block">
                <img 
                  src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/200`} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={(e) => (e.currentTarget.src = `https://picsum.photos/seed/${blog.id}/200`)}
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
                    {blog.category?.[0] || 'GENERAL'}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400">
                    {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className={`text-sm md:text-base font-bold leading-snug line-clamp-2 transition-colors ${
                  selectedId === blog.id ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'
                }`}>
                  {blog.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {blog.description}
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default BlogList;
