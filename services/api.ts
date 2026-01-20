
import { Blog, NewBlog } from '../types';

const API_URL = 'http://localhost:3001';

const INITIAL_MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "The Future of Fintech in 2026",
    category: ["FINANCE", "TECH"],
    description: "How AI and blockchain are fundamentally reshaping modern financial services.",
    date: new Date().toISOString(),
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    content: "The landscape of financial technology is evolving at an unprecedented pace. As we move into 2026, the convergence of artificial intelligence and decentralized ledger technology is creating new paradigms for transparency and efficiency.\n\nKey trends include:\n1. Autonomous Finance: AI-driven systems that manage personal wealth with zero human intervention.\n2. CBDCs: Central Bank Digital Currencies becoming the norm for international settlements.\n3. Zero-Knowledge Proofs: Enhanced privacy for sensitive financial transactions.\n\nStay tuned as we dive deeper into each of these topics in the coming weeks."
  },
  {
    id: 2,
    title: "Essential Skills for Modern CAs",
    category: ["CAREER", "SKILLS"],
    description: "Beyond balance sheets: Why digital literacy is now a core requirement for Chartered Accountants.",
    date: new Date().toISOString(),
    coverImage: "https://images.unsplash.com/photo-1454165833767-1316b31c023d?auto=format&fit=crop&q=80&w=1000",
    content: "The role of the Chartered Accountant has shifted from a number-cruncher to a strategic business advisor. Today, proficiency in data analytics and cloud computing is as critical as understanding tax code.\n\nCAs who embrace automation are finding themselves with more time to provide high-value advisory services. Digital transformation isn't just a buzzword; it's the new reality of the profession."
  }
];

// Helper to manage local storage blogs
const getLocalBlogs = (): Blog[] => {
  const saved = localStorage.getItem('camonk_local_blogs');
  return saved ? JSON.parse(saved) : [];
};

const saveLocalBlog = (blog: Blog) => {
  const current = getLocalBlogs();
  localStorage.setItem('camonk_local_blogs', JSON.stringify([...current, blog]));
};

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) throw new Error('Server error');
    const serverBlogs = await response.json();
    return [...serverBlogs, ...getLocalBlogs()];
  } catch (error) {
    console.warn("Backend server not reached, using mock + local data.", error);
    return [...INITIAL_MOCK_BLOGS, ...getLocalBlogs()];
  }
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) throw new Error('Not found on server');
    return await response.json();
  } catch (error) {
    const allLocal = [...INITIAL_MOCK_BLOGS, ...getLocalBlogs()];
    const found = allLocal.find(b => b.id === id);
    if (found) return found;
    throw new Error('Blog not found');
  }
};

export const createBlog = async (blog: NewBlog): Promise<Blog> => {
  const newBlog = { ...blog, id: Date.now() };
  try {
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });
    if (!response.ok) throw new Error('Server rejected');
    return await response.json();
  } catch (error) {
    console.warn("Server offline, saving blog to LocalStorage.");
    saveLocalBlog(newBlog as Blog);
    return newBlog as Blog;
  }
};
