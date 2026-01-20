
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import { Button, Dialog } from './components/ui-mock';
import { ToolsView, PracticeView, JobsView, ProfileView } from './components/FeatureViews';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

type View = 'blog' | 'tools' | 'practice' | 'jobs' | 'profile';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onCreateClick }) => (
  <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" 
          onClick={() => onNavigate('blog')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">M</div>
          <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 uppercase">CA Monk</span>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { id: 'tools', label: 'Tools' },
            { id: 'practice', label: 'Practice' },
            { id: 'blog', label: 'Blog' },
            { id: 'jobs', label: 'Jobs' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`text-sm font-bold transition-all px-2 py-1 rounded-md ${
                currentView === item.id 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {currentView === 'blog' && (
          <Button onClick={onCreateClick} variant="outline" className="hidden sm:flex border-indigo-200 text-indigo-600 hover:bg-indigo-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Write Article
          </Button>
        )}
        <div 
          onClick={() => onNavigate('profile')}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all border-2 ${
            currentView === 'profile' 
            ? 'bg-indigo-600 text-white border-indigo-200 scale-110' 
            : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('blog');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'tools':
        return <ToolsView />;
      case 'practice':
        return <PracticeView />;
      case 'jobs':
        return <JobsView />;
      case 'profile':
        return <ProfileView />;
      case 'blog':
      default:
        return (
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 h-full">
            <div className="lg:col-span-4 h-full order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 max-h-[calc(100vh-140px)] overflow-y-auto rounded-2xl bg-slate-50/50">
                <BlogList 
                  selectedId={selectedBlogId} 
                  onSelect={(id) => {
                    setSelectedBlogId(id);
                    if (window.innerWidth < 1024) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }} 
                />
              </div>
            </div>
            <div className="lg:col-span-8 order-1 lg:order-2 h-full">
              <div className="min-h-[400px]">
                <BlogDetail id={selectedBlogId} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#fdfdff]">
        <Header 
          currentView={currentView} 
          onNavigate={(v) => {
            setCurrentView(v);
            window.scrollTo(0, 0);
          }} 
          onCreateClick={() => setIsFormOpen(true)} 
        />

        <main className="flex-1 container mx-auto px-0 md:px-4 py-0 md:py-8 max-w-7xl">
          {renderContent()}
        </main>

        <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-400 py-16 px-6">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">M</div>
                <span className="font-black text-xl tracking-tight uppercase">CA MONK</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                The ecosystem built by CAs, for CAs. Level up your career with the tools, knowledge, and network you deserve.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Navigation</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setCurrentView('tools')} className="hover:text-indigo-400 transition-colors">Calculators</button></li>
                <li><button onClick={() => setCurrentView('practice')} className="hover:text-indigo-400 transition-colors">Practice Tests</button></li>
                <li><button onClick={() => setCurrentView('blog')} className="hover:text-indigo-400 transition-colors">Knowledge Base</button></li>
                <li><button onClick={() => setCurrentView('jobs')} className="hover:text-indigo-400 transition-colors">Job Board</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Mentorship</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Premium Courses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:support@camonk.com" className="hover:text-white transition-colors">support@camonk.com</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li className="pt-4 flex gap-4">
                  <a href="#" className="text-slate-500 hover:text-indigo-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4">
            <p>© 2024 CA Monk Professional Services. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Cookie Settings</a>
            </div>
          </div>
        </footer>

        <Dialog 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          title="Compose New Article"
        >
          <BlogForm onSuccess={() => setIsFormOpen(false)} />
        </Dialog>

        {currentView === 'blog' && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-indigo-700 active:scale-95 transition-all shadow-indigo-400/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
