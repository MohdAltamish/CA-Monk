
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '../services/api';
import { Badge, Skeleton, Card } from './ui-mock';

interface BlogDetailProps {
  id: number | null;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ id }) => {
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-600">Select an article</h2>
          <p className="text-sm">Choose a blog from the list on the left to read its full content.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-0 md:p-8 space-y-6 animate-in fade-in duration-500">
        <Skeleton className="w-full h-[400px] rounded-2xl" />
        <div className="space-y-4 p-6 md:p-0">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-3/4 h-10" />
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 p-8 text-center">
        <div>
          <p className="font-bold">Failed to load blog content.</p>
          <p className="text-sm">Please check your internet or try another article.</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="p-0 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="overflow-hidden border-none shadow-none md:shadow-sm md:border bg-white rounded-none md:rounded-2xl">
        <div className="relative h-[250px] md:h-[450px] overflow-hidden">
          <img 
            src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/1200/600`} 
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = `https://picsum.photos/seed/${blog.id}/1200/600`)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex gap-2 mb-3">
              {(blog.category || []).map(cat => (
                <Badge key={cat} className="bg-white/20 backdrop-blur-md text-white border-none text-[10px]">
                  {cat}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl md:text-5xl font-bold leading-tight drop-shadow-lg">{blog.title}</h1>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-6 mb-8 text-xs md:text-sm text-slate-500 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                {blog.title.charAt(0)}
              </div>
              <span className="font-medium text-slate-700">Editor's Choice</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formattedDate}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              5 min read
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8">
              {blog.description}
            </p>
            <div className="text-slate-700 leading-loose whitespace-pre-wrap text-base md:text-lg">
              {blog.content}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-[10px] md:text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] md:text-sm text-slate-400">Did you like this?</span>
              <button className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.708c.944 0 1.708.764 1.708 1.708 0 .427-.158.834-.442 1.15l-4.223 4.706c-.313.348-.755.55-1.22.55h-5.26c-.464 0-.906-.202-1.22-.55L4.12 12.858a1.71 1.71 0 01-.442-1.15c0-.944.764-1.708 1.708-1.708H10V5.708C10 4.764 10.764 4 11.708 4c.427 0 .834.158 1.15.442l1.142 1.266V10z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogDetail;
